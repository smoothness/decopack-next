import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureStartWith(stringToCheck: string, prefix: string): string {
  return stringToCheck.startsWith(prefix)
    ? stringToCheck
    : `${prefix}${stringToCheck}`
}
