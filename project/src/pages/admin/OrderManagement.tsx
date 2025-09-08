import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

export function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const mockOrders = [
    {
      id: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      date: '2024-01-15',
      status: 'completed',
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 299 },
        { name: 'Smart Fitness Watch', quantity: 1, price: 249 }
      ],
      total: 548,
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card (**** 4242)'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      date: '2024-01-15',
      status: 'processing',
      items: [
        { name: 'Designer Leather Jacket', quantity: 1, price: 189 }
      ],
      total: 189,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com'
      },
      date: '2024-01-14',
      status: 'shipped',
      items: [
        { name: 'Professional Camera Lens', quantity: 1, price: 899 }
      ],
      total: 899,
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      paymentMethod: 'Credit Card (**** 1234)'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com'
      },
      date: '2024-01-14',
      status: 'pending',
      items: [
        { name: 'Organic Cotton T-Shirt', quantity: 3, price: 29 },
        { name: 'Minimalist Desk Lamp', quantity: 1, price: 79 }
      ],
      total: 166,
      shippingAddress: '321 Elm St, Miami, FL 33101',
      paymentMethod: 'Credit Card (**** 5678)'
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'David Brown',
        email: 'david.brown@example.com'
      },
      date: '2024-01-13',
      status: 'cancelled',
      items: [
        { name: 'Smart Fitness Watch', quantity: 2, price: 249 }
      ],
      total: 498,
      shippingAddress: '654 Maple Dr, Seattle, WA 98101',
      paymentMethod: 'Credit Card (**** 9012)'
    }
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesDate = !filterDate || order.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Completed' };
      case 'processing':
        return { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Processing' };
      case 'shipped':
        return { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100', text: 'Shipped' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Pending' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Cancelled' };
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100', text: 'Unknown' };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => {
                      const statusConfig = getStatusConfig(order.status);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <tr 
                          key={order.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedOrder?.id === order.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                            <div className="text-sm text-gray-500">{order.items.length} items</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                            <div className="text-sm text-gray-500">{order.customer.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <StatusIcon className={`h-4 w-4 mr-2 ${statusConfig.color}`} />
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                                {statusConfig.text}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{selectedOrder.id}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="text-gray-900">{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="text-gray-900 font-medium">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customer</h4>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-900">{selectedOrder.customer.name}</p>
                      <p className="text-gray-600">{selectedOrder.customer.email}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                    <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                    <p className="text-sm text-gray-600">{selectedOrder.paymentMethod}</p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}