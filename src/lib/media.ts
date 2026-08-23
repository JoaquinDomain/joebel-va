import { getSupabaseServerClient } from "@/lib/supabase/server";

export const MEDIA_BUCKET = "portfolio_media";

export type MediaItem = {
  id: string;
  file_url: string;
  media_type: "photo" | "video";
  created_at: string;
};

/** Storage object path for a public URL produced by the portfolio_media bucket. */
export function storagePathFromUrl(fileUrl: string) {
  const marker = `/object/public/${MEDIA_BUCKET}/`;
  const index = fileUrl.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(fileUrl.slice(index + marker.length));
}

export async function getMediaItems(): Promise<MediaItem[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("media_gallery")
    .select("id, file_url, media_type, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as MediaItem[];
}
