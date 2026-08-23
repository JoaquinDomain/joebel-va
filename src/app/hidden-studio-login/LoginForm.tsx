"use client";

import { useActionState } from "react";
import { signIn, type ActionState } from "@/app/admin-dashboard/actions";

const initialState: ActionState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="w-full max-w-md space-y-6">
      <div>
        <label htmlFor="email" className="text-[15px] uppercase tracking-[0.22em] opacity-70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-[#e6dbcb] bg-white/60 px-4 py-3 text-lg outline-none focus:border-[#5a4a42]"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-[15px] uppercase tracking-[0.22em] opacity-70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-[#e6dbcb] bg-white/60 px-4 py-3 text-lg outline-none focus:border-[#5a4a42]"
        />
      </div>

      {state.error ? <p className="text-lg text-[#a4442f]">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-[#5a4a42] px-8 py-3 text-[15px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0] disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Enter studio"}
      </button>
    </form>
  );
}
