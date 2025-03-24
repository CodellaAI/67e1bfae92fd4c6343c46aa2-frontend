
'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgeVerification() {
  const [showVerification, setShowVerification] = useState(false)
  
  useEffect(() => {
    const verified = localStorage.getItem('age-verified')
    if (!verified) {
      setShowVerification(true)
    }
  }, [])
  
  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true')
    setShowVerification(false)
  }
  
  if (!showVerification) return null
  
  return (
    <AnimatePresence>
      {showVerification && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-semibold">Age Verification</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-700">
                This website sells vape products and is only intended for adults aged 21 or older.
              </p>
              <p className="text-gray-700">
                By entering, you confirm that you are at least 21 years of age.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleVerify} 
                className="btn btn-primary flex-1"
              >
                I am 21 or older
              </button>
              <a 
                href="https://www.google.com" 
                className="btn btn-outline flex-1 text-center"
              >
                Exit
              </a>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By entering this site, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
