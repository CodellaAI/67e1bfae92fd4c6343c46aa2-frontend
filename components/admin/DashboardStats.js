
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react'

export default function DashboardStats() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState(null)
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats({
        revenue: {
          value: 12589.49,
          change: 23.5,
          increasing: true
        },
        orders: {
          value: 156,
          change: 12.3,
          increasing: true
        },
        customers: {
          value: 832,
          change: 8.7,
          increasing: true
        },
        conversion: {
          value: 5.24,
          change: 1.2,
          increasing: false
        }
      })
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
            <div className="h-10 w-10 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-7 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
          <DollarSign size={20} />
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
        <div className="flex items-end">
          <span className="text-2xl font-semibold">${stats.revenue.value.toLocaleString()}</span>
          <div className={`flex items-center ml-2 ${stats.revenue.increasing ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={16} className={!stats.revenue.increasing && 'rotate-180'} />
            <span className="text-xs font-medium ml-1">{stats.revenue.change}%</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
          <ShoppingBag size={20} />
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
        <div className="flex items-end">
          <span className="text-2xl font-semibold">{stats.orders.value}</span>
          <div className={`flex items-center ml-2 ${stats.orders.increasing ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={16} className={!stats.orders.increasing && 'rotate-180'} />
            <span className="text-xs font-medium ml-1">{stats.orders.change}%</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
          <Users size={20} />
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Customers</h3>
        <div className="flex items-end">
          <span className="text-2xl font-semibold">{stats.customers.value}</span>
          <div className={`flex items-center ml-2 ${stats.customers.increasing ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={16} className={!stats.customers.increasing && 'rotate-180'} />
            <span className="text-xs font-medium ml-1">{stats.customers.change}%</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
          <TrendingUp size={20} />
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Conversion Rate</h3>
        <div className="flex items-end">
          <span className="text-2xl font-semibold">{stats.conversion.value}%</span>
          <div className={`flex items-center ml-2 ${stats.conversion.increasing ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={16} className={!stats.conversion.increasing && 'rotate-180'} />
            <span className="text-xs font-medium ml-1">{stats.conversion.change}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
