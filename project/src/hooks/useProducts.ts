import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';

export function useProducts() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Simulate loading products (in real app, this would be an API call)
    if (state.products.length === 0) {
      // Add products to state
      const action = { type: 'SET_PRODUCTS' as const, payload: mockProducts };
      // Since we don't have SET_PRODUCTS in our reducer, we'll initialize products differently
      // For now, we'll assume products are available in state
    }
  }, [state.products.length]);

  const getFilteredProducts = () => {
    let filtered = mockProducts;

    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    if (state.filters.category) {
      filtered = filtered.filter(product => product.category === state.filters.category);
    }

    if (state.filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    filtered = filtered.filter(
      product => product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1]
    );

    return filtered;
  };

  const getFeaturedProducts = () => {
    return mockProducts.filter(product => product.featured);
  };

  const getProductById = (id: number) => {
    return mockProducts.find(product => product.id === id);
  };

  const getCategories = () => {
    const categories = mockProducts.map(product => product.category);
    return [...new Set(categories)];
  };

  return {
    products: getFilteredProducts(),
    featuredProducts: getFeaturedProducts(),
    getProductById,
    categories: getCategories(),
    isLoading: false
  };
}