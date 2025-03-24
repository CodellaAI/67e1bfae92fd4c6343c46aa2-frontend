
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, User, LogIn, Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function MobileMenu({ isOpen, onClose, links }) {
  const { user } = useAuth()
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          
          <motion.div
            className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-heading font-bold text-xl text-primary-600">Vapor Vault</div>
              <button
                onClick={onClose}
                className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input pl-10 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                <nav className="space-y-6 mt-6">
                  <div className="space-y-2">
                    {links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                        onClick={onClose}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <Link
                      href="/cart"
                      className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                      onClick={onClose}
                    >
                      <ShoppingCart className="mr-3" size={18} />
                      Cart
                    </Link>
                    
                    {user ? (
                      <Link
                        href="/account"
                        className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                        onClick={onClose}
                      >
                        <User className="mr-3" size={18} />
                        My Account
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                        onClick={onClose}
                      >
                        <LogIn className="mr-3" size={18} />
                        Login / Register
                      </Link>
                    )}
                  </div>
                </nav>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <Link
                href="/contact"
                className="btn btn-primary w-full"
                onClick={onClose}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
