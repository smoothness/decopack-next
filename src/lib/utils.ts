export function ensureStartWith(stringToCheck: string, prefix: string): string {
  return stringToCheck.startsWith(prefix)
    ? stringToCheck
    : `${prefix}${stringToCheck}`
}
