
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { user } = useAuth()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-36">
            <div className="font-heading font-bold text-2xl text-primary-600">Vapor Vault</div>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                pathname === link.href ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link
            href="/cart"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartItems?.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          <Link
            href={user ? '/account' : '/login'}
            className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label={user ? 'Account' : 'Login'}
          >
            <User size={20} />
          </Link>
          
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} links={navLinks} />
    </header>
  )
}
