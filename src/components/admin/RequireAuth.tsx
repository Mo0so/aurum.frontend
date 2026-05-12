import PageLoader from '@/components/PageLoader'
import { axiosClient } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({
	children,
}: {
	children: React.ReactNode
}) {
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	const [isAuthed, setIsAuthed] = useState(false)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axiosClient.get('/admin/me')
				setIsAuthed(true)
			} catch {
				localStorage.removeItem('aurum_admin_auth')
				setIsAuthed(false)
			} finally {
				setLoading(false)
			}
		}

		checkAuth()
	}, [])

	if (loading) return <PageLoader label='Checking authentication' />

	if (!isAuthed) {
		return <Navigate to='/admin/login' state={{ from: location }} replace />
	}

	return <>{children}</>
}
