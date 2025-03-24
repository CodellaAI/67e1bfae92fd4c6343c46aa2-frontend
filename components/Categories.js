
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

// Mock data - would be fetched from API in production
const categories = [
  {
    id: '1',
    name: 'Vape Devices',
    description: 'High-quality vaping devices for every preference',
    image: 'https://images.unsplash.com/photo-1533679651607-27fae131f7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'devices',
    productCount: 42
  },
  {
    id: '2',
    name: 'E-Liquids',
    description: 'Premium flavors for an exceptional vaping experience',
    image: 'https://images.unsplash.com/photo-1559813114-cbb35f29d971?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'e-liquids',
    productCount: 78
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Essential accessories to enhance your vaping setup',
    image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'accessories',
    productCount: 35
  },
  {
    id: '4',
    name: 'Starter Kits',
    description: 'Complete kits for beginners to start vaping right away',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'starter-kits',
    productCount: 23
  }
]

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="card overflow-hidden group h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            <div className="p-4 relative">
              <h3 className="font-medium text-xl">{category.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.productCount} products</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                >
                  Shop Now
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
