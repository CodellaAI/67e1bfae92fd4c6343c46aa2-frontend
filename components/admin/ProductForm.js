
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductForm({ product }) {
  const router = useRouter()
  const isEditing = !!product
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    stock: product?.stock || '',
    sku: product?.sku || '',
    status: product?.status || 'Active',
    images: product?.images || [],
    variants: product?.variants || [],
    featured: product?.featured || false,
    new: product?.new || false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  
  const categories = ['Devices', 'E-Liquids', 'Accessories', 'Starter Kits', 'Disposables']
  const statuses = ['Active', 'Out of Stock', 'Discontinued']
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length > 0) {
      // In a real app, you would upload these to a server/cloud storage
      // For this example, we'll just create local preview URLs
      const newPreviewImages = files.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name
      }))
      
      setPreviewImages(prev => [...prev, ...newPreviewImages])
      
      // In a real app, you would get back URLs from your upload service
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newPreviewImages.map(img => img.url)]
      }))
    }
  }
  
  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }
  
  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { name: '', options: [''], price: '', stock: '' }]
    }))
  }
  
  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }))
  }
  
  const updateVariant = (index, field, value) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value
      }
      return {
        ...prev,
        variants: updatedVariants
      }
    })
  }
  
  const addVariantOption = (variantIndex) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[variantIndex].options.push('')
      return {
        ...prev,
        variants: updatedVariants
      }
    })
  }
  
  const updateVariantOption = (variantIndex, optionIndex, value) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[variantIndex].options[optionIndex] = value
      return {
        ...prev,
        variants: updatedVariants
      }
    })
  }
  
  const removeVariantOption = (variantIndex, optionIndex) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter((_, i) => i !== optionIndex)
      return {
        ...prev,
        variants: updatedVariants
      }
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success(isEditing ? 'Product updated successfully!' : 'Product created successfully!')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Load preview images if editing
  useEffect(() => {
    if (product?.images) {
      setPreviewImages(product.images.map(url => ({ url, name: url.split('/').pop() })))
    }
  }, [product])
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium">Product Information</h2>
        <p className="text-sm text-gray-500">Basic information about your product.</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
              SKU <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="input"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="input"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Featured Product
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="new"
              name="new"
              checked={formData.new}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="new" className="ml-2 block text-sm text-gray-700">
              New Product
            </label>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-b">
        <h2 className="text-lg font-medium mb-4">Product Images</h2>
        
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="h-32 w-full rounded-lg overflow-hidden border">
                <Image
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
              <p className="text-xs text-gray-500 truncate mt-1">{image.name}</p>
            </div>
          ))}
          
          <div className="h-32 w-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
            </label>
          </div>
        </div>
        
        <p className="text-xs text-gray-500">
          Upload product images. You can upload multiple images at once. Recommended size: 800x800px.
        </p>
      </div>
      
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-medium">Product Variants</h2>
            <p className="text-sm text-gray-500">Add variants like size, color, or flavor.</p>
          </div>
          
          <button
            type="button"
            onClick={addVariant}
            className="btn btn-outline text-sm py-1"
          >
            <Plus size={16} className="mr-1" />
            Add Variant
          </button>
        </div>
        
        {formData.variants.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500">No variants added yet.</p>
            <button
              type="button"
              onClick={addVariant}
              className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Add your first variant
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {formData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium">Variant {variantIndex + 1}</div>
                  <button
                    type="button"
                    onClick={() => removeVariant(variantIndex)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => updateVariant(variantIndex, 'name', e.target.value)}
                      placeholder="e.g. Size, Color, Flavor"
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Adjustment ($)
                    </label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(variantIndex, 'price', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(variantIndex, 'stock', e.target.value)}
                      placeholder="0"
                      min="0"
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Options
                  </label>
                  
                  <div className="space-y-2">
                    {variant.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateVariantOption(variantIndex, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="input flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeVariantOption(variantIndex, optionIndex)}
                          className="p-2 text-red-600 hover:text-red-700"
                          disabled={variant.options.length === 1}
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => addVariantOption(variantIndex)}
                    className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  >
                    <Plus size={14} className="mr-1" />
                    Add Option
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-outline"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span>{isEditing ? 'Update Product' : 'Create Product'}</span>
          )}
        </button>
      </div>
    </form>
  )
}
