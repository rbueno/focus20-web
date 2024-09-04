import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmptyObject = (obj: object) => {
  if (!obj) return true
  if (typeof obj !== 'object') return true
  return Object.keys(obj).length === 0
}