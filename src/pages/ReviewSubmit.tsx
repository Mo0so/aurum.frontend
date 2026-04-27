import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { Check, Star } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ReviewSubmit() {
	const { token } = useParams<{ token: string }>()
	const [rating, setRating] = useState(5)
	const [hover, setHover] = useState(0)
	const [text, setText] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const payload = {
				rating,
				comment: text,
				createdAt: new Date().toISOString().slice(0, 10),
			}
			await axiosClient.post(`/review/${token}`, payload)
			setSubmitted(true)
		} catch (error) {
			setError(getErrorMessage(error))
		}
	}

	if (submitted) {
		return (
			<div className='min-h-screen bg-surface-dark flex items-center justify-center p-6'>
				<div className='max-w-md w-full bg-surface-dark-elevated border border-border/10 rounded-sm p-10 text-center'>
					<div className='w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5'>
						<Check className='text-gold' size={24} />
					</div>
					<h1 className='font-display text-2xl text-surface-dark-foreground mb-2'>
						Thank you
					</h1>
					<p className='text-surface-dark-foreground/60 text-sm'>
						Your review has been submitted and is awaiting approval.
					</p>
					<Link
						to='/'
						className='inline-block mt-6 text-gold text-sm hover:underline'
					>
						Back to website
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-surface-dark flex items-center justify-center p-6'>
			<div className='w-full max-w-lg bg-surface-dark-elevated border border-border/10 rounded-sm p-8'>
				<div className='text-center mb-8'>
					<h1 className='font-display text-3xl text-gold'>AURUM</h1>
					<p className='text-surface-dark-foreground/50 text-sm mt-2'>
						Share your experience
					</p>
					<p className='text-surface-dark-foreground/30 text-xs mt-1'>
						Invite token: {token}
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-5'>
					<div>
						<label className='text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-2 block'>
							Rating
						</label>
						<div className='flex gap-1'>
							{[1, 2, 3, 4, 5].map(n => (
								<button
									key={n}
									type='button'
									onMouseEnter={() => setHover(n)}
									onMouseLeave={() => setHover(0)}
									onClick={() => setRating(n)}
									className='p-1'
								>
									<Star
										size={26}
										className={
											(hover || rating) >= n
												? 'fill-gold text-gold'
												: 'text-surface-dark-foreground/30'
										}
									/>
								</button>
							))}
						</div>
					</div>

					<div>
						<label className='text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block'>
							Your Review
						</label>
						<textarea
							value={text}
							onChange={e => setText(e.target.value)}
							rows={5}
							className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 resize-none'
						/>
					</div>

					{error && <p className='text-destructive text-xs'>{error}</p>}

					<button
						type='submit'
						className='w-full gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium'
					>
						Submit Review
					</button>
				</form>
			</div>
		</div>
	)
}
