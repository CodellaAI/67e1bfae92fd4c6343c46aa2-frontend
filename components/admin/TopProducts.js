
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, TrendingDown } from 'lucide-react'

// Mock data - would be fetched from API in production
const products = [
  {
    id: '1',
    name: 'Cloud Master Pro',
    image: 'https://images.unsplash.com/photo-1533679651607-27fae131f7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    sold: 42,
    revenue: 3779.58,
    trend: 15.2,
    increasing: true
  },
  {
    id: '6',
    name: 'VaporTech Pro',
    image: 'https://images.unsplash.com/photo-1560794342-3e996e41bf14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    sold: 28,
    revenue: 3359.72,
    trend: 8.7,
    increasing: true
  },
  {
    id: '2',
    name: 'Berry Blast E-Liquid',
    image: 'https://images.unsplash.com/photo-1559813114-cbb35f29d971?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    sold: 76,
    revenue: 1899.24,
    trend: 4.3,
    increasing: false
  },
  {
    id: '5',
    name: 'Arctic Mint E-Liquid',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    sold: 65,
    revenue: 1429.35,
    trend: 12.1,
    increasing: true
  },
  {
    id: '3',
    name: 'Pocket Vape Mini',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    sold: 31,
    revenue: 1239.69,
    trend: 5.8,
    increasing: true
  }
]

export default function TopProducts() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm h-full">
        <div className="p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-200 mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Top Products</h3>
          <Link 
            href="/admin/products" 
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-start">
              <div className="h-12 w-12 rounded overflow-hidden mr-3 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{product.name}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">{product.sold} sold</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-500">${product.revenue.toFixed(2)}</span>
                </div>
              </div>
              <div className={`flex items-center ${product.increasing ? 'text-green-600' : 'text-red-600'} text-xs font-medium`}>
                {product.increasing ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="ml-1">{product.trend}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
