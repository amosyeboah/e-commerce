import React from 'react';
import { Users, Award, Globe, Heart, Shield, Truck, Star, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products Sold', value: '1M+', icon: Award },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Years of Excellence', value: '10+', icon: Star }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing the best possible experience for our customers.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We carefully curate every product to ensure it meets our high standards of quality and reliability.'
    },
    {
      icon: Truck,
      title: 'Fast & Reliable',
      description: 'Quick shipping, secure packaging, and reliable delivery to get your orders to you safely and on time.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with localized experiences and international shipping options.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Visionary leader with 15+ years in e-commerce and retail innovation.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Technology expert focused on creating seamless digital experiences.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      bio: 'Creative director passionate about user-centered design and innovation.'
    },
    {
      name: 'David Kim',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      bio: 'Operations specialist ensuring smooth fulfillment and customer satisfaction.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">EliteShop</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            We're more than just an online store. We're your trusted partner in discovering quality products that enhance your lifestyle.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2014, EliteShop began as a small startup with a big vision: to create an online shopping experience that puts customers first. What started in a garage has grown into a global marketplace trusted by millions.
                </p>
                <p>
                  Our journey has been driven by a simple belief - that everyone deserves access to quality products at fair prices, backed by exceptional service. We've built our reputation one satisfied customer at a time.
                </p>
                <p>
                  Today, we're proud to offer thousands of carefully curated products from trusted brands and emerging designers, all while maintaining the personal touch and attention to detail that set us apart from day one.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Our Story"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind EliteShop's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
            "To democratize access to quality products by creating an inclusive, innovative, and sustainable marketplace that connects customers with the items they love while supporting businesses of all sizes."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
                alt="Sustainability"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Committed to <span className="text-green-600">Sustainability</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  We believe in responsible business practices that protect our planet for future generations. Our sustainability initiatives include eco-friendly packaging, carbon-neutral shipping options, and partnerships with environmentally conscious brands.
                </p>
                <p>
                  From sourcing products made with sustainable materials to implementing green practices in our operations, we're constantly working to reduce our environmental footprint while maintaining the quality our customers expect.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Recyclable Packaging</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">50%</div>
                  <div className="text-sm text-gray-600">Carbon Footprint Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}