
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/shop/ProductGrid'
import Filters from '@/components/shop/Filters'

export const metadata = {
  title: 'Shop | Vapor Vault',
  description: 'Browse our collection of premium vape products, e-liquids, and accessories.',
}

export default function ShopPage() {
  return (
    <main>
      <Header />
      
      <div className="pt-28 pb-12 md:pt-32 md:pb-20">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
              Shop Our Products
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our collection of premium vape products, e-liquids, and accessories. 
              Find the perfect vaping experience for your needs.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <Filters />
            </div>
            
            <div className="lg:w-3/4">
              <ProductGrid />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
