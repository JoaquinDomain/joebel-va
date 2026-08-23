import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteMedia, signOut } from "./actions";
import UploadForm from "./UploadForm";
import GearMark from "@/components/GearMark";
import { getMediaItems } from "@/lib/media";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Studio dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/hidden-studio-login");

  const items = await getMediaItems();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-20">
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#e6dbcb] pb-8">
        <div className="flex items-center gap-4">
          <GearMark className="h-8 w-8" />
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl">Studio dashboard</h1>
            <p className="text-lg opacity-70">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[15px] uppercase tracking-[0.24em] opacity-70 hover:opacity-100">
            View site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="border border-[#5a4a42] px-6 py-2 text-[15px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0]"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl">Add to the portfolio</h2>
        <div className="mt-6">
          <UploadForm />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl">
          Published media ({items.length})
        </h2>
        {items.length === 0 ? (
          <p className="mt-6 border border-dashed border-[#e6dbcb] p-10 text-center text-lg opacity-70">
            Nothing uploaded yet.
          </p>
        ) : (
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id} className="border border-[#e6dbcb] bg-white/40 p-4">
                {item.media_type === "video" ? (
                  <video src={item.file_url} muted loop playsInline controls className="h-48 w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.file_url} alt="" className="h-48 w-full object-cover" />
                )}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-[15px] uppercase tracking-[0.22em] opacity-70">
                    {item.media_type}
                  </span>
                  <form action={deleteMedia}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="file_url" value={item.file_url} />
                    <button
                      type="submit"
                      className="border border-[#a4442f] px-4 py-1.5 text-[13px] uppercase tracking-[0.2em] text-[#a4442f] transition hover:bg-[#a4442f] hover:text-[#f9f6f0]"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
