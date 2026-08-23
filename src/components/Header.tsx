"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import GearMark from "@/components/GearMark";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#resources", label: "Resources" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#solutions", label: "Solutions" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com", label: "LinkedIn", d: "M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21H9z" },
  { href: "https://www.instagram.com", label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.25.07 1.62.07 4.8s0 3.55-.07 4.8c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.55 2.2 15.18 2.2 12s0-3.55.07-4.8c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.45 2.2 8.82 2.2 12 2.2zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8zm0 2.2a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm6.65-2.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" },
  { href: "https://www.facebook.com", label: "Facebook", d: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8z" },
];

export default function Header() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const gearRotation = useTransform(progress, [0, 1], [0, 540]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6dbcb] bg-[#f9f6f0]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex items-center gap-5">
          <a href="#home" className="flex items-center gap-3">
            <motion.span style={{ rotate: gearRotation }} className="block h-7 w-7 shrink-0 opacity-80">
              <GearMark className="h-full w-full" />
            </motion.span>
            <span className="flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-playfair)] text-2xl uppercase tracking-[0.16em] whitespace-nowrap">
                Gears
              </span>
              <span className="accent text-base whitespace-nowrap opacity-80">virtual solutions</span>
            </span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="opacity-70 transition hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] uppercase tracking-[0.14em] lg:flex-nowrap lg:gap-x-7 lg:text-[14px]">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative whitespace-nowrap opacity-75 transition hover:opacity-100"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#5a4a42] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-[#5a4a42]/60"
      />
    </header>
  );
}
