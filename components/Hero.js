
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      title: "Premium Vape Experience",
      subtitle: "Discover our collection of high-quality vape products",
      image: "/images/hero-1.jpg",
      imagePlaceholder: "https://images.unsplash.com/photo-1563844503542-a75fbc5e92ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      cta: "Shop Now",
      link: "/shop"
    },
    {
      id: 2,
      title: "New Flavors Arrived",
      subtitle: "Explore our latest collection of e-liquids",
      image: "/images/hero-2.jpg",
      imagePlaceholder: "https://images.unsplash.com/photo-1567926143485-dcb0c41f58e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      cta: "View Collection",
      link: "/shop/e-liquids"
    },
    {
      id: 3,
      title: "Premium Devices",
      subtitle: "Elevate your vaping experience with our premium devices",
      image: "/images/hero-3.jpg",
      imagePlaceholder: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      cta: "Explore Devices",
      link: "/shop/devices"
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    
    return () => clearInterval(interval)
  }, [slides.length])
  
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.imagePlaceholder}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-xl text-white space-y-6"
              >
                <span className="inline-block px-3 py-1 bg-primary-600 rounded-full text-xs font-medium uppercase tracking-wider mb-2">
                  Featured Collection
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-lg">
                  {slide.subtitle}
                </p>
                <div className="pt-4">
                  <Link href={slide.link} className="btn btn-primary">
                    {slide.cta}
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
