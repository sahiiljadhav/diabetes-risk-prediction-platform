import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};
