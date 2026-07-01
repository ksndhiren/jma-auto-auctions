import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(
  src?: string,
  options?: { width?: number; quality?: number; fit?: "contain" | "cover" },
): string {
  if (!src) return "";
  const width = options?.width ?? 720;
  const quality = options?.quality ?? 72;
  const fit = options?.fit ?? "contain";
  return `/_image?src=${encodeURIComponent(src)}&w=${width}&q=${quality}&fit=${fit}`;
}

export function getOptimizedLotImageUrl(src?: string): string {
  return getOptimizedImageUrl(src, { width: 720, quality: 72, fit: "contain" });
}
