"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GearMark from "@/components/GearMark";

const MOTTO = [
  { word: "The", accent: false },
  { word: "moving", accent: true },
  { word: "parts", accent: true },
  { word: "behind", accent: false },
  { word: "your", accent: false },
  { word: "business", accent: false },
  { word: "growth", accent: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const gearA = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const gearB = useTransform(scrollYProgress, [0, 1], [0, -240]);

  return (
    <section id="home" ref={ref} className="relative isolate overflow-hidden">
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 -z-20"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f9f6f0]/95 via-[#efe4d3]/85 to-[#f9f6f0]/95" />

      <motion.div
        style={{ rotate: gearA }}
        className="pointer-events-none absolute -left-24 top-16 -z-10 h-72 w-72 opacity-[0.07]"
      >
        <GearMark className="h-full w-full" />
      </motion.div>
      <motion.div
        style={{ rotate: gearB }}
        className="pointer-events-none absolute -right-16 bottom-10 -z-10 h-52 w-52 opacity-[0.07]"
      >
        <GearMark className="h-full w-full" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center md:py-44"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 0.7, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15px] uppercase"
        >
          Gears Virtual Solutions
        </motion.p>

        <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-4xl leading-tight md:text-6xl">
          {MOTTO.map(({ word, accent }, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={accent ? "accent inline-block" : "inline-block"}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-8 max-w-2xl leading-relaxed"
        >
          Reliable, expert, and seamless virtual assistance — the gears turning quietly
          behind your admin, marketing, and operations.
        </motion.p>

        <div className="mt-12 grid gap-10 text-left md:grid-cols-2">
          {[
            {
              title: "Our Mission",
              copy: "To give founders and teams back their most valuable asset — time — by delivering dependable administrative, creative, and technical support that keeps every part of the machine turning.",
            },
            {
              title: "Our Vision",
              copy: "To become the trusted long-term partner behind growing businesses worldwide, where delegation feels effortless and every task is handled with precision and care.",
            },
          ].map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-xl">{block.title}</h3>
              <p className="mt-3 leading-relaxed opacity-80">{block.copy}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-14 border border-[#5a4a42] px-10 py-3 text-[15px] uppercase tracking-[0.28em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
        >
          Start a conversation
        </motion.a>
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.3em] opacity-60"
      >
        scroll
      </motion.div>
    </section>
  );
}
