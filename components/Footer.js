
import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Clock 
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-800 text-gray-300">
      <div className="border-b border-dark-700">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center md:justify-start space-x-6">
              <div className="flex flex-col items-center">
                <CreditCard className="h-6 w-6 text-primary-500 mb-2" />
                <span className="text-sm text-center">Secure Payment</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-6">
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6 text-primary-500 mb-2" />
                <span className="text-sm text-center">Fast Shipping</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-6">
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 text-primary-500 mb-2" />
                <span className="text-sm text-center">Quality Guarantee</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-6">
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-primary-500 mb-2" />
                <span className="text-sm text-center">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Link href="/" className="font-heading font-bold text-2xl text-white">
                Vapor Vault
              </Link>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Premium vape products for the discerning enthusiast. Quality and satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-8 w-8 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/devices" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Vape Devices
                </Link>
              </li>
              <li>
                <Link href="/categories/e-liquids" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  E-Liquids
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/categories/starter-kits" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Starter Kits
                </Link>
              </li>
              <li>
                <Link href="/categories/disposables" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                  Disposables
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  123 Vape Street, Cloudville, CV 12345
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  support@vaporvault.com
                </span>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Mon-Fri: 9AM - 6PM<br />
                  Sat-Sun: 10AM - 4PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-dark-700 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Vapor Vault. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4">
              <Link href="/terms" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Shipping Policy
              </Link>
              <Link href="/refund" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <p className="text-xs text-gray-600 text-center max-w-2xl">
              WARNING: This product contains nicotine. Nicotine is an addictive chemical. Only for adults 21 years or older.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
