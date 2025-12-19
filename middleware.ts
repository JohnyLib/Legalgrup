// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ru", "ro", "en"] as const;
const defaultLocale = "ru";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаем Next.js файлы и API
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // если корень — кидаем на дефолт
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
// Этот middleware будет применяться ко всем путям, кроме тех, которые начинаются с /_next или /api, а также к файлам с расширениями.