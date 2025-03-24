
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Trash2, Eye, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'

// Mock data - would be fetched from API in production
const products = [
  {
    id: '1',
    name: 'Cloud Master Pro',
    description: 'Premium vaping device with temperature control',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1533679651607-27fae131f7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'Devices',
    stock: 42,
    sku: 'DEV-CM-001',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Berry Blast E-Liquid',
    description: 'Sweet mixed berry flavor with smooth throat hit',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559813114-cbb35f29d971?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'E-Liquids',
    stock: 78,
    sku: 'LIQ-BB-001',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Pocket Vape Mini',
    description: 'Compact and portable vaping device for on-the-go',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'Devices',
    stock: 56,
    sku: 'DEV-PV-001',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Tropical Paradise E-Liquid',
    description: 'Refreshing blend of tropical fruits',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'E-Liquids',
    stock: 65,
    sku: 'LIQ-TP-001',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Arctic Mint E-Liquid',
    description: 'Refreshing mint flavor with a cool finish',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'E-Liquids',
    stock: 48,
    sku: 'LIQ-AM-001',
    status: 'Active'
  },
  {
    id: '6',
    name: 'VaporTech Pro',
    description: 'Advanced vaping device with customizable settings',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1560794342-3e996e41bf14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'Devices',
    stock: 32,
    sku: 'DEV-VT-001',
    status: 'Active'
  },
  {
    id: '7',
    name: 'Vanilla Dream E-Liquid',
    description: 'Smooth vanilla flavor with creamy undertones',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1514361726087-38371321b5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'E-Liquids',
    stock: 0,
    sku: 'LIQ-VD-001',
    status: 'Out of Stock'
  },
  {
    id: '8',
    name: 'Starter Kit Deluxe',
    description: 'Complete starter kit for beginners',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'Starter Kits',
    stock: 25,
    sku: 'KIT-DLX-001',
    status: 'Active'
  },
  {
    id: '9',
    name: 'Coil Replacement Pack',
    description: 'Pack of 5 replacement coils',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'Accessories',
    stock: 100,
    sku: 'ACC-CRP-001',
    status: 'Active'
  },
  {
    id: '10',
    name: 'Vape Carrying Case',
    description: 'Protective carrying case for vape devices',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1533679651607-27fae131f7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    category: 'Accessories',
    stock: 35,
    sku: 'ACC-VCC-001',
    status: 'Active'
  }
]

export default function ProductsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const productsPerPage = 5
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    let results = [...products]
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(product => product.category === selectedCategory)
    }
    
    // Apply status filter
    if (selectedStatus !== 'All') {
      results = results.filter(product => product.status === selectedStatus)
    }
    
    setFilteredProducts(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory, selectedStatus])
  
  const handleDeleteProduct = (id) => {
    // In a real app, this would call an API to delete the product
    toast.success(`Product ${id} deleted successfully`)
  }
  
  const categories = ['All', 'Devices', 'E-Liquids', 'Accessories', 'Starter Kits']
  const statuses = ['All', 'Active', 'Out of Stock', 'Discontinued']
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800'
      case 'Discontinued':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 animate-pulse">
          <div className="flex justify-between mb-6">
            <div className="h-10 bg-gray-200 rounded w-64"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input pl-9 appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input pl-9 appearance-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500 max-w-xs truncate">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-1 rounded-full hover:bg-gray-100" 
                          aria-label="View product"
                        >
                          <Eye size={16} className="text-gray-500" />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1 rounded-full hover:bg-gray-100" 
                          aria-label="Edit product"
                        >
                          <Edit size={16} className="text-gray-500" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 rounded-full hover:bg-gray-100" 
                          aria-label="Delete product"
                        >
                          <Trash2 size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100" aria-label="More options">
                          <MoreHorizontal size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No products found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            
            <div className="flex space-x-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber = i + 1
                
                // If there are more than 5 pages and we're not at the beginning
                if (totalPages > 5 && currentPage > 3) {
                  pageNumber = currentPage - 3 + i
                  
                  // Don't go beyond the total number of pages
                  if (pageNumber > totalPages) {
                    return null
                  }
                }
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`h-8 w-8 rounded flex items-center justify-center ${
                      currentPage === pageNumber ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="h-8 flex items-center justify-center px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`h-8 w-8 rounded flex items-center justify-center hover:bg-gray-100`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
