import PageLoader from '@/components/PageLoader'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/admin/RequireAuth.tsx'

const Index = lazy(() => import('./pages/Index.tsx'))
const ReviewSubmit = lazy(() => import('./pages/ReviewSubmit.tsx'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.tsx'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.tsx'))
const AdminReservations = lazy(() => import('./pages/admin/AdminReservations.tsx'))
const AdminMenuPage = lazy(() => import('./pages/admin/AdminMenuPage.tsx'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery.tsx'))
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews.tsx'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />

			<BrowserRouter>
				<Suspense fallback={<PageLoader label='Loading page' />}>
					<Routes>
						<Route path='/' element={<Index />} />
						<Route path='/review/:token' element={<ReviewSubmit />} />
						<Route path='/admin/login' element={<AdminLogin />} />
						<Route
							path='/admin'
							element={
								<RequireAuth>
									<AdminDashboard />
								</RequireAuth>
							}
						/>
						<Route
							path='/admin/reservations'
							element={
								<RequireAuth>
									<AdminReservations />
								</RequireAuth>
							}
						/>
						<Route
							path='/admin/menu'
							element={
								<RequireAuth>
									<AdminMenuPage />
								</RequireAuth>
							}
						/>
						<Route
							path='/admin/gallery'
							element={
								<RequireAuth>
									<AdminGallery />
								</RequireAuth>
							}
						/>
						<Route
							path='/admin/reviews'
							element={
								<RequireAuth>
									<AdminReviews />
								</RequireAuth>
							}
						/>
						<Route
							path='/admin/settings'
							element={
								<RequireAuth>
									<AdminSettings />
								</RequireAuth>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
)

export default App
