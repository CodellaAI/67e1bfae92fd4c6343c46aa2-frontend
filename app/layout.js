
import { Inter, Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata = {
  title: 'Vapor Vault | Premium Vape Products',
  description: 'Shop the finest selection of premium vape products at Vapor Vault. Discover the latest devices, e-liquids, and accessories.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
