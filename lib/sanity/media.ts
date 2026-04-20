import type { Image } from "sanity";
import type { SanityImageRef } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export function getMediaUrl(item?: SanityImageRef): string | null {
  if (!item) return null;
  const directUrl = item.asset?.url;
  if (directUrl) return directUrl;

  try {
    return urlForImage(item as Image).width(1600).url();
  } catch {
    return null;
  }
}
