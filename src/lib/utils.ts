import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const buildDateTime = (date: string, time: string) => {
	const [hourMin, modifier] = time.split(' ')
	// eslint-disable-next-line prefer-const
	let [hours, minutes] = hourMin.split(':').map(Number)

	if (modifier === 'PM' && hours !== 12) hours += 12
	if (modifier === 'AM' && hours === 12) hours = 0

	const d = new Date(date)
	d.setHours(hours, minutes, 0, 0)

	return d
}
