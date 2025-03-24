
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bell, Search, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, logout } = useAuth()
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
    if (showNotifications) setShowNotifications(false)
  }
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showUserMenu) setShowUserMenu(false)
  }
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="flex justify-between items-center px-4 py-3 lg:px-8">
        <div className="lg:hidden w-8">
          {/* Placeholder for mobile menu button in AdminSidebar */}
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-sm text-primary-600 hover:text-primary-700">
            View Store
          </Link>
          
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-100 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border">
                <div className="px-4 py-2 border-b">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="text-sm font-medium">New order received</p>
                    <p className="text-xs text-gray-500">Order #12345 - 2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="text-sm font-medium">Low stock alert</p>
                    <p className="text-xs text-gray-500">CloudMaster Pro - 5 units left</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-gray-500">$129.99 from customer #789</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t text-center">
                  <Link href="/admin/notifications" className="text-xs text-primary-600 hover:text-primary-700">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User size={20} className="text-gray-600" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                {user?.name || 'Admin User'}
              </span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </Link>
                <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
