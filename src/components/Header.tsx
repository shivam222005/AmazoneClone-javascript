import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-orange-500 p-2 rounded-md">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">AmazonClone</span>
          </Link>

          {/* Delivery Address */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4" />
            <div>
              <div className="text-xs text-gray-300">Deliver to</div>
              <div className="font-medium">New York 10001</div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <select className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md border-r border-gray-300 focus:outline-none">
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Home</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {/* Language */}
            <div className="hidden md:block text-sm">
              <div className="flex items-center space-x-1">
                <span>🇺🇸</span>
                <span>EN</span>
              </div>
            </div>

            {/* Account */}
            <div className="relative">
              {user ? (
                <div className="group">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <User className="w-5 h-5" />
                    <div className="hidden md:block text-sm">
                      <div className="text-xs text-gray-300">Hello, {user.name}</div>
                      <div className="font-medium">Account & Lists</div>
                    </div>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Sign Out
                      </button>
                      <Link
                        to="/orders"
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Your Orders
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                  <User className="w-5 h-5" />
                  <div className="hidden md:block text-sm">
                    <div className="text-xs text-gray-300">Hello, sign in</div>
                    <div className="font-medium">Account & Lists</div>
                  </div>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center space-x-1 hover:opacity-80 transition-opacity">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden md:block text-sm">
                <div className="text-xs text-gray-300">Cart</div>
                <div className="font-medium">${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</div>
              </div>
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center space-x-6 text-sm overflow-x-auto">
            <Link to="/?category=electronics" className="whitespace-nowrap hover:text-orange-300 transition-colors">Electronics</Link>
            <Link to="/?category=clothing" className="whitespace-nowrap hover:text-orange-300 transition-colors">Fashion</Link>
            <Link to="/?category=home" className="whitespace-nowrap hover:text-orange-300 transition-colors">Home & Garden</Link>
            <Link to="/?category=books" className="whitespace-nowrap hover:text-orange-300 transition-colors">Books</Link>
            <Link to="/?category=sports" className="whitespace-nowrap hover:text-orange-300 transition-colors">Sports & Outdoors</Link>
            <Link to="/?category=beauty" className="whitespace-nowrap hover:text-orange-300 transition-colors">Beauty</Link>
            <Link to="/?category=automotive" className="whitespace-nowrap hover:text-orange-300 transition-colors">Automotive</Link>
            <span className="whitespace-nowrap text-orange-300 font-medium cursor-pointer">Today's Deals</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="p-4 space-y-4">
            <Link to="/?category=electronics" className="block hover:text-orange-300 transition-colors">Electronics</Link>
            <Link to="/?category=clothing" className="block hover:text-orange-300 transition-colors">Fashion</Link>
            <Link to="/?category=home" className="block hover:text-orange-300 transition-colors">Home & Garden</Link>
            <Link to="/?category=books" className="block hover:text-orange-300 transition-colors">Books</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;