import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Truck, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Find Everything You Need,
              <span className="text-orange-600"> All in One Place</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover millions of products at unbeatable prices. From electronics to fashion, 
              home goods to books - we have it all with fast, free delivery.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/?category=electronics"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Shop Electronics</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/?category=clothing"
                className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-medium hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <span>Browse Fashion</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Shopping"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-3">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Free Shipping</h3>
            <p className="text-gray-600">Free delivery on orders over $35. Fast and reliable shipping worldwide.</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Secure Shopping</h3>
            <p className="text-gray-600">Your privacy and security are our top priorities. Shop with confidence.</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy. Not satisfied? Return it hassle-free.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;