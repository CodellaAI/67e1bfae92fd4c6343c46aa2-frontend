
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

// Mock data - would be fetched from API in production
const bestSellers = [
  {
    id: '5',
    name: 'Arctic Mint E-Liquid',
    description: 'Refreshing mint flavor with a cool finish',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'E-Liquids',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: '6',
    name: 'VaporTech Pro',
    description: 'Advanced vaping device with customizable settings',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1560794342-3e996e41bf14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Devices',
    rating: 4.8,
    reviews: 98,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: '7',
    name: 'Vanilla Dream E-Liquid',
    description: 'Smooth vanilla flavor with creamy undertones',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1514361726087-38371321b5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'E-Liquids',
    rating: 4.7,
    reviews: 64,
    inStock: true,
    isNew: false,
    isFeatured: false
  }
]

export default function BestSellers() {
  const { addToCart } = useCart()
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="h-64 bg-gray-200 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bestSellers.map((product, index) => (
          <motion.div
            key={product.id}
            className="card overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-64 overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
              
              {product.isNew && (
                <span className="absolute top-2 left-2 badge badge-primary">
                  New
                </span>
              )}
              
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button 
                  className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} />
                </button>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => addToCart(product)}
                  className="btn btn-primary w-full py-2 text-sm"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
              </div>
              
              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium text-lg hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
                <Link 
                  href={`/products/${product.id}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                >
                  Details
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/shop" className="btn btn-outline">
          View All Best Sellers
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  )
}
