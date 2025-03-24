
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data - would be fetched from API in production
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Vaping Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    quote: 'Vapor Vault has the best selection of premium vape products I\'ve found. Their customer service is exceptional, and the shipping is always fast.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Regular Customer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    quote: 'I\'ve been ordering from Vapor Vault for over a year now. Their e-liquid flavors are unmatched, and they always have the latest devices in stock.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'First-time Buyer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    quote: 'As someone new to vaping, I was impressed by how helpful the team at Vapor Vault was. They guided me through my first purchase and recommended products perfect for beginners.',
    rating: 4
  }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <div ref={ref} className="py-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Don't just take our word for it. Hear from our satisfied customers about their experience with Vapor Vault.
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="min-w-full px-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-dark-700 rounded-xl p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-primary-500">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg text-gray-200 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentTestimonial ? 'w-8 bg-primary-500' : 'w-2 bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={prevTestimonial}
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-dark-600 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          onClick={nextTestimonial}
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 rounded-full bg-dark-600 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
