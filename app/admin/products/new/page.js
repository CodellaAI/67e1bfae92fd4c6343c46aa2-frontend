
import ProductForm from '@/components/admin/ProductForm'

export const metadata = {
  title: 'Add New Product | Admin Dashboard',
  description: 'Add a new product to your Vapor Vault inventory.',
}

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Add New Product</h1>
        <p className="text-gray-600">Create a new product in your inventory.</p>
      </div>
      
      <ProductForm />
    </div>
  )
}
