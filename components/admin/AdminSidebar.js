
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart2, 
  Layers, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})
  const pathname = usePathname()
  const { logout } = useAuth()
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const toggleSubmenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }
  
  const isLinkActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/admin',
    },
    {
      name: 'Products',
      icon: <Package size={20} />,
      href: '/admin/products',
      submenu: [
        { name: 'All Products', href: '/admin/products' },
        { name: 'Add New', href: '/admin/products/new' },
        { name: 'Categories', href: '/admin/products/categories' },
      ]
    },
    {
      name: 'Orders',
      icon: <ShoppingBag size={20} />,
      href: '/admin/orders',
    },
    {
      name: 'Customers',
      icon: <Users size={20} />,
      href: '/admin/customers',
    },
    {
      name: 'Analytics',
      icon: <BarChart2 size={20} />,
      href: '/admin/analytics',
    },
    {
      name: 'Payments',
      icon: <CreditCard size={20} />,
      href: '/admin/payments',
    },
    {
      name: 'Inventory',
      icon: <Layers size={20} />,
      href: '/admin/inventory',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      href: '/admin/settings',
    },
  ]
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between py-4">
      <div>
        <div className="px-4 mb-6">
          <Link href="/admin" className="flex items-center">
            <span className="text-xl font-heading font-bold text-white">Vapor Vault</span>
          </Link>
        </div>
        
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium ${
                      isLinkActive(item.href)
                        ? 'bg-primary-700 text-white'
                        : 'text-gray-300 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                    {expandedMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedMenus[item.name] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-10 pr-3 py-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                                pathname === subItem.href
                                  ? 'bg-primary-800 text-white'
                                  : 'text-gray-300 hover:bg-primary-700 hover:text-white'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-primary-700 text-white'
                      : 'text-gray-300 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-3">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-primary-700 hover:text-white"
        >
          <LogOut size={20} className="mr-3" />
          Log Out
        </button>
      </div>
    </div>
  )
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-4 text-gray-700 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
            
            <motion.div
              className="absolute left-0 top-0 h-full w-64 bg-primary-800 shadow-lg"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 p-1">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-primary-700"
                  aria-label="Close sidebar"
                >
                  <X size={20} />
                </button>
              </div>
              
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-primary-800">
        <SidebarContent />
      </div>
    </>
  )
}
