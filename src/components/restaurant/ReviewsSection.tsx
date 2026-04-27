import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { Review } from '@/lib/store'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function ReviewsSection() {
	const [reviews, setReviews] = useState<Review[]>([])

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await axiosClient.get('/review')
				setReviews(res.data.reviews)
			} catch (error) {
				console.error(getErrorMessage(error))
			}
		}

		fetchReviews()
	}, [])

	return (
		<section id='reviews' className='section-padding bg-surface-dark-elevated'>
			<div className='max-w-6xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-12'
				>
					<p className='text-gold text-sm tracking-[0.3em] uppercase mb-3'>
						Testimonials
					</p>
					<h2 className='font-display text-4xl md:text-5xl text-surface-dark-foreground'>
						What Our Guests Say
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{reviews.map((review, i) => (
						<motion.div
							key={review._id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className='bg-surface-dark border border-border/10 rounded-sm p-8'
						>
							<div className='flex gap-1 mb-4'>
								{Array.from({ length: 5 }).map((_, j) => (
									<Star
										key={j}
										size={16}
										className={
											j < review.rating
												? 'fill-gold text-gold'
												: 'text-surface-dark-foreground/20'
										}
									/>
								))}
							</div>
							<p className='text-surface-dark-foreground/70 text-sm leading-relaxed mb-6 italic'>
								"{review.comment}"
							</p>
							<div>
								<p className='text-surface-dark-foreground font-medium text-sm'>
									{review.fullName}
								</p>
								<p className='text-surface-dark-foreground/40 text-xs'>
									{moment(review.createdAt).format('DD-MM-YYYY')}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
