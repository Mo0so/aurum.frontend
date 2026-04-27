import { axiosClient } from '@/lib/api'
import { Restaurant } from '@/lib/store'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ContactSection() {
	const [settings, setSettings] = useState<Restaurant | null>(null)
	const [status, setStatus] = useState<{
		isOpen: boolean
		closesAt: string | null
	} | null>(null)

	useEffect(() => {
		const fetchSettings = async () => {
			const res = await axiosClient.get('/restaurant')
			setSettings(res.data.restaurant)
			setStatus(res.data.status)
			console.log(res)
		}

		fetchSettings()
	}, [])

	return (
		<section id='contact' className='section-padding bg-surface-dark'>
			<div className='max-w-6xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-12'
				>
					<p className='text-gold text-sm tracking-[0.3em] uppercase mb-3'>
						Get in Touch
					</p>
					<h2 className='font-display text-4xl md:text-5xl text-surface-dark-foreground'>
						Visit Us
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className='space-y-8'
					>
						<InfoItem
							icon={<MapPin size={20} />}
							label='Address'
							value={settings?.address}
						/>
						<InfoItem
							icon={<Phone size={20} />}
							label='Phone'
							value={settings?.phone}
						/>
						<InfoItem
							icon={<Mail size={20} />}
							label='Email'
							value={settings?.email}
						/>
						<InfoItem
							icon={<Clock size={20} />}
							label='Hours'
							value={
								status
									? status.isOpen
										? `Open now - Closes at ${status.closesAt}`
										: 'Closed now'
									: ''
							}
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className='rounded-sm overflow-hidden h-80 lg:h-auto'
					>
						<iframe
							title='Restaurant location'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2!2d-74.009!3d40.707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzI1LjIiTiA3NMKwMDAnMzIuNCJX!5e0!3m2!1sen!2sus!4v1'
							width='100%'
							height='100%'
							style={{
								border: 0,
								filter: 'invert(90%) hue-rotate(180deg) brightness(0.9)',
							}}
							allowFullScreen
							loading='lazy'
						/>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

function InfoItem({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode
	label: string
	value: string
}) {
	return (
		<div className='flex gap-4'>
			<div className='text-gold mt-1'>{icon}</div>
			<div>
				<p className='text-surface-dark-foreground/40 text-xs uppercase tracking-wider mb-1'>
					{label}
				</p>
				<p className='text-surface-dark-foreground/80 text-sm'>{value}</p>
			</div>
		</div>
	)
}
