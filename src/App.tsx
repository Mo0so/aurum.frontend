import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/admin/RequireAuth.tsx'
import AdminDashboard from './pages/admin/AdminDashboard.tsx'
import AdminGallery from './pages/admin/AdminGallery.tsx'
import AdminLogin from './pages/admin/AdminLogin.tsx'
import AdminMenuPage from './pages/admin/AdminMenuPage.tsx'
import AdminReservations from './pages/admin/AdminReservations.tsx'
import AdminReviews from './pages/admin/AdminReviews.tsx'
import AdminSettings from './pages/admin/AdminSettings.tsx'
import Index from './pages/Index.tsx'
import NotFound from './pages/NotFound.tsx'
import ReviewSubmit from './pages/ReviewSubmit.tsx'

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />

			<BrowserRouter>
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
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
)

export default App
