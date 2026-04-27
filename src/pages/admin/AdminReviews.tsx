import AdminLayout from '@/components/admin/AdminLayout'
import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { Review } from '@/lib/store'
import { Eye, EyeOff, Star, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminReviews() {
	const [reviews, setReviews] = useState<Review[]>([])

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await axiosClient.get('/admin/review')
				setReviews(res.data.reviews)
			} catch (error) {
				toast.error('Failed to fetch reviews')
			}
		}

		fetchReviews()
	}, [])

	const toggleApproval = async (id: string, currentStatus: string) => {
		try {
			let newStatus: 'pending' | 'approved' | 'rejected'

			if (currentStatus === 'approved') newStatus = 'rejected'
			else newStatus = 'approved'

			const res = await axiosClient.patch(`/admin/review/${id}/status`, {
				status: newStatus,
			})

			setReviews(prev => prev.map(r => (r._id === id ? res.data.review : r)))
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	}

	const remove = async (id: string) => {
		try {
			await axiosClient.delete(`/admin/review/${id}`)
			setReviews(prev => prev.filter(r => r._id !== id))
		} catch (error) {
			toast.error('Delete failed')
		}
	}

	return (
		<AdminLayout>
			<div className='mb-8'>
				<h1 className='font-display text-3xl text-surface-dark-foreground'>
					Reviews
				</h1>
				<p className='text-surface-dark-foreground/50 text-sm mt-1'>
					Manage customer reviews
				</p>
			</div>

			<div className='space-y-4'>
				{reviews.map(review => (
					<div
						key={review._id}
						className='bg-surface-dark-elevated border border-border/10 rounded-sm p-6 flex gap-6'
					>
						<div className='flex-1'>
							<div className='flex items-center gap-3 mb-2'>
								<span className='text-surface-dark-foreground font-medium text-sm'>
									{review.fullName}
								</span>

								<div className='flex gap-0.5'>
									{Array.from({ length: 5 }).map((_, j) => (
										<Star
											key={j}
											size={12}
											className={
												j < review.rating
													? 'fill-gold text-gold'
													: 'text-surface-dark-foreground/20'
											}
										/>
									))}
								</div>

								<span className='text-surface-dark-foreground/30 text-xs'>
									{new Date(review.createdAt).toLocaleDateString()}
								</span>

								{review.status === 'pending' && (
									<span className='text-xs px-2 py-0.5 rounded-sm bg-yellow-500/10 text-yellow-500'>
										pending
									</span>
								)}

								{review.status === 'rejected' && (
									<span className='text-xs px-2 py-0.5 rounded-sm bg-red-500/10 text-red-500'>
										rejected
									</span>
								)}
							</div>

							<p className='text-surface-dark-foreground/60 text-sm'>
								{review.comment}
							</p>
						</div>

						<div className='flex gap-2 items-start'>
							<button
								onClick={() => toggleApproval(review._id, review.status)}
								className='text-surface-dark-foreground/40 hover:text-gold transition-colors'
								title={
									review.status === 'approved'
										? 'Hide review'
										: 'Approve review'
								}
							>
								{review.status === 'approved' ? (
									<EyeOff size={16} />
								) : (
									<Eye size={16} />
								)}
							</button>

							<button
								onClick={() => remove(review._id)}
								className='text-destructive/60 hover:text-destructive transition-colors'
							>
								<Trash2 size={16} />
							</button>
						</div>
					</div>
				))}
			</div>
		</AdminLayout>
	)
}
