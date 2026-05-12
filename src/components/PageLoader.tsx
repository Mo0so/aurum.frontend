import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type PageLoaderProps = {
	className?: string
	label?: string
}

export default function PageLoader({
	className,
	label = 'Loading',
}: PageLoaderProps) {
	return (
		<div
			role='status'
			aria-live='polite'
			className={cn(
				'min-h-screen flex flex-col items-center justify-center gap-3 bg-surface-dark text-surface-dark-foreground',
				className,
			)}
		>
			<Loader2
				className='h-10 w-10 text-gold animate-spin'
				aria-hidden
			/>
			<span className='sr-only'>{label}</span>
		</div>
	)
}
