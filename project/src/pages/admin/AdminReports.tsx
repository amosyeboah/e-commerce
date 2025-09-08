import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

export function AdminReports() {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');

  // Mock data for reports
  const overviewStats = {
    totalRevenue: { value: 45678, change: 23, trend: 'up' },
    totalOrders: { value: 856, change: 8, trend: 'up' },
    totalCustomers: { value: 2341, change: 15, trend: 'up' },
    averageOrderValue: { value: 53.35, change: -2, trend: 'down' }
  };

  const salesData = [
    { date: '2024-01-01', revenue: 1200, orders: 24 },
    { date: '2024-01-02', revenue: 1450, orders: 28 },
    { date: '2024-01-03', revenue: 1100, orders: 22 },
    { date: '2024-01-04', revenue: 1800, orders: 35 },
    { date: '2024-01-05', revenue: 1650, orders: 31 },
    { date: '2024-01-06', revenue: 2100, orders: 42 },
    { date: '2024-01-07', revenue: 1900, orders: 38 }
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 145, revenue: 43355 },
    { name: 'Smart Fitness Watch', sales: 98, revenue: 24402 },
    { name: 'Designer Leather Jacket', sales: 76, revenue: 14364 },
    { name: 'Professional Camera Lens', sales: 23, revenue: 20677 },
    { name: 'Organic Cotton T-Shirt', sales: 234, revenue: 6786 }
  ];

  const topCategories = [
    { name: 'Electronics', sales: 45, revenue: 89234 },
    { name: 'Fashion', sales: 32, revenue: 45678 },
    { name: 'Home', sales: 18, revenue: 23456 },
    { name: 'Sports', sales: 5, revenue: 12345 }
  ];

  const customerStats = {
    newCustomers: 156,
    returningCustomers: 89,
    customerRetentionRate: 67.5,
    averageLifetimeValue: 245.67
  };

  const inventoryStats = [
    { product: 'Premium Wireless Headphones', stock: 5, status: 'low' },
    { product: 'Smart Fitness Watch', stock: 3, status: 'critical' },
    { product: 'Designer Leather Jacket', stock: 12, status: 'good' },
    { product: 'Professional Camera Lens', stock: 1, status: 'critical' },
    { product: 'Minimalist Desk Lamp', stock: 8, status: 'good' }
  ];

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'good': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ title, value, change, trend, icon: Icon, prefix = '', suffix = '' }: any) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Track your store performance and insights</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'sales', name: 'Sales', icon: DollarSign },
              { id: 'products', name: 'Products', icon: Package },
              { id: 'customers', name: 'Customers', icon: Users },
              { id: 'inventory', name: 'Inventory', icon: Package }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setReportType(tab.id)}
                  className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                    reportType === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Report */}
        {reportType === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={overviewStats.totalRevenue.value}
                change={overviewStats.totalRevenue.change}
                trend={overviewStats.totalRevenue.trend}
                icon={DollarSign}
                prefix="$"
              />
              <StatCard
                title="Total Orders"
                value={overviewStats.totalOrders.value}
                change={overviewStats.totalOrders.change}
                trend={overviewStats.totalOrders.trend}
                icon={ShoppingCart}
              />
              <StatCard
                title="Total Customers"
                value={overviewStats.totalCustomers.value}
                change={overviewStats.totalCustomers.change}
                trend={overviewStats.totalCustomers.trend}
                icon={Users}
              />
              <StatCard
                title="Avg Order Value"
                value={overviewStats.averageOrderValue.value}
                change={overviewStats.averageOrderValue.change}
                trend={overviewStats.averageOrderValue.trend}
                icon={TrendingUp}
                prefix="$"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Sales trend chart would be displayed here</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Category distribution chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sales Report */}
        {reportType === 'sales' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Order Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesData.map((day, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(day.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${day.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {day.orders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(day.revenue / day.orders).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Report */}
        {reportType === 'products' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.sales}% of total sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${category.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customers Report */}
        {reportType === 'customers' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-600">New Customers</h4>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customerStats.newCustomers}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-600">Returning Customers</h4>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customerStats.returningCustomers}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-600">Retention Rate</h4>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customerStats.customerRetentionRate}%</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-600">Avg Lifetime Value</h4>
                <p className="text-3xl font-bold text-gray-900 mt-2">${customerStats.averageLifetimeValue}</p>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Report */}
        {reportType === 'inventory' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Levels</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventoryStats.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.stock} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}