
import DashboardStats from '@/components/admin/DashboardStats'
import RecentOrders from '@/components/admin/RecentOrders'
import SalesChart from '@/components/admin/SalesChart'
import TopProducts from '@/components/admin/TopProducts'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Vapor Vault admin dashboard.</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
      
      <RecentOrders />
    </div>
  )
}
