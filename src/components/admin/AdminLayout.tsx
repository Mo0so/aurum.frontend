import { getErrorMessage } from '@/hooks/error-handler'
import { axiosClient } from '@/lib/api'
import {
	ArrowLeft,
	CalendarDays,
	ImageIcon,
	LayoutDashboard,
	LogOut,
	Settings,
	Star,
	UtensilsCrossed,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
	{ label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
	{ label: 'Reservations', path: '/admin/reservations', icon: CalendarDays },
	{ label: 'Menu', path: '/admin/menu', icon: UtensilsCrossed },
	{ label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
	{ label: 'Reviews', path: '/admin/reviews', icon: Star },
	{ label: 'Settings', path: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const location = useLocation()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await axiosClient.post('/admin/logout')
			navigate('/admin/login', { replace: true })
		} catch (error) {
			getErrorMessage(error)
		}
	}

	return (
		<div className='min-h-screen bg-surface-dark flex'>
			<aside className='w-64 bg-surface-dark-elevated border-r border-border/10 flex flex-col fixed h-full'>
				<div className='p-6 border-b border-border/10'>
					<h1 className='font-display text-xl text-gold uppercase'>
						Restaurant
					</h1>
					<p className='text-surface-dark-foreground/40 text-xs mt-1'>
						Admin Panel
					</p>
				</div>
				<nav className='flex-1 p-4 space-y-1'>
					{navItems.map(item => {
						const active = location.pathname === item.path
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm transition-colors ${active ? 'bg-gold/10 text-gold' : 'text-surface-dark-foreground/60 hover:text-surface-dark-foreground hover:bg-surface-dark/50'}`}
							>
								<item.icon size={18} />
								{item.label}
							</Link>
						)
					})}
				</nav>
				<div className='p-4 border-t border-border/10 space-y-2'>
					<button
						onClick={handleLogout}
						className='flex items-center gap-2 text-surface-dark-foreground/40 text-sm hover:text-gold transition-colors w-full'
					>
						<LogOut size={16} /> Logout
					</button>
					<Link
						to='/'
						className='flex items-center gap-2 text-surface-dark-foreground/40 text-sm hover:text-gold transition-colors'
					>
						<ArrowLeft size={16} /> Back to Website
					</Link>
				</div>
			</aside>
			<main className='flex-1 ml-64 p-8'>{children}</main>
		</div>
	)
}
