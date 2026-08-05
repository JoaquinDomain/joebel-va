"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const SERVICES = [
  "General Admin Support",
  "Specialized VA Support",
  "Industrial VA Support",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setStatus("error");
      setError("The inquiry form is not configured yet. Please email us directly.");
      return;
    }

    setStatus("sending");
    setError("");

    const { error: insertError } = await supabase.from("inquiries").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      service_interest: String(data.get("service_interest") ?? ""),
      message: String(data.get("message") ?? ""),
    });

    if (insertError) {
      setStatus("error");
      setError(insertError.message);
      return;
    }

    form.reset();
    setStatus("sent");
  }

  const inputClass =
    "w-full border-b border-[#c9b9a4] bg-transparent px-1 py-3 outline-none transition focus:border-[#5a4a42]";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <label className="grid gap-2">
        <span className="text-[11px] uppercase tracking-[0.22em] opacity-70">Name</span>
        <input name="name" required className={inputClass} />
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] uppercase tracking-[0.22em] opacity-70">Email</span>
        <input name="email" type="email" required className={inputClass} />
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] uppercase tracking-[0.22em] opacity-70">
          Service interest
        </span>
        <select name="service_interest" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] uppercase tracking-[0.22em] opacity-70">Message</span>
        <textarea name="message" rows={4} required className={inputClass} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="justify-self-start border border-[#5a4a42] px-10 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0] disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send inquiry"}
      </button>
      {status === "sent" && (
        <p className="text-sm opacity-80">Thank you — your inquiry has been received.</p>
      )}
      {status === "error" && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
