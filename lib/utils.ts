import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function parseQueryParams(
  searchParams: { [key: string]: string | string[] | undefined }
): { status: string | null; gender: string | null; page: string | null } {
  const status = typeof searchParams.status === 'string' ? searchParams.status : 'all';
  const gender = typeof searchParams.gender === 'string' ? searchParams.gender : 'all';
  const page = typeof searchParams.page === 'string' ? searchParams.page : null;

  return { status, gender, page };
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'bg-green-500';
    case 'dead':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}