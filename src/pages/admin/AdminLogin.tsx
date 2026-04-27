import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import { Lock } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AdminLogin() {
	const navigate = useNavigate()
	const location = useLocation()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const from = location.state?.from?.pathname || '/admin'

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!username || !password) {
			setError('Username or Password incorrect')
			return
		}

		try {
			setLoading(true)

			await axiosClient.post('/admin/login', {
				username,
				password,
			})

			navigate(from, { replace: true })
		} catch (err) {
			setError(getErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className='min-h-screen bg-surface-dark flex items-center justify-center p-6'>
			<div className='w-full max-w-md bg-surface-dark-elevated border border-border/10 rounded-sm p-8'>
				<div className='flex flex-col items-center mb-8'>
					<div className='w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4'>
						<Lock className='text-gold' size={20} />
					</div>
					<h1 className='font-display text-3xl text-gold'>AURUM</h1>
					<p className='text-surface-dark-foreground/50 text-sm mt-1'>
						Admin Sign In
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-5'>
					<div>
						<label className='text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block'>
							Username
						</label>
						<input
							type='text'
							value={username}
							onChange={e => {
								setUsername(e.target.value)
								setError('')
							}}
							autoFocus
							className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
						/>
						<label className='text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block mt-3'>
							Password
						</label>
						<input
							type='password'
							value={password}
							onChange={e => {
								setPassword(e.target.value)
								setError('')
							}}
							className='w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50'
						/>
						{error && <p className='text-destructive text-xs mt-2'>{error}</p>}
					</div>

					<button
						type='submit'
						disabled={loading}
						className='w-full gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium disabled:opacity-60'
					>
						{loading ? 'Signing In...' : 'Sign In'}
					</button>
				</form>
			</div>
		</div>
	)
}
