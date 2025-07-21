import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();

  // Mock order data - in a real app, this would come from an API
  const orders = [
    {
      id: 'ORD-12345678',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: [
        {
          id: 1,
          title: 'Sony WH-1000XM5 Wireless Headphones',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
          price: 349.99,
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-87654321',
      date: '2024-01-10',
      status: 'In Transit',
      total: 89.99,
      items: [
        {
          id: 2,
          title: "Levi's Men's 501 Original Fit Jeans",
          image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
          price: 59.50,
          quantity: 1
        },
        {
          id: 3,
          title: 'Organic Cotton T-Shirt',
          image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
          price: 29.99,
          quantity: 1
        }
      ]
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
            <p className="text-gray-600 mb-6">
              You need to be signed in to view your orders.
            </p>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'In Transit':
        return 'text-blue-600 bg-blue-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">Order placed</p>
                        <p className="font-medium text-gray-900">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order #</p>
                        <p className="font-medium text-gray-900">{order.id}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link
                            to={`/product/${item.id}`}
                            className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
                          >
                            View Product
                          </Link>
                          {order.status === 'Delivered' && (
                            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors flex items-center space-x-1">
                              <Star className="w-4 h-4" />
                              <span>Write Review</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-medium transition-colors">
                      Track Package
                    </button>
                    <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
                      View Invoice
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
                        Return Items
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;