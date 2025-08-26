import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ViteImportMeta = ImportMeta & { env?: Record<string, string | undefined> };
const viteMeta: ViteImportMeta = (import.meta as unknown as ViteImportMeta) || ({} as ViteImportMeta);
const rawBase = (viteMeta.env?.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
export const API_BASE: string = rawBase;