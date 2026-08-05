import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Section from "@/components/Section";

const SERVICES = [
  {
    title: "General Admin",
    items: [
      "Calendar management",
      "Email triage",
      "Data entry",
      "CRM maintenance",
      "Travel coordination",
    ],
  },
  {
    title: "Specialized VA",
    items: [
      "Social media management",
      "Basic graphic design (Canva)",
      "Video editing",
      "Lead generation",
    ],
  },
  {
    title: "Industrial VA",
    items: [
      "Technical documentation",
      "System workflow mapping",
      "Inventory tracking",
      "Data analytics support",
    ],
  },
];

const PRICING = [
  {
    name: "Hourly Plan",
    price: "$12 – $18",
    unit: "per hour",
    note: "Flexible engagement, billed bi-weekly.",
  },
  {
    name: "Part-Time Retainer",
    price: "$950",
    unit: "per month",
    note: "20 hours per week of dedicated support.",
  },
  {
    name: "Full-Time Retainer",
    price: "$1,800",
    unit: "per month",
    note: "40 hours per week of dedicated support.",
  },
];

const RESOURCES = [
  {
    title: "Client Onboarding Kit",
    description: "Everything you need to bring a virtual assistant onto your team in week one.",
    file: "client-onboarding-kit.pdf",
  },
  {
    title: "Delegation Guide & Templates",
    description: "Frameworks and ready-to-use templates for handing off work with confidence.",
    file: "delegation-guide-and-templates.pdf",
  },
];

const TOOL_STACK = ["Slack", "Notion", "Asana", "Google Workspace", "Zapier"];

const SOLUTIONS = [
  {
    name: "Solo Entrepreneurs",
    copy: "Reclaim your calendar and inbox so you can stay focused on clients and revenue, without hiring a full-time employee.",
  },
  {
    name: "Growing Startups",
    copy: "Flexible support that scales with your roadmap — from lead generation and social media to operational documentation.",
  },
  {
    name: "Established Enterprises",
    copy: "Process-driven assistance for structured teams: workflow mapping, inventory tracking, and analytics support you can rely on.",
  },
];

function resourceUrl(file: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/resources/${file}` : "#contact";
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        <Section
          id="services"
          eyebrow="What we do"
          title="Services"
          intro="Three focused support tracks, delivered by a virtual assistant who learns your business and works as an extension of your team."
        >
          <div className="grid gap-10 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="border border-[#e6dbcb] bg-white/40 p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl">{s.title}</h3>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed opacity-80">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="pricing"
          eyebrow="Engagement"
          title="Pricing"
          intro="Transparent rates with no hidden fees. Choose the rhythm that matches your workload."
        >
          <div className="grid gap-10 md:grid-cols-3">
            {PRICING.map((p) => (
              <div key={p.name} className="border border-[#e6dbcb] bg-white/40 p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">{p.name}</p>
                <p className="mt-6 font-[family-name:var(--font-playfair)] text-3xl">{p.price}</p>
                <p className="accent mt-1 text-sm">{p.unit}</p>
                <p className="mt-6 text-sm leading-relaxed opacity-80">{p.note}</p>
                <a
                  href="#contact"
                  className="mt-8 inline-block border border-[#5a4a42] px-8 py-2.5 text-[11px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="resources"
          eyebrow="Free downloads"
          title="Resources"
          intro="Practical guides to help you delegate well, plus the tool stack we work in every day."
        >
          <div className="grid gap-10 md:grid-cols-2">
            {RESOURCES.map((r) => (
              <div key={r.title} className="border border-[#e6dbcb] bg-white/40 p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl">{r.title}</h3>
                <p className="mt-4 text-sm leading-relaxed opacity-80">{r.description}</p>
                <a
                  href={resourceUrl(r.file)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block border border-[#5a4a42] px-8 py-2.5 text-[11px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">Tool stack directory</p>
            <ul className="mt-5 flex flex-wrap gap-3 text-sm">
              {TOOL_STACK.map((t) => (
                <li key={t} className="border border-[#e6dbcb] px-5 py-2">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="solutions"
          eyebrow="Who we help"
          title="Solutions"
          intro="The same care, shaped around where your business is today."
        >
          <div className="grid gap-10 md:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <div key={s.name} className="border border-[#e6dbcb] bg-white/40 p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl">{s.name}</h3>
                <p className="mt-4 text-sm leading-relaxed opacity-80">{s.copy}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          eyebrow="Let's talk"
          title="Contact"
          intro="Tell us what is on your plate and we will reply within one business day."
        >
          <div className="grid gap-16 md:grid-cols-2">
            <ContactForm />
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">Email</p>
                <a href="mailto:hello@joebelva.com" className="mt-1 block underline-offset-4 hover:underline">
                  hello@joebelva.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">Phone / WhatsApp</p>
                <a href="https://wa.me/639000000000" className="mt-1 block underline-offset-4 hover:underline">
                  +63 900 000 0000
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">Social</p>
                <p className="mt-1 opacity-80">@joebelva on LinkedIn, Instagram & Facebook</p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[#e6dbcb] px-6 py-10 text-center text-[11px] uppercase tracking-[0.24em] opacity-70">
        © {new Date().getFullYear()} Joebel Virtual Assistance
      </footer>
    </>
  );
}
