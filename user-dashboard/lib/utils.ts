import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  console.log(date)
  const day = date.getDate().toString().padStart(2, '0');  
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}