export default function Hero() {
  return (
    <section id="home" className="relative isolate">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f9f6f0]/95 via-[#efe4d3]/85 to-[#f9f6f0]/95" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center md:py-44">
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-70">Virtual Assistance</p>
        <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-4xl leading-tight md:text-6xl">
          Empowering your business growth through{" "}
          <span className="accent">reliable</span>,{" "}
          <span className="accent">expert</span>, and{" "}
          <span className="accent">seamless</span> virtual assistance.
        </h1>
        <div className="mt-12 grid gap-10 text-left md:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg">Our Mission</h3>
            <p className="mt-3 leading-relaxed opacity-80">
              To give founders and teams back their most valuable asset — time — by
              delivering dependable administrative, creative, and technical support
              that quietly keeps every operation moving.
            </p>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg">Our Vision</h3>
            <p className="mt-3 leading-relaxed opacity-80">
              To become the trusted long-term partner behind growing businesses
              worldwide, where delegation feels effortless and every task is handled
              with precision and care.
            </p>
          </div>
        </div>
        <a
          href="#contact"
          className="mt-14 border border-[#5a4a42] px-10 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
        >
          Start a conversation
        </a>
      </div>
    </section>
  );
}
