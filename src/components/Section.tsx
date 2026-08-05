import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-[#e6dbcb] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] opacity-60">{eyebrow}</p>
          )}
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl">{title}</h2>
          {intro && <p className="mt-4 max-w-2xl leading-relaxed opacity-80">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
