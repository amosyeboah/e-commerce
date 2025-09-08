import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  
  const isInWishlist = state.user?.wishlist.includes(product.id) || false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.inStock) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product, quantity: 1 }
      });
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add to Cart"
              >
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </button>
              <Link
                to={`/product/${product.id}`}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                title="Quick View"
              >
                <Eye className="h-5 w-5 text-blue-600" />
              </Link>
              {user && (
                <button
                  onClick={handleWishlistToggle}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-red-500'}`} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}