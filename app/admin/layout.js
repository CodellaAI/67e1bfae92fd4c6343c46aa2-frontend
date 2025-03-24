
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export const metadata = {
  title: 'Admin Dashboard | Vapor Vault',
  description: 'Manage your vape e-commerce store with our powerful admin dashboard.',
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="lg:pl-64">
        <AdminHeader />
        
        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
