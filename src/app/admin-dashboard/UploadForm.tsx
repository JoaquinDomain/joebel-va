"use client";

import { useActionState } from "react";
import { uploadMedia, type ActionState } from "./actions";

const initialState: ActionState = {};

export default function UploadForm() {
  const [state, formAction, pending] = useActionState(uploadMedia, initialState);

  return (
    <form action={formAction} className="space-y-6 border border-[#e6dbcb] bg-white/40 p-8">
      <div>
        <label htmlFor="file" className="text-[15px] uppercase tracking-[0.22em] opacity-70">
          Photo or video
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*,video/*"
          required
          className="mt-3 w-full border border-[#e6dbcb] bg-white/60 px-4 py-3 text-lg file:mr-4 file:border-0 file:bg-[#5a4a42] file:px-4 file:py-2 file:text-[13px] file:uppercase file:tracking-[0.2em] file:text-[#f9f6f0]"
        />
        <p className="mt-3 text-lg opacity-70">
          Videos autoplay muted on the public site; photos join the crossfading carousel.
        </p>
      </div>

      {state.error ? <p className="text-lg text-[#a4442f]">{state.error}</p> : null}
      {state.success ? <p className="text-lg opacity-80">{state.success}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="border border-[#5a4a42] px-8 py-3 text-[15px] uppercase tracking-[0.24em] transition hover:bg-[#5a4a42] hover:text-[#f9f6f0] disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
