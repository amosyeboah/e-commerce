import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye,
  AlertCircle,
  Calendar
} from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Orders',
      value: '856',
      change: '+8%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Customers',
      value: '2,341',
      change: '+15%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+23%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$299.00', status: 'completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '$189.50', status: 'processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '$456.75', status: 'shipped', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: '$123.25', status: 'pending', date: '2024-01-14' },
    { id: '#ORD-005', customer: 'David Brown', amount: '$789.00', status: 'completed', date: '2024-01-13' }
  ];

  const lowStockProducts = [
    { name: 'Premium Wireless Headphones', stock: 5, sku: 'PWH-001' },
    { name: 'Smart Fitness Watch', stock: 3, sku: 'SFW-002' },
    { name: 'Designer Leather Jacket', stock: 2, sku: 'DLJ-003' },
    { name: 'Professional Camera Lens', stock: 1, sku: 'PCL-005' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link 
                to="/admin/orders" 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                View All
                <Eye className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                Low Stock Alert
              </h2>
              <Link 
                to="/admin/products" 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                Manage
                <Eye className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {product.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/products/new"
              className="flex items-center justify-center p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <Package className="h-8 w-8 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-blue-700 font-semibold">Add New Product</span>
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center justify-center p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <ShoppingCart className="h-8 w-8 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-green-700 font-semibold">View Orders</span>
            </Link>
            <Link
              to="/admin/customers"
              className="flex items-center justify-center p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <Users className="h-8 w-8 text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-purple-700 font-semibold">Manage Customers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}