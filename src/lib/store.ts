export interface MenuItem {
	_id: string
	name: string
	description: string
	price: number
	category: 'starters' | 'mains' | 'desserts' | 'drinks'
	image: { url: string; fileId: string }
	available: boolean
}

export interface Reservation {
	_id: string
	fullName: string
	phone: string
	date: string
	time: string
	guests: number
	specialRequests: string
	status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
	createdAt: string
}

export interface DashboardResponse {
	success: boolean
	stats: {
		totalDishes: number
		totalReservations: number
		upcomingBookings: number
		visitedBookings: number
	}
	reservations: Reservation[]
}

export interface Review {
	_id: string
	fullName: string
	rating: number
	comment: string
	createdAt: string
	status: 'pending' | 'approved' | 'rejected'
}

export interface GalleryItem {
	_id: string
	title: string
	image: {
		url: string
		fileId: string
	}
}

export interface DayHours {
	isClosed: boolean
	openTime: string
	closeTime: string
}

export interface Restaurant {
	_id: string
	name: string
	tagline: string
	address: string
	phone: string
	email: string

	workingHours: {
		mon: DayHours
		tue: DayHours
		wed: DayHours
		thu: DayHours
		fri: DayHours
		sat: DayHours
		sun: DayHours
	}

	instagram?: string
	facebook?: string
	twitter?: string

	createdAt: string
}
