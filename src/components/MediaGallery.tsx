"use client";

import { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/media";

function PhotoCarousel({ photos }: { photos: MediaItem[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % photos.length),
      4000,
    );
    return () => window.clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="relative h-[320px] w-full overflow-hidden border border-[#e6dbcb] bg-white/40 md:h-[520px]">
      {photos.map((photo, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={photo.id}
          src={photo.file_url}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {photos.length > 1 ? (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full border border-[#5a4a42] transition ${
                i === active ? "bg-[#5a4a42]" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  const photos = items.filter((item) => item.media_type === "photo");
  const videos = items.filter((item) => item.media_type === "video");

  if (items.length === 0) {
    return (
      <p className="border border-dashed border-[#e6dbcb] p-10 text-center text-lg opacity-70">
        Portfolio pieces are being added — check back shortly.
      </p>
    );
  }

  return (
    <div className="space-y-12">
      {photos.length > 0 ? <PhotoCarousel photos={photos} /> : null}

      {videos.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <video
              key={video.id}
              src={video.file_url}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full border border-[#e6dbcb] bg-black/5 object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
