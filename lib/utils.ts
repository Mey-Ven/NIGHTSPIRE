import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this function to convert USD to MAD
export function convertToMAD(usdPrice: number): number {
  const exchangeRate = 10.05; // Current exchange rate (update as needed)
  return usdPrice * exchangeRate;
}
