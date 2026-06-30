import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptimizedLotImageUrl(src?: string): string {
  if (!src) return "";
  return `/_image?src=${encodeURIComponent(src)}&w=720&q=72&fit=contain`;
}
