import AdminLayout from '@/components/admin/AdminLayout'
import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { GalleryItem } from '@/lib/store'
import { Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminGallery() {
	const [gallery, setGallery] = useState<GalleryItem[]>([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const load = async () => {
			try {
				const res = await axiosClient.get('/admin/gallery')
				setGallery(res.data.gallery)
			} catch (error) {
				toast.error(getErrorMessage(error))
			}
		}

		load()
	}, [])

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0]
		if (!f) return

		setFile(f)

		const reader = new FileReader()
		reader.onload = () => setPreview(reader.result as string)
		reader.readAsDataURL(f)
	}

	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			setLoading(true)
			const formData = new FormData()
			formData.append('title', title)
			formData.append('image', file)

			const res = await axiosClient.post('/admin/gallery', formData)

			const newGallery = res.data.gallery

			setGallery(prev => [...prev, newGallery])

			setTitle('')
			setFile(null)
			setPreview('')
			setOpen(false)
			setLoading(false)
		} catch (err) {
			setError(getErrorMessage(err))
		}
	}

	const remove = async (id: string) => {
		try {
			setLoading(true)
			await axiosClient.delete(`/admin/gallery/${id}`)
			setGallery(prev => prev.filter(g => g._id !== id))
			setLoading(false)
		} catch (error) {
			setError(getErrorMessage(error))
		}
	}

	return (
		<AdminLayout>
			<div className='mb-8 flex items-start justify-between gap-4'>
				<div>
					<h1 className='font-display text-3xl text-surface-dark-foreground'>
						Gallery
					</h1>
					<p className='text-surface-dark-foreground/50 text-sm mt-1'>
						Manage gallery images
					</p>
				</div>
				<button
					onClick={() => setOpen(true)}
					className='gold-gradient text-primary-foreground px-4 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2'
				>
					<Plus size={16} /> Add Image
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{gallery.map(item => (
					<div
						key={item._id}
						className='relative group bg-surface-dark-elevated border border-border/10 rounded-sm overflow-hidden'
					>
						<img
							src={item.image.url}
							alt={item.title}
							className='w-full aspect-square object-cover'
						/>
						<div className='absolute inset-0 bg-surface-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
							<button
								onClick={() => remove(item._id)}
								className='bg-destructive text-destructive-foreground p-2 rounded-sm hover:opacity-90'
								disabled={loading}
							>
								<Trash2 size={18} />
							</button>
						</div>
						<p className='p-3 text-surface-dark-foreground/60 text-xs'>
							{item.title}
						</p>
					</div>
				))}
			</div>

			{open && (
				<div
					className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'
					onClick={() => setOpen(false)}
				>
					<div
						className='bg-surface-dark-elevated border border-border/10 rounded-sm w-full max-w-md p-6'
						onClick={e => e.stopPropagation()}
					>
						<div className='flex items-center justify-between mb-6'>
							<h2 className='font-display text-xl text-surface-dark-foreground'>
								Add Gallery Image
							</h2>
							<button
								onClick={() => setOpen(false)}
								className='text-surface-dark-foreground/50 hover:text-surface-dark-foreground'
							>
								<X size={18} />
							</button>
						</div>

						<form onSubmit={handleAdd} className='space-y-4'>
							<div>
								<label className='text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block'>
									Title
								</label>
								<input
									type='text'
									value={title}
									onChange={e => setTitle(e.target.value)}
									className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
									disabled={loading}
								/>
							</div>

							<div>
								<label className='text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block'>
									Upload
								</label>
								<input
									type='file'
									accept='image/*'
									onChange={handleFile}
									className='w-full text-surface-dark-foreground/70 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:bg-gold/10 file:text-gold file:text-xs file:cursor-pointer'
									disabled={loading}
								/>
							</div>

							{preview && (
								<div className='rounded-sm overflow-hidden border border-border/10'>
									<img
										src={preview}
										alt='Preview'
										className='w-full aspect-video object-cover'
									/>
								</div>
							)}

							{error && <p className='text-destructive text-xs'>{error}</p>}

							<div className='flex gap-2 pt-2'>
								<button
									type='button'
									onClick={() => setOpen(false)}
									className='flex-1 border border-border/20 text-surface-dark-foreground py-2.5 rounded-sm text-sm hover:bg-surface-dark transition-colors'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='flex-1 gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium'
									disabled={loading}
								>
									Add Image
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</AdminLayout>
	)
}
