"use client";

import { useState } from "react";

export default function HelpWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    setStatus(null);

    if (!message.trim()) return;
    if (!phone.trim() && !email.trim()) {
      setStatus("Укажи телефон или email 🙏");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
          source: "Help widget",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      setStatus("Отправлено! Скоро свяжемся 🙂");
      setMessage("");
      setOpen(false);
    } catch (e: any) {
      setStatus(e?.message || "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {open && (
        <div className="w-[360px] max-w-[92vw] rounded-2xl shadow-2xl border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div>
              <div className="font-semibold">Задайте вопрос</div>
              <div className="text-xs text-slate-500">Ответим в ближайшее время</div>
            </div>
            <button className="text-2xl leading-none px-2" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <div className="p-4 space-y-3">
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Имя (необязательно)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="w-full border rounded-xl px-3 py-2 text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="w-full border rounded-xl px-3 py-2 text-sm min-h-[110px]"
              placeholder="Опиши задачу: что нужно, сроки, бюджет…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="w-full rounded-xl py-2 text-sm font-semibold bg-black text-white disabled:opacity-60"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Отправляю…" : "Отправить"}
            </button>

            {status && <div className="text-sm text-slate-700">{status}</div>}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full shadow-xl bg-black text-white px-4 py-3 flex items-center gap-2"
      >
        💬 <span className="text-sm font-semibold">Задать вопрос</span>
      </button>
    </div>
  );
}
