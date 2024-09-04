import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmptyObject = (obj: object) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0
}