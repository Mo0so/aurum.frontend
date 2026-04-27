import AdminLayout from '@/components/admin/AdminLayout'
import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { type MenuItem } from '@/lib/store'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminMenu() {
	const [items, setItems] = useState<MenuItem[]>([])
	const [editing, setEditing] = useState<MenuItem | null>(null)
	const [isNew, setIsNew] = useState(false)
	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const load = async () => {
			try {
				const res = await axiosClient.get('/admin/dishes')

				const data = Array.isArray(res.data)
					? res.data
					: Array.isArray(res.data?.dishes)
						? res.data.dishes
						: Array.isArray(res.data?.data)
							? res.data.data
							: []

				setItems(data)
			} catch {
				toast.error('Failed to load menu')
			}
		}
		load()
	}, [])

	const save = async (item: MenuItem) => {
		try {
			setLoading(true)
			const formData = new FormData()

			formData.append('name', item.name)
			formData.append('description', item.description || '')
			formData.append('price', String(item.price))
			formData.append('category', item.category)
			formData.append('available', String(item.available))

			if (file) {
				formData.append('image', file)
			}

			let res

			if (isNew) {
				res = await axiosClient.post('/admin/dishes', formData)
				setItems(prev => [...prev, res.data.dish])
			} else {
				res = await axiosClient.put(`/admin/dishes/${item._id}`, formData)
				setItems(prev =>
					prev.map(i => (i._id === item._id ? res.data.dish : i)),
				)
			}
			setEditing(null)
			setIsNew(false)
			setFile(null)

			toast.success('Saved successfully')
		} catch (err) {
			toast.error(getErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0]
		if (!f) return

		setFile(f)

		const reader = new FileReader()
		reader.onload = () => {
			setEditing(prev =>
				prev
					? {
							...prev,
							image: {
								...prev.image,
								url: reader.result as string,
							},
						}
					: prev,
			)
		}
		reader.readAsDataURL(f)
	}

	const remove = async (id: string) => {
		try {
			setLoading(true)
			await axiosClient.delete(`/admin/dishes/${id}`)
			setItems(prev => prev.filter(i => i._id !== id))
			toast.success('Deleted')
			setLoading(false)
		} catch {
			toast.error('Something went wrong')
		}
	}

	return (
		<AdminLayout>
			<div className='flex items-center justify-between mb-8'>
				<div>
					<h1 className='font-display text-3xl text-surface-dark-foreground'>
						Menu
					</h1>
					<p className='text-surface-dark-foreground/50 text-sm mt-1'>
						Manage dishes and categories
					</p>
				</div>
				<button
					onClick={() => {
						setEditing({
							_id: '',
							name: '',
							description: '',
							price: 0,
							category: 'starters',
							image: { url: '', fileId: '' },
							available: true,
						})
						setIsNew(true)
					}}
					className='gold-gradient text-primary-foreground px-4 py-2 rounded-sm text-sm flex items-center gap-2'
				>
					<Plus size={16} /> Add Dish
				</button>
			</div>

			{editing && (
				<div className='fixed inset-0 bg-surface-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
					<div className='bg-surface-dark-elevated border border-border/20 rounded-sm w-full max-w-md p-6'>
						<div className='flex justify-between items-center mb-6'>
							<h3 className='font-display text-xl text-surface-dark-foreground'>
								{isNew ? 'Add Dish' : 'Edit Dish'}
							</h3>
							<button
								onClick={() => {
									setEditing(null)
									setIsNew(false)
								}}
								className='text-surface-dark-foreground/40 hover:text-surface-dark-foreground'
							>
								<X size={20} />
							</button>
						</div>
						<form
							onSubmit={e => {
								e.preventDefault()
								save(editing)
							}}
							className='space-y-4'
						>
							<input
								type='text'
								placeholder='Dish Name'
								value={editing.name}
								onChange={e => setEditing({ ...editing, name: e.target.value })}
								className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
								required
								disabled={loading}
							/>
							<textarea
								placeholder='Description'
								value={editing.description}
								onChange={e =>
									setEditing({ ...editing, description: e.target.value })
								}
								className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 resize-none'
								rows={3}
								disabled={loading}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<input
									type='number'
									placeholder='Price'
									value={editing.price || ''}
									onChange={e =>
										setEditing({
											...editing,
											price: parseFloat(e.target.value) || 0,
										})
									}
									className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
									required
									disabled={loading}
								/>
								<select
									value={editing.category}
									onChange={e =>
										setEditing({
											...editing,
											category: e.target.value as MenuItem['category'],
										})
									}
									className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
									disabled={loading}
								>
									<option value='starters'>Starters</option>
									<option value='mains'>Main Courses</option>
									<option value='desserts'>Desserts</option>
									<option value='drinks'>Drinks</option>
								</select>
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
							{editing.image.url && (
								<img
									src={editing.image.url}
									className='w-20 h-20 object-cover rounded-sm mt-2'
								/>
							)}
							<button
								type='submit'
								className='w-full gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium'
								disabled={loading}
							>
								{isNew ? 'Add Dish' : 'Save Changes'}
							</button>
						</form>
					</div>
				</div>
			)}

			<div className='bg-surface-dark-elevated border border-border/10 rounded-sm overflow-x-auto'>
				<table className='w-full text-sm'>
					<thead>
						<tr className='border-b border-border/10'>
							<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
								Dish
							</th>
							<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
								Category
							</th>
							<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
								Price
							</th>

							<th className='text-left p-4 text-surface-dark-foreground/50 font-medium'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr
								key={item._id}
								className='border-b border-border/5 hover:bg-surface-dark/30'
							>
								<td className='p-4'>
									<div className='flex items-center gap-3'>
										{item.image?.url && (
											<img
												src={item.image.url}
												alt={item.name}
												className='w-10 h-10 rounded-sm object-cover'
											/>
										)}
										<div>
											<p className='text-surface-dark-foreground'>
												{item.name}
											</p>
											<p className='text-surface-dark-foreground/40 text-xs truncate max-w-[200px]'>
												{item.description}
											</p>
										</div>
									</div>
								</td>
								<td className='p-4 text-surface-dark-foreground/70 capitalize'>
									{item.category}
								</td>
								<td className='p-4 text-gold'>${item.price}</td>
								<td className='p-4'>
									<div className='flex gap-2'>
										<button
											onClick={() => {
												setEditing(item)
												setIsNew(false)
											}}
											className='text-surface-dark-foreground/40 hover:text-gold transition-colors'
										>
											<Pencil size={16} />
										</button>
										<button
											onClick={() => remove(item._id)}
											className='text-destructive/60 hover:text-destructive transition-colors'
										>
											<Trash2 size={16} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</AdminLayout>
	)
}
