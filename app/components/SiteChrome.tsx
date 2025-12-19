"use client";

import type { ReactNode, SVGProps } from "react";
import { createContext, useContext } from "react";
import HelpWidget from "./HelpWidget";
import Link from "next/link";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "../../lib/i18n/context";
import { LocalizedLink } from "../../lib/i18n/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getLocaleFromPath } from "../../lib/i18n/utils";

const Modal = lazy(() => import("./Modal").then(m => ({ default: m.Modal })));
const ScheduleCallForm = lazy(() => import("./Forms").then(m => ({ default: m.ScheduleCallForm })));

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => undefined,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function PageShell({ children }: { children: ReactNode }) {
  const { t } = useTranslations();
  // Render dark on server to avoid hydration mismatches, then adjust on client.
  const [theme, setTheme] = useState<Theme>("dark");
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const next = prefersDark ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <HelpWidget />
      <div className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-b from-[#05070f] via-[#070d1a] to-[#05070f] text-slate-100" : "bg-[#f6f3ed] text-[#0f172a]"}`}>
        <div className={`pointer-events-none fixed inset-0 ${theme === "dark" ? "opacity-80" : "opacity-70"}`}>
          <div className={`absolute left-[-6%] top-[-18%] h-[360px] w-[360px] rounded-full blur-[110px] ${theme === "dark" ? "bg-[#0f1a36]" : "bg-[#f0e3cd]"}`} />
          <div className={`absolute right-[-12%] top-[6%] h-[320px] w-[320px] rounded-full blur-[120px] ${theme === "dark" ? "bg-[#0a2336]" : "bg-[#d6e3ff]"}`} />
          <div className={`absolute bottom-[-22%] left-[18%] h-[300px] w-[520px] rounded-[999px] blur-[120px] ${theme === "dark" ? "bg-[#0f2b2f]" : "bg-[#e5f6f1]"}`} />
        </div>
        <div className="relative">
          <TopBar />
          <Navigation onScheduleCall={() => setIsScheduleCallOpen(true)} />
          <main className="mx-auto max-w-6xl px-4 pb-24">{children}</main>
        </div>
      </div>

      {isScheduleCallOpen && (
        <Suspense fallback={null}>
          <Modal
            isOpen={isScheduleCallOpen}
            onClose={() => setIsScheduleCallOpen(false)}
            title={t.forms.scheduleCall.title}
            size="lg"
          >
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <ScheduleCallForm
                source={t.forms.scheduleCall.title}
                onSubmit={(data) => {
                  console.log("Schedule call form submitted:", data);
                  // Success handled inside the form with overlay
                }}
              />
            </Suspense>
          </Modal>
        </Suspense>
      )}
    </ThemeContext.Provider>
  );
}

export function PhotoPlaceholder({
  label,
  note,
}: {
  label: string;
  note?: string;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#1f2a44] bg-[#0f172a] px-4 py-8 text-center text-sm text-slate-200 shadow-inner shadow-black/20">
      <div className="h-16 w-16 rounded-xl border border-[#1f2a44] bg-gradient-to-br from-[#0b1221] to-[#1b2a4b]" />
      <div className="font-semibold text-slate-100">{label}</div>
      {note ? <div className="text-xs text-slate-400">{note}</div> : null}
    </div>
  );
}

export function ProfessionalImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export function TopBar() {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div
      className={`border-b ${
        isDark
          ? "border-[#1f2a44] bg-gradient-to-r from-[#101a2f] via-[#0c1221] to-[#0f1d36] text-slate-100"
          : "border-[#e8dfd4] bg-gradient-to-r from-[#0f172a] via-[#15243f] to-[#0f172a] text-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-200">
            <PhoneIcon className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-medium tracking-tight">{t.home.topBar.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <MailIcon className="h-4 w-4 text-[var(--accent)]" />
            <span className="tracking-tight">{t.home.topBar.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <MapPinIcon className="h-4 w-4 text-[var(--accent)]" />
            <span className="tracking-tight">{t.home.topBar.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs uppercase tracking-[0.16em] text-slate-300 md:block">
            {t.home.topBar.immediateCaseReview}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Navigation({ onScheduleCall }: { onScheduleCall?: () => void }) {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const links = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.contact, path: "/contact" },
  ];

  // Предзагрузка важных страниц при монтировании
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const locale = getLocaleFromPath(pathname);
    
    // Предзагружаем все страницы навигации
    links.forEach((link) => {
      const localizedPath = `/${locale}${link.path === "/" ? "" : link.path}`;
      router.prefetch(localizedPath);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Закрытие мобильного меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      // Блокируем скролл body когда меню открыто
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Закрытие меню при изменении пути
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const currentPath = pathname.replace(/^\/[^/]+/, "") || "/";

  return (
    <>
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur ${
          theme === "dark"
            ? "border-[#1f2a44] bg-[#0b1221]/80"
            : "border-[#e8dfd4] bg-white/85"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <LocalizedLink href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#101b36] to-[#1f2f52] text-lg font-semibold text-white shadow-lg ring-1 ring-white/10">
                LG
              </div>
              <div>
                <div className="font-display text-xl font-semibold tracking-tight text-slate-100">
                  LegalGrup
                </div>
                <p className="text-xs text-slate-400">Attorneys & Partners</p>
              </div>
            </LocalizedLink>
          </div>
          <nav
            className={`hidden items-center gap-8 text-sm font-medium ${
              theme === "dark" ? "text-slate-200" : "text-slate-700"
            } md:flex`}
          >
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <LocalizedLink
                  key={link.path}
                  href={link.path}
                  prefetch={true}
                  className={`relative pb-1 transition hover:text-[var(--accent)] ${isActive ? "text-[var(--accent)]" : ""}`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-[var(--accent)] transition-transform duration-200 ease-out ${isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"}`} />
                </LocalizedLink>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={onScheduleCall}
              className="hidden rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-4 py-2 text-sm font-semibold text-[#0b0f1c] shadow-[0_10px_30px_rgba(244,200,108,0.35)] transition hover:-translate-y-px hover:shadow-[0_14px_36px_rgba(244,200,108,0.45)] md:inline-flex"
            >
              {t.nav.scheduleCall}
            </button>
            <button
              onClick={toggleTheme}
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-semibold text-slate-200 ring-1 ring-[#1f2a44] transition hover:-translate-y-px hover:ring-[var(--accent)] md:inline-flex"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <LanguageSwitcher />
            {/* Бургер меню кнопка */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition hover:bg-white/5 active:scale-95"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block h-0.5 w-6 bg-[var(--accent)] transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--accent)] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--accent)] transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Мобильное меню */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 top-[73px] z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Меню панель */}
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] ${theme === "dark" ? "bg-[#0d1526] ring-[#1f2a44]" : "bg-white ring-[#e8dfd4]"} shadow-2xl shadow-black/20 ring-1 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full">
            {/* Навигационные ссылки */}
            <nav className="flex flex-col p-6 gap-2">
              {links.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <LocalizedLink
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition ${
                      isActive
                        ? theme === "dark"
                          ? "bg-white/5 text-[var(--accent)] border border-[#1f2a44]"
                          : "bg-[#fdfaf5] text-[#8b5e2b] border border-[#e8dfd4]"
                        : theme === "dark"
                          ? "text-slate-200 hover:bg-white/5 active:bg-white/10"
                          : "text-slate-700 hover:bg-[#fdfaf5] active:bg-[#f5ede0]"
                    }`}
                  >
                    {link.label}
                  </LocalizedLink>
                );
              })}
            </nav>
            
            {/* Кнопки действий */}
            <div className={`mt-auto p-6 space-y-3 border-t ${theme === "dark" ? "border-[#1f2a44]" : "border-[#e8dfd4]"}`}>
              <button
                onClick={toggleTheme}
                className="w-full rounded-full bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 ring-1 ring-[#1f2a44] transition active:scale-95"
              >
                {theme === "dark" ? "Switch to light" : "Switch to dark"}
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onScheduleCall?.();
                }}
                className="w-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-4 py-3 text-sm font-semibold text-[#0b0f1c] shadow-lg transition active:scale-95"
              >
                {t.nav.scheduleCall}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Field({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
        {label}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full rounded-2xl border ${
          error ? "border-red-400" : "border-[#1f2a44]"
        } bg-[#0f172a] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[var(--accent)]/80 focus:ring-2 focus:ring-[var(--accent)]/30`}
        placeholder={placeholder}
        type={type}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </label>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M6.5 4.5c.6-1.1 1.6-1.5 2.7-.8l1.3.8c.8.5 1.2 1.5.9 2.4l-.4 1.2a2 2 0 0 0 .5 2l2.3 2.3a2 2 0 0 0 2 .5l1.2-.4c.9-.3 1.9 0 2.4.8l.8 1.3c.7 1.1.3 2.1-.8 2.7-2.4 1.3-6.4.8-10.6-3.4C4.8 10.9 4.3 6.9 6.5 4.5Z"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x={3} y={5} width={18} height={14} rx={2.2} strokeWidth={1.6} />
      <path
        d="m4.5 7.5 6.4 4.3a2.5 2.5 0 0 0 2.8 0l5.8-4"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 20.5s6-4.3 6-10a6 6 0 0 0-12 0c0 5.7 6 10 6 10Z"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={12} cy={10.5} r={2.3} strokeWidth={1.6} />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 3.5 6 5.3v6.2c0 3.3 2.4 6.3 6 7.8 3.6-1.5 6-4.5 6-7.8V5.3L12 3.5Z"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" {...props}>
      <path
        d="m4.5 10.4 3.2 3.1 7.4-7.3"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x={3} y={7.5} width={18} height={11.5} rx={2} strokeWidth={1.6} />
      <path
        d="M9 6a3 3 0 0 1 6 0v1.5H9V6Z"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 12h4m10 0h4" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M10 12h4" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x={4} y={3.5} width={10.5} height={17} rx={1.6} strokeWidth={1.6} />
      <path
        d="M8.5 8h3M8.5 11h3M8.5 14h3"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M14.5 9.5H19v11"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 20.5h18" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx={9} cy={9} r={3} strokeWidth={1.6} />
      <path
        d="M4.5 19v-1.2A3.8 3.8 0 0 1 8.3 14h1.4a3.8 3.8 0 0 1 3.8 3.8V19"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <circle cx={16.5} cy={10.5} r={2.5} strokeWidth={1.6} />
      <path
        d="M14.5 19v-1a3.5 3.5 0 0 1 3.5-3.5h.7a3.3 3.3 0 0 1 1.8.5"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx={12} cy={12} r={8.5} strokeWidth={1.6} />
      <path d="M3.5 12h17" strokeWidth={1.6} strokeLinecap="round" />
      <path
        d="M12 3.5c-2 2.4-3 5.2-3 8s1 5.6 3 8c2-2.4 3-5.2 3-8s-1-5.6-3-8Z"
        strokeWidth={1.6}
      />
      <path
        d="M6 6.5c1.3.9 3.5 1.5 6 1.5s4.7-.6 6-1.5"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M18 17.5c-1.3-.9-3.5-1.5-6-1.5s-4.7.6-6 1.5"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScaleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M6 9.5 3.5 14a3 3 0 0 0 5 0L6 9.5Zm12 0L15.5 14a3 3 0 0 0 5 0L18 9.5Z"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 4v15.5M4 5h16" strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={12} cy={5} r={1.4} fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 10h11m-4-4 4 4-4 4"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
