
'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react'

export default function SalesChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState('week')
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">Sales Overview</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-500 mr-2">Total Sales: $12,589.49</span>
            <div className="flex items-center text-green-600 text-xs font-medium">
              <ArrowUpRight size={14} />
              <span>23.5%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Calendar size={16} className="text-gray-500" />
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input py-1 text-sm"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <div className="h-64 relative">
        {/* This would be replaced with an actual chart component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 150" className="w-full h-full">
            {/* X-axis */}
            <line x1="50" y1="120" x2="380" y2="120" stroke="#e5e7eb" strokeWidth="1" />
            
            {/* Y-axis */}
            <line x1="50" y1="20" x2="50" y2="120" stroke="#e5e7eb" strokeWidth="1" />
            
            {/* Chart bars */}
            <rect x="70" y="60" width="20" height="60" fill="#0284c7" rx="2" />
            <rect x="100" y="40" width="20" height="80" fill="#0284c7" rx="2" />
            <rect x="130" y="70" width="20" height="50" fill="#0284c7" rx="2" />
            <rect x="160" y="30" width="20" height="90" fill="#0284c7" rx="2" />
            <rect x="190" y="50" width="20" height="70" fill="#0284c7" rx="2" />
            <rect x="220" y="20" width="20" height="100" fill="#0284c7" rx="2" />
            <rect x="250" y="45" width="20" height="75" fill="#0284c7" rx="2" />
            <rect x="280" y="55" width="20" height="65" fill="#0284c7" rx="2" />
            <rect x="310" y="25" width="20" height="95" fill="#0284c7" rx="2" />
            <rect x="340" y="65" width="20" height="55" fill="#0284c7" rx="2" />
            
            {/* X-axis labels */}
            <text x="80" y="135" fontSize="10" textAnchor="middle" fill="#6b7280">Mon</text>
            <text x="140" y="135" fontSize="10" textAnchor="middle" fill="#6b7280">Tue</text>
            <text x="200" y="135" fontSize="10" textAnchor="middle" fill="#6b7280">Wed</text>
            <text x="260" y="135" fontSize="10" textAnchor="middle" fill="#6b7280">Thu</text>
            <text x="320" y="135" fontSize="10" textAnchor="middle" fill="#6b7280">Fri</text>
            
            {/* Y-axis labels */}
            <text x="40" y="120" fontSize="10" textAnchor="end" fill="#6b7280">0</text>
            <text x="40" y="90" fontSize="10" textAnchor="end" fill="#6b7280">500</text>
            <text x="40" y="60" fontSize="10" textAnchor="end" fill="#6b7280">1000</text>
            <text x="40" y="30" fontSize="10" textAnchor="end" fill="#6b7280">1500</text>
          </svg>
        </div>
      </div>
    </div>
  )
}
