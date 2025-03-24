
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!')
      setEmail('')
      setIsSubmitting(false)
    }, 1500)
  }
  
  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center py-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">
          <Mail size={24} />
        </div>
      </div>
      
      <h2 className="text-3xl font-heading font-semibold mb-4">
        Stay Updated
      </h2>
      
      <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
        Subscribe to our newsletter to receive updates on new products, special offers, and vaping tips.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input flex-1"
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary whitespace-nowrap"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            ) : (
              <span className="flex items-center">
                <Send size={16} className="mr-2" />
                Subscribe
              </span>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </p>
      </form>
    </motion.div>
  )
}
