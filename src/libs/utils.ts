import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureStartsWith(stringToCheck: string, prefix: string): string {
  return stringToCheck.startsWith(prefix)
    ? stringToCheck
    : `${prefix}${stringToCheck}`
}
