"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ServiceTrack = {
  title: string;
  blurb: string;
  items: string[];
};

export default function PinnedServices({ services }: { services: ServiceTrack[] }) {
  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container.current,
          start: "top 96px",
          end: () => `+=${(container.current?.offsetHeight ?? 0) - window.innerHeight + 160}`,
          pin: panel.current,
          pinSpacing: false,
        });

        gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      }, container);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={container} className="grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
      <div ref={panel} className="self-start md:h-[70vh]">
        <div className="relative h-72 overflow-hidden border border-[#e6dbcb] md:h-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f9f6f0]/90 via-[#e6dbcb]/45 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-[13px] uppercase tracking-[0.3em] opacity-70">Your partner</p>
            <p className="mt-3 max-w-xs font-[family-name:var(--font-playfair)] text-2xl leading-snug">
              One assistant, <span className="accent">every</span> corner of your operation.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {services.map((s, i) => (
          <article key={s.title} className="service-card border border-[#e6dbcb] bg-white/50 p-8">
            <p className="text-[13px] uppercase tracking-[0.3em] opacity-60">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl">{s.title}</h3>
            <p className="mt-3 text-base leading-relaxed opacity-80">{s.blurb}</p>
            <ul className="mt-6 grid gap-3 text-base opacity-80 sm:grid-cols-2">
              {s.items.map((item) => (
                <li key={item} className="border-l border-[#c9b9a4] pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
