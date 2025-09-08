import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useDebounce } from '../hooks/useDebounce'; 

export function Header() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(null);


  // --- Use the custom debounce hook here ---
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // --- New useEffect to handle search dispatch ---
  useEffect(() => {
    // Only dispatch the search action if the debounced query is not empty
    if (debouncedSearchQuery) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: debouncedSearchQuery });
    }
  }, [debouncedSearchQuery, dispatch]);

  // Close menus when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(null);
  }, [location]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Since the search query is already being debounced, you can just navigate.
    // The last debounced value will be used by the useEffect above.
    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMegaMenu = (menu) => {
    setIsMegaMenuOpen(isMegaMenuOpen === menu ? null : menu);
  };

  const categories = [
    { name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Cameras'] },
    { name: 'Fashion', subcategories: ['Men', 'Women', 'Kids'] },
    { name: 'Home', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
  ];
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-1' : 'bg-white shadow-sm py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EliteShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 ml-8">
            <Link 
              to="/" 
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            
            <div className="relative group">
              <button 
                onClick={() => toggleMegaMenu('products')}
                className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center"
              >
                Products
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isMegaMenuOpen === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {isMegaMenuOpen === 'products' && (
                <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg p-4 z-50 mt-0 grid grid-cols-3 gap-6 min-w-[600px]">
                  {categories.map((category) => (
                    <div key={category.name}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <ul className="space-y-2">
                        {category.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link 
                              to={`/products?category=${sub.toLowerCase()}`} 
                              className="text-gray-600 hover:text-blue-600 transition-colors block py-1"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              to="/categories" 
            className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Categories</Link>

            <Link 
              to="/deals" 
              className="px-3 py-2 text-red-600 hover:text-red-700 transition-colors font-medium flex items-center"
            >
              Deals
              <span className="ml-1.5 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                Hot
              </span>
            </Link>
            
            <Link 
              to="/about" 
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
            className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>

          </nav>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex items-center flex-1 max-w-xl mx-4 lg:mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {state.isLoggedIn && (
              <Link 
                to="/wishlist" 
                className="p-2 text-gray-700 hover:text-red-500 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {state.wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>
            )}
            
            <Link 
              to="/cart" 
              className="p-2 relative text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {state.isLoggedIn ? (
              <div className="relative group">
                <button 
                  className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Account"
                  onClick={() => toggleMegaMenu('account')}
                >
                  <User className="h-5 w-5" />
                </button>
                
                {isMegaMenuOpen === 'account' && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => dispatch({ type: 'LOGOUT' })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 bg-white">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </form>
            
            {/* Mobile Navigation */}
            <nav className="space-y-1 px-2">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              >
                Home
              </Link>
              
              <div>
                <button 
                  onClick={() => toggleMegaMenu('mobile-products')}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMegaMenuOpen === 'mobile-products' ? 'rotate-180' : ''}`} />
                </button>
                
                {isMegaMenuOpen === 'mobile-products' && (
                  <div className="pl-4 mt-1 space-y-1">
                    {categories.map((category) => (
                      <div key={category.name} className="mb-2">
                        <h4 className="font-medium text-gray-800 px-2 py-1">{category.name}</h4>
                        <ul className="pl-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub}>
                              <Link 
                                to={`/products?category=${sub.toLowerCase()}`} 
                                className="block px-2 py-1.5 text-gray-600 hover:bg-gray-50 rounded-md"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/deals" 
                className="block px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
              >
                Deals
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Hot
                </span>
              </Link>
              
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              >
                About
              </Link>
              
              <div className="pt-3 mt-3 border-t border-gray-200 flex items-center justify-between">
                {state.isLoggedIn && (
                  <Link 
                    to="/wishlist" 
                    className="p-2 text-gray-700 hover:text-red-500 transition-colors relative"
                  >
                    <Heart className="h-5 w-5" />
                    {state.wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {state.wishlist.length}
                      </span>
                    )}
                  </Link>
                )}
                
                <Link 
                  to="/cart" 
                  className="p-2 relative text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                
                {state.isLoggedIn ? (
                  <div className="flex-1 text-right">
                    <Link
                      to="/account"
                      className="inline-block px-3 py-1.5 text-blue-600 font-medium text-sm"
                    >
                      My Account
                    </Link>
                  </div>
                ) : (
                  <div className="flex-1 flex justify-end space-x-2">
                    <Link
                      to="/login"
                      className="px-3 py-1.5 text-blue-600 font-medium text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md font-medium text-sm"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
        
      </div>
    </header>
  );
}