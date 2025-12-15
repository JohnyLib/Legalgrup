import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  message: string;
  pageUrl?: string;
  userAgent?: string;
  source?: string; // название модального окна/формы
};

function norm(s?: string) {
  return (s || "").trim();
}

async function b24Call(method: string, body: any) {
  const base = process.env.B24_WEBHOOK_BASE; // e.g. https://xxx.bitrix24.ru/rest/1/KEY
  if (!base) throw new Error("B24_WEBHOOK_BASE is not set");

  const url = `${base}/${method}.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    if (!res.ok) {
      throw new Error(`Bitrix24 HTTP ${res.status}: ${raw.slice(0, 200) || res.statusText}`);
    }
    throw new Error(`Bitrix24 non-JSON response (${res.status}): ${raw.slice(0, 200)}`);
  }

  let data: any;
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error(`Bitrix24 parse error (${res.status}): ${raw.slice(0, 200)}`);
  }

  if (!res.ok || data?.error) {
    throw new Error(`Bitrix24 error: ${data?.error || res.statusText}`);
  }
  return data;
}

async function findContactIdByComm(type: "EMAIL" | "PHONE", value: string) {
  const data = await b24Call("crm.duplicate.findbycomm", {
    type,
    values: [value],
  });
  const found = data?.result?.CONTACT;
  if (Array.isArray(found) && found[0]) return found[0];
  return undefined;
}

export async function POST(req: Request) {
  try {
    const p = (await req.json()) as Payload;

    const name = norm(p.name);
    const phone = norm(p.phone);
    const email = norm(p.email);
    const message = norm(p.message);
    const pageUrl = norm(p.pageUrl);
    const ua = norm(p.userAgent);
    const source = norm(p.source);

    if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });
    if (!phone && !email)
      return NextResponse.json({ error: "Phone or email required" }, { status: 400 });

    // 1) Telegram
    const tgToken = process.env.TG_BOT_TOKEN;
    const tgChat = process.env.TG_CHAT_ID;
    if (tgToken && tgChat) {
      const text =
        `🆕 Lead (Legalgrup)\n\n` +
        `🪟 Форма: ${source || "-"}\n` +
        `👤 ${name || "-"}\n` +
        `📞 ${phone || "-"}\n` +
        `📧 ${email || "-"}\n` +
        `🌐 ${pageUrl || "-"}\n\n` +
        `💬 ${message}`;

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text }),
      });
    }

    // 2) Bitrix24: найти или создать контакт
    let contactId: string | undefined;
    if (email) contactId = await findContactIdByComm("EMAIL", email);
    if (!contactId && phone) contactId = await findContactIdByComm("PHONE", phone);

    if (!contactId) {
      const contact = await b24Call("crm.contact.add", {
        fields: {
          NAME: name || "Website lead",
          PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: "WORK" }] : [],
          EMAIL: email ? [{ VALUE: email, VALUE_TYPE: "WORK" }] : [],
          COMMENTS: `Источник: сайт\nФорма: ${source || "-"}\nСтраница: ${pageUrl}\nUA: ${ua}\n\nСообщение:\n${message}`,
        },
      });
      contactId = contact?.result;
    }

    if (!contactId) throw new Error("Bitrix contactId missing");

    // 3) Bitrix24: создать сделку и привязать контакт
    const deal = await b24Call("crm.deal.add", {
      fields: {
        TITLE: `Заявка с сайта: ${name || phone || email || "Lead"}`,
        CONTACT_ID: contactId, // часто работает сразу
        COMMENTS: `Форма: ${source || "-"}\nСтраница: ${pageUrl}\n\nСообщение:\n${message}`,
        // STAGE_ID: "NEW", // если хочешь конкретную стадию — скажешь, подставим
        // CATEGORY_ID: 0,  // если у тебя несколько воронок — укажем
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    });

    return NextResponse.json({ ok: true, contactId, dealId: deal?.result });
  } catch (err: any) {
    const msg = err?.message || "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
