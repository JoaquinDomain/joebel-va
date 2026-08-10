import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PinnedServices, { type ServiceTrack } from "@/components/PinnedServices";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const SERVICES: ServiceTrack[] = [
  {
    title: "General Admin",
    blurb:
      "The day-to-day backbone: your inbox, your calendar, and your records kept in order without you asking.",
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
    blurb:
      "Creative and growth support that keeps your brand visible and your pipeline filling up.",
    items: [
      "Social media management",
      "Basic graphic design (Canva)",
      "Video editing",
      "Lead generation",
    ],
  },
  {
    title: "Industrial VA",
    blurb:
      "Technical assistance for operations-heavy teams that run on documentation and data.",
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
          intro="Three interlocking support tracks, delivered by a virtual assistant who learns your business and works as an extension of your team."
        >
          <PinnedServices services={SERVICES} />
        </Section>

        <Section
          id="pricing"
          eyebrow="Engagement"
          title="Pricing"
          intro="Transparent rates with no hidden fees. Choose the rhythm that matches your workload."
        >
          <div className="grid gap-10 md:grid-cols-3">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1} className="border border-[#e6dbcb] bg-white/40 p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-30px_#5a4a42]">
                <p className="text-[15px] uppercase tracking-[0.22em] opacity-70">{p.name}</p>
                <p className="mt-6 font-[family-name:var(--font-playfair)] text-3xl">{p.price}</p>
                <p className="accent mt-1 text-lg">{p.unit}</p>
                <p className="mt-6 text-lg leading-relaxed opacity-80">{p.note}</p>
                <a
                  href="#contact"
                  className="mt-8 inline-block border border-[#5a4a42] px-8 py-2.5 text-[15px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
                >
                  Enquire
                </a>
              </Reveal>
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
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1} className="border border-[#e6dbcb] bg-white/40 p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-30px_#5a4a42]">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl">{r.title}</h3>
                <p className="mt-4 text-lg leading-relaxed opacity-80">{r.description}</p>
                <a
                  href={resourceUrl(r.file)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block border border-[#5a4a42] px-8 py-2.5 text-[15px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
                >
                  Download PDF
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-[15px] uppercase tracking-[0.22em] opacity-70">Tool stack directory</p>
            <ul className="mt-5 flex flex-wrap gap-3 text-lg">
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
          intro="The same precision, geared to where your business is today."
        >
          <div className="grid gap-10 md:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1} className="border border-[#e6dbcb] bg-white/40 p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-30px_#5a4a42]">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl">{s.name}</h3>
                <p className="mt-4 text-lg leading-relaxed opacity-80">{s.copy}</p>
              </Reveal>
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
            <div className="space-y-6 text-lg leading-relaxed">
              <div>
                <p className="text-[15px] uppercase tracking-[0.22em] opacity-70">Email</p>
                <a href="mailto:hello@gearsvirtual.com" className="mt-1 block underline-offset-4 hover:underline">
                  hello@gearsvirtual.com
                </a>
              </div>
              <div>
                <p className="text-[15px] uppercase tracking-[0.22em] opacity-70">Phone / WhatsApp</p>
                <a href="https://wa.me/639000000000" className="mt-1 block underline-offset-4 hover:underline">
                  +63 900 000 0000
                </a>
              </div>
              <div>
                <p className="text-[15px] uppercase tracking-[0.22em] opacity-70">Social</p>
                <p className="mt-1 opacity-80">@gearsvirtual on LinkedIn, Instagram & Facebook</p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[#e6dbcb] px-6 py-10 text-center text-[15px] uppercase tracking-[0.24em] opacity-70">
        © {new Date().getFullYear()} Gears Virtual Solutions
      </footer>
    </>
  );
}
