
import { Suspense } from 'react'
import AgeVerification from '@/components/AgeVerification'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Categories from '@/components/Categories'
import BestSellers from '@/components/BestSellers'
import Newsletter from '@/components/Newsletter'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <AgeVerification />
      <Header />
      <Hero />
      
      <section className="section container">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-12">
          Featured Products
        </h2>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading featured products...</div>}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="section bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-12">
            Shop By Category
          </h2>
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading categories...</div>}>
            <Categories />
          </Suspense>
        </div>
      </section>

      <section className="section container">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-12">
          Best Sellers
        </h2>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading best sellers...</div>}>
          <BestSellers />
        </Suspense>
      </section>

      <section className="section bg-dark-800 text-white">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      <section className="section bg-gradient-to-r from-secondary-100 to-primary-100">
        <div className="container">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </main>
  )
}
