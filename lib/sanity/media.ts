import type { Image } from "sanity";
import type { SanityImageRef } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export function getMediaUrl(item?: SanityImageRef | null): string | null {
  if (!item) return null;
  const directUrl = item.asset?.url;
  if (directUrl) return directUrl;

  const ref = item.asset?._ref;
  if (ref) {
    try {
      return urlForImage({
        _type: "image",
        asset: { _type: "reference", _ref: ref },
      } as unknown as Image)
        .width(1600)
        .url();
    } catch {
      /* fall through */
    }
  }

  try {
    return urlForImage(item as Image).width(1600).url();
  } catch {
    return null;
  }
}

/** Use for logos/mark: Sanity CDN and local public paths do not always have a file extension. */
export function isDisplayableImageUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("https://cdn.sanity.io/")) return true;
  if (url.startsWith("/")) return true;
  return /\.(png|jpe?g|webp|gif|svg)(\?|#|$)/i.test(url);
}
