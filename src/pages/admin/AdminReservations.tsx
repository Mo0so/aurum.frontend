import AdminLayout from '@/components/admin/AdminLayout'
import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { Search, Trash2 } from 'lucide-react'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

type Reservation = {
	_id: string
	fullName: string
	phoneNumber: string
	guests: number
	status: ReservationStatus
	bookingStart: string
}

const actionToStatusMap = {
	confirmed: 'confirm',
	cancelled: 'cancel',
	completed: 'complete',
} as const

export default function AdminReservations() {
	const [reservations, setReservations] = useState<Reservation[]>([])
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>(
		'all',
	)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchReservations = async () => {
		try {
			setLoading(true)
			setError('')

			const res = await axiosClient.get('/admin/reservations')

			setReservations(res.data.reservations)
		} catch (err) {
			setError('Failed to load reservations')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchReservations()
	}, [])

	const filteredReservations = useMemo(() => {
		return reservations.filter(r => {
			const fullName = r.fullName || ''
			const phoneNumber = r.phoneNumber || ''

			const matchSearch =
				fullName.toLowerCase().includes(search.toLowerCase()) ||
				phoneNumber.includes(search)

			const matchStatus = statusFilter === 'all' || r.status === statusFilter

			return matchSearch && matchStatus
		})
	}, [reservations, search, statusFilter])

	const updateStatus = async (
		id: string,
		action: 'confirm' | 'cancel' | 'complete',
	) => {
		try {
			await axiosClient.patch(`/admin/reservations/${id}/${action}`)

			setReservations(prev =>
				prev.map(r =>
					r._id === id
						? {
								...r,
								status:
									action === 'confirm'
										? 'confirmed'
										: action === 'cancel'
											? 'cancelled'
											: 'completed',
							}
						: r,
				),
			)
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	const handleStatusChange = async (
		id: string,
		nextStatus: ReservationStatus,
	) => {
		if (nextStatus === 'pending') {
			return
		}

		const action = actionToStatusMap[nextStatus]

		if (!action) return

		await updateStatus(id, action)
	}

	const deleteReservation = async (id: string) => {
		try {
			await axiosClient.delete(`/admin/reservations/${id}`)

			setReservations(prev => prev.filter(r => r._id !== id))
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	return (
		<AdminLayout>
			<div className='mb-8'>
				<h1 className='font-display text-3xl text-surface-dark-foreground'>
					Reservations
				</h1>
				<p className='text-surface-dark-foreground/50 text-sm mt-1'>
					Manage all bookings
				</p>
			</div>

			<div className='flex flex-wrap gap-4 mb-6'>
				<div className='relative flex-1 min-w-[200px]'>
					<Search
						size={16}
						className='absolute left-3 top-1/2 -translate-y-1/2 text-surface-dark-foreground/40'
					/>
					<input
						type='text'
						placeholder='Search by name or phone...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='w-full bg-surface-dark-elevated border border-border/20 rounded-sm pl-10 pr-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
					/>
				</div>

				<select
					value={statusFilter}
					onChange={e =>
						setStatusFilter(e.target.value as 'all' | ReservationStatus)
					}
					className='bg-surface-dark-elevated border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
				>
					<option value='all'>All Status</option>
					<option value='pending'>Pending</option>
					<option value='confirmed'>Confirmed</option>
					<option value='cancelled'>Cancelled</option>
					<option value='completed'>Completed</option>
				</select>
			</div>

			{loading ? (
				<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-12 text-center'>
					<p className='text-surface-dark-foreground/40'>
						Loading reservations...
					</p>
				</div>
			) : error ? (
				<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-12 text-center'>
					<p className='text-destructive/70'>{error}</p>
				</div>
			) : filteredReservations.length === 0 ? (
				<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-12 text-center'>
					<p className='text-surface-dark-foreground/40'>
						No reservations found.
					</p>
				</div>
			) : (
				<div className='bg-surface-dark-elevated border border-border/10 rounded-sm overflow-x-auto'>
					<table className='w-full text-sm'>
						<thead>
							<tr className='border-b border-border/10'>
								<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
									Guest
								</th>
								<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
									Date & Time
								</th>
								<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
									Guests
								</th>
								<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
									Status
								</th>
								<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
									Actions
								</th>
							</tr>
						</thead>

						<tbody>
							{filteredReservations.map(r => (
								<tr
									key={r._id}
									className='border-b border-border/5 hover:bg-surface-dark/30'
								>
									<td className='p-4'>
										<p className='text-surface-dark-foreground'>{r.fullName}</p>
										<p className='text-surface-dark-foreground/40 text-xs'>
											{r.phoneNumber}
										</p>
									</td>

									<td className='p-4 text-surface-dark-foreground/70'>
										{moment(r.bookingStart).format('DD MMM YYYY, HH:mm')}
									</td>

									<td className='p-4 text-surface-dark-foreground/70'>
										{r.guests}
									</td>

									<td className='p-4'>
										<select
											value={r.status}
											onChange={e =>
												handleStatusChange(
													r._id,
													e.target.value as ReservationStatus,
												)
											}
											className='bg-surface-dark border border-border/20 rounded-sm px-2 py-1 text-xs text-surface-dark-foreground focus:outline-none capitalize'
											disabled={r.status === 'completed'}
										>
											<option value='pending'>Pending</option>
											<option value='confirmed'>Confirmed</option>
											<option value='cancelled'>Cancelled</option>
											<option value='completed'>Completed</option>
										</select>
									</td>

									<td className='p-4'>
										<button
											onClick={() => deleteReservation(r._id)}
											className='text-destructive/60 hover:text-destructive transition-colors'
											type='button'
										>
											<Trash2 size={16} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</AdminLayout>
	)
}
