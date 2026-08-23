"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MEDIA_BUCKET, storagePathFromUrl } from "@/lib/media";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; success?: string };

export async function signIn(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) return { error: error.message };

  redirect("/admin-dashboard");
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/hidden-studio-login");
}

export async function uploadMedia(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to upload media." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a photo or video to upload." };
  }

  const mediaType = file.type.startsWith("video/") ? "video" : "photo";
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${mediaType}s/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  const { error: insertError } = await supabase
    .from("media_gallery")
    .insert({ file_url: publicUrl, media_type: mediaType });
  if (insertError) {
    await supabase.storage.from(MEDIA_BUCKET).remove([path]);
    return { error: insertError.message };
  }

  revalidatePath("/");
  revalidatePath("/admin-dashboard");
  return { success: `${mediaType === "video" ? "Video" : "Photo"} published.` };
}

export async function deleteMedia(formData: FormData) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const id = String(formData.get("id") ?? "");
  const fileUrl = String(formData.get("file_url") ?? "");

  await supabase.from("media_gallery").delete().eq("id", id);

  const path = storagePathFromUrl(fileUrl);
  if (path) await supabase.storage.from(MEDIA_BUCKET).remove([path]);

  revalidatePath("/");
  revalidatePath("/admin-dashboard");
}
