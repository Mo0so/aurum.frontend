import AdminLayout from '@/components/admin/AdminLayout'
import { axiosClient } from '@/lib/api'
import { DashboardResponse } from '@/lib/store'
import { CalendarDays, Users, UtensilsCrossed } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

export default function AdminDashboard() {
	const [data, setData] = useState<DashboardResponse | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchDashboard = async () => {
			try {
				setLoading(true)

				const [statsRes, reservationsRes] = await Promise.all([
					axiosClient.get('/admin/dashboard/stats'),
					axiosClient.get('/admin/reservations'),
				])

				const reservations = Array.isArray(reservationsRes.data)
					? reservationsRes.data
					: (reservationsRes.data?.reservations ?? [])

				setData({
					success: true,
					stats: statsRes.data.stats,
					reservations,
				})
			} catch (err) {
				setError('Failed to load dashboard')
			} finally {
				setLoading(false)
			}
		}

		fetchDashboard()
	}, [])

	const stats = useMemo(() => {
		if (!data) return []

		return [
			{
				label: 'Total Reservations',
				value: data.stats.totalReservations,
				icon: CalendarDays,
				color: 'text-gold',
			},
			{
				label: 'Upcoming Bookings',
				value: data.stats.upcomingBookings,
				icon: Users,
				color: 'text-gold',
			},
			{
				label: 'Visited Bookings',
				value: data.stats.visitedBookings,
				icon: CalendarDays,
				color: 'text-gold',
			},
			{
				label: 'Total Dishes',
				value: data.stats.totalDishes,
				icon: UtensilsCrossed,
				color: 'text-gold',
			},
		]
	}, [data])

	const statusCounts = useMemo(() => {
		if (!data) return null

		const counts = {
			pending: 0,
			confirmed: 0,
			cancelled: 0,
			completed: 0,
		}

		for (const r of data.reservations) {
			counts[r.status]++
		}

		return counts
	}, [data])

	const latestReservations = useMemo(() => {
		if (!data) return []

		return [...data.reservations]
			.sort((a, b) => {
				const aTime = new Date(a.createdAt ?? a.createdAt ?? 0).getTime()
				const bTime = new Date(b.createdAt ?? b.createdAt ?? 0).getTime()
				return bTime - aTime
			})
			.slice(0, 3)
	}, [data])

	return (
		<AdminLayout>
			<div className='mb-8'>
				<h1 className='font-display text-3xl text-surface-dark-foreground'>
					Dashboard
				</h1>
				<p className='text-surface-dark-foreground/50 text-sm mt-1'>
					Welcome back. Here's your overviewnpm.
				</p>
			</div>

			{loading ? (
				<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-12 text-center'>
					<p className='text-surface-dark-foreground/40'>
						Loading dashboard...
					</p>
				</div>
			) : error ? (
				<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-12 text-center'>
					<p className='text-destructive/70'>{error}</p>
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						{stats.map(s => (
							<div
								key={s.label}
								className='bg-surface-dark-elevated border border-border/10 rounded-sm p-6'
							>
								<div className='flex items-center justify-between mb-4'>
									<s.icon size={20} className={s.color} />
								</div>
								<p className='font-display text-3xl text-surface-dark-foreground'>
									{s.value}
								</p>
								<p className='text-surface-dark-foreground/50 text-sm mt-1'>
									{s.label}
								</p>
							</div>
						))}
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-6'>
							<h3 className='font-display text-lg text-surface-dark-foreground mb-4'>
								Reservation Status
							</h3>

							<div className='space-y-3'>
								{Object.entries(statusCounts).map(([status, count]) => (
									<div
										key={status}
										className='flex items-center justify-between'
									>
										<div className='flex items-center gap-3'>
											<div
												className={`w-2 h-2 rounded-full ${
													status === 'pending'
														? 'bg-yellow-500'
														: status === 'confirmed'
															? 'bg-green-500'
															: status === 'cancelled'
																? 'bg-red-500'
																: 'bg-blue-500'
												}`}
											/>
											<span className='text-surface-dark-foreground/70 text-sm capitalize'>
												{status}
											</span>
										</div>
										<span className='text-surface-dark-foreground font-medium'>
											{count}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className='bg-surface-dark-elevated border border-border/10 rounded-sm p-6'>
							<h3 className='font-display text-lg text-surface-dark-foreground mb-4'>
								Recent Reservations
							</h3>

							{latestReservations.length === 0 ? (
								<p className='text-surface-dark-foreground/40 text-sm'>
									No reservations yet.
								</p>
							) : (
								<div className='space-y-3'>
									{latestReservations.map(r => (
										<div
											key={r._id}
											className='flex items-center justify-between py-2 border-b border-border/5 last:border-0'
										>
											<div>
												<p className='text-surface-dark-foreground text-sm'>
													{r.fullName}
												</p>
												<p className='text-surface-dark-foreground/40 text-xs'>
													{r.date} at {r.time} · {r.guests} guests
												</p>
											</div>

											<span
												className={`text-xs px-2 py-1 rounded-sm capitalize ${
													r.status === 'pending'
														? 'bg-yellow-500/10 text-yellow-500'
														: r.status === 'confirmed'
															? 'bg-green-500/10 text-green-500'
															: r.status === 'cancelled'
																? 'bg-red-500/10 text-red-500'
																: 'bg-blue-500/10 text-blue-500'
												}`}
											>
												{r.status}
											</span>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</AdminLayout>
	)
}
