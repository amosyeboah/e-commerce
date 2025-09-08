import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Shirt, Home, Camera, Watch, Headphones } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export function CategoriesPage() {
  const { categories } = useProducts();

  const categoryData = [
    {
      name: 'Electronics',
      description: 'Latest gadgets, smartphones, laptops, and tech accessories',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      icon: Smartphone,
      color: 'from-blue-500 to-blue-600',
      products: 15
    },
    {
      name: 'Fashion',
      description: 'Trendy clothing, shoes, and accessories for all styles',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      icon: Shirt,
      color: 'from-pink-500 to-rose-600',
      products: 23
    },
    {
      name: 'Home',
      description: 'Beautiful home decor, furniture, and living essentials',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      icon: Home,
      color: 'from-green-500 to-emerald-600',
      products: 18
    },
    {
      name: 'Sports & Outdoors',
      description: 'Equipment and gear for fitness and outdoor adventures',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
      icon: Watch,
      color: 'from-orange-500 to-red-600',
      products: 12
    },
    {
      name: 'Beauty & Health',
      description: 'Skincare, cosmetics, and wellness products',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
      icon: Camera,
      color: 'from-purple-500 to-indigo-600',
      products: 9
    },
    {
      name: 'Audio & Music',
      description: 'Headphones, speakers, and musical instruments',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      icon: Headphones,
      color: 'from-teal-500 to-cyan-600',
      products: 7
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Category</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover our carefully curated collections designed to meet all your needs
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  to={`/products?category=${category.name}`}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Background Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Category Icon */}
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>

                    {/* Product Count */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-800">
                        {category.products} Products
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:${category.color} rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100`}></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular This Season
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trending categories that our customers love most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Electronics Highlight */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white overflow-hidden">
              <div className="relative z-10">
                <Smartphone className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Latest Electronics</h3>
                <p className="text-blue-100 mb-6">
                  Discover cutting-edge technology and innovative gadgets
                </p>
                <Link
                  to="/products?category=Electronics"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Shop Electronics
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20">
                <Smartphone className="h-32 w-32" />
              </div>
            </div>

            {/* Fashion Highlight */}
            <div className="relative bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white overflow-hidden">
              <div className="relative z-10">
                <Shirt className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Fashion Forward</h3>
                <p className="text-pink-100 mb-6">
                  Stay ahead of trends with our curated fashion collection
                </p>
                <Link
                  to="/products?category=Fashion"
                  className="inline-flex items-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors"
                >
                  Shop Fashion
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20">
                <Shirt className="h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Use our advanced search and filtering system to find exactly what you need
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}