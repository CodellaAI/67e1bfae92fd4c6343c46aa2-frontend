
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Filter, Grid3X3, List } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

// Mock data - would be fetched from API in production
const products = [
  {
    id: '1',
    name: 'Cloud Master Pro',
    description: 'Premium vaping device with temperature control',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1533679651607-27fae131f7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Devices',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Berry Blast E-Liquid',
    description: 'Sweet mixed berry flavor with smooth throat hit',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559813114-cbb35f29d971?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'E-Liquids',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Pocket Vape Mini',
    description: 'Compact and portable vaping device for on-the-go',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Devices',
    rating: 4.6,
    reviews: 56,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Tropical Paradise E-Liquid',
    description: 'Refreshing blend of tropical fruits',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'E-Liquids',
    rating: 4.7,
    reviews: 42,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
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
  }
]

export default function ProductGrid() {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortOption, setSortOption] = useState('featured')
  const [displayProducts, setDisplayProducts] = useState([])
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    let sorted = [...products]
    
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted = sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew))
        break
      case 'featured':
      default:
        sorted = sorted.filter(p => p.isFeatured).concat(sorted.filter(p => !p.isFeatured))
        break
    }
    
    setDisplayProducts(sorted)
  }, [sortOption])
  
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
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
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Filter size={18} className="text-gray-500 mr-2" />
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="input py-1"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
            }`}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="card overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
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
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-1/3 md:min-h-[200px]">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  
                  {product.isNew && (
                    <span className="absolute top-2 left-2 badge badge-primary">
                      New
                    </span>
                  )}
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-xl hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mt-2 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xl">${product.price.toFixed(2)}</span>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => addToCart(product)}
                        className="btn btn-primary"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </button>
                      
                      <button 
                        className="btn btn-outline"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-10 flex justify-center">
        <div className="flex space-x-1">
          <button className="h-10 w-10 rounded bg-primary-600 text-white flex items-center justify-center">
            1
          </button>
          <button className="h-10 w-10 rounded bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200">
            2
          </button>
          <button className="h-10 w-10 rounded bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200">
            3
          </button>
          <span className="h-10 flex items-center justify-center px-2">...</span>
          <button className="h-10 w-10 rounded bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200">
            10
          </button>
        </div>
      </div>
    </div>
  )
}
