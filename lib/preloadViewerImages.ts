import { getImageProps } from "next/image";
import { VIEWER_SIZES } from "@/components/Lightbox";

const started = new Set<string>();

/**
 * Starts downloading the first few lightbox photos before the viewer opens —
 * called when someone hovers, focuses or touches a tile. Each photo is loaded
 * into an off-screen <img> with the exact srcset/sizes the viewer renders
 * with, so the browser picks the same file and serves the viewer from cache.
 */
export function preloadViewerImages(images: string[], count = 2) {
  for (const src of images.slice(0, count)) {
    if (started.has(src)) continue;
    started.add(src);
    const { props } = getImageProps({ src, alt: "", fill: true, sizes: VIEWER_SIZES });
    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = "high";
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
  }
}
