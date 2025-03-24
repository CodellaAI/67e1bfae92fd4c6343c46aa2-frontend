
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import ProductsTable from '@/components/admin/ProductsTable'

export const metadata = {
  title: 'Products | Admin Dashboard',
  description: 'Manage your product inventory in the Vapor Vault admin dashboard.',
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Products</h1>
          <p className="text-gray-600">Manage your product inventory.</p>
        </div>
        
        <Link href="/admin/products/new" className="btn btn-primary">
          <PlusCircle size={16} className="mr-2" />
          Add Product
        </Link>
      </div>
      
      <ProductsTable />
    </div>
  )
}
