import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absolureUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
