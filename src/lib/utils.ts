import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type Question = {
  category: string;
  type: "single" | "multi" | "match" | "speech";
  question?: string;
  availableFields?: string[];
  correctFields?: string[];
  disabled?: boolean;
  reason?: string;
  seqNumber: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
