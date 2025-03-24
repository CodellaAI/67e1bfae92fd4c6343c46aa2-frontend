
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

export default function Filters() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
    rating: true
  })
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  const categories = [
    { id: 'devices', name: 'Vape Devices', count: 42 },
    { id: 'e-liquids', name: 'E-Liquids', count: 78 },
    { id: 'accessories', name: 'Accessories', count: 35 },
    { id: 'starter-kits', name: 'Starter Kits', count: 23 },
    { id: 'disposables', name: 'Disposables', count: 17 }
  ]
  
  const brands = [
    { id: 'vaportech', name: 'VaporTech', count: 28 },
    { id: 'cloudmaster', name: 'CloudMaster', count: 22 },
    { id: 'eliquidlab', name: 'E-Liquid Lab', count: 35 },
    { id: 'vapepro', name: 'VapePro', count: 19 },
    { id: 'misty', name: 'Misty Vapes', count: 15 }
  ]
  
  const ratings = [
    { id: '5', name: '5 Stars', value: 5 },
    { id: '4', name: '4 Stars & Up', value: 4 },
    { id: '3', name: '3 Stars & Up', value: 3 },
    { id: '2', name: '2 Stars & Up', value: 2 },
    { id: '1', name: '1 Star & Up', value: 1 }
  ]
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }
  
  const toggleBrand = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }
  
  const toggleRating = (ratingId) => {
    setSelectedRatings(prev => 
      prev.includes(ratingId)
        ? prev.filter(id => id !== ratingId)
        : [...prev, ratingId]
    )
  }
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = parseInt(e.target.value)
    setPriceRange(newRange)
  }
  
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange([0, 200])
  }
  
  const FiltersContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Filters</h2>
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedRatings.length > 0) && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left font-medium mb-2"
        >
          <span>Categories</span>
          {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700 flex-1">
                  {category.name}
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium mb-2"
        >
          <span>Price Range</span>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.price && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">${priceRange[0]}</span>
              <span className="text-sm text-gray-700">${priceRange[1]}</span>
            </div>
            
            <div className="relative h-1 bg-gray-200 rounded-full mb-4">
              <div 
                className="absolute h-1 bg-primary-500 rounded-full"
                style={{ 
                  left: `${(priceRange[0] / 200) * 100}%`, 
                  right: `${100 - (priceRange[1] / 200) * 100}%` 
                }}
              ></div>
              <div 
                className="absolute h-4 w-4 bg-white border border-primary-500 rounded-full -mt-1.5 -ml-2"
                style={{ left: `${(priceRange[0] / 200) * 100}%` }}
              ></div>
              <div 
                className="absolute h-4 w-4 bg-white border border-primary-500 rounded-full -mt-1.5 -ml-2"
                style={{ left: `${(priceRange[1] / 200) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex space-x-4">
              <div>
                <label htmlFor="min-price" className="block text-xs text-gray-700 mb-1">Min</label>
                <input
                  type="number"
                  id="min-price"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="input py-1 px-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="max-price" className="block text-xs text-gray-700 mb-1">Max</label>
                <input
                  type="number"
                  id="max-price"
                  min={priceRange[0]}
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="input py-1 px-2 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Brands */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-left font-medium mb-2"
        >
          <span>Brands</span>
          {expandedSections.brands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.brands && (
          <div className="space-y-2">
            {brands.map(brand => (
              <div key={brand.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => toggleBrand(brand.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm text-gray-700 flex-1">
                  {brand.name}
                </label>
                <span className="text-xs text-gray-500">({brand.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Rating */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-medium mb-2"
        >
          <span>Rating</span>
          {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map(rating => (
              <div key={rating.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating.id}`}
                  checked={selectedRatings.includes(rating.id)}
                  onChange={() => toggleRating(rating.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={`rating-${rating.id}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-4 w-4 ${i < rating.value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="ml-1">{rating.name}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t">
        <button className="btn btn-primary w-full">
          Apply Filters
        </button>
      </div>
    </>
  )
  
  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block sticky top-32">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <FiltersContent />
        </div>
      </div>
      
      {/* Mobile Filters Button */}
      <div className="lg:hidden mb-6">
        <button 
          onClick={() => setShowMobileFilters(true)}
          className="btn btn-outline w-full"
        >
          Show Filters
        </button>
      </div>
      
      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)}></div>
          
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
              <FiltersContent />
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
