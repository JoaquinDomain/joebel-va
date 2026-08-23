import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import GearMark from "@/components/GearMark";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Studio access",
  robots: { index: false, follow: false },
};

export default async function HiddenStudioLogin() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (user) redirect("/admin-dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <GearMark className="h-10 w-10" />
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl">Studio access</h1>
        <p className="accent text-xl">for the team behind the gears</p>
      </div>
      <LoginForm />
      <Link href="/" className="text-[15px] uppercase tracking-[0.24em] opacity-60 hover:opacity-100">
        Back to site
      </Link>
    </main>
  );
}
