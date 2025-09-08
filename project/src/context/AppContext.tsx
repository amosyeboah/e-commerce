import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  variants: {
    colors?: string[];
    sizes?: string[];
  };
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  addresses: Address[];
  orderHistory: Order[];
  wishlist: number[];
}

export interface Address {
  id: number;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  searchQuery: string;
  filters: {
    category: string;
    priceRange: [number, number];
    inStock: boolean;
  };
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedColor?: string; selectedSize?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'ADD_TO_WISHLIST'; payload: number }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number };

const initialState: AppState = {
  products: [],
  cart: [],
  user: null,
  searchQuery: '',
  filters: {
    category: '',
    priceRange: [0, 1000],
    inStock: true,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      { const existingItem = state.cart.find(
        item => 
          item.id === action.payload.product.id && 
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.product.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { 
          ...action.payload.product, 
          quantity: action.payload.quantity,
          selectedColor: action.payload.selectedColor,
          selectedSize: action.payload.selectedSize,
        }],
      }; }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item, index) =>
          index === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'ADD_TO_WISHLIST':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: [...state.user.wishlist, action.payload],
          },
        };
      }
      return state;

    case 'REMOVE_FROM_WISHLIST':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: state.user.wishlist.filter(id => id !== action.payload),
          },
        };
      }
      return state;

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user: authUser } = useAuth();

  // Sync auth user with app state
  React.useEffect(() => {
    if (authUser && !state.user) {
      const appUser: User = {
        id: parseInt(authUser.id),
        name: authUser.user_metadata?.first_name 
          ? `${authUser.user_metadata.first_name} ${authUser.user_metadata.last_name || ''}`.trim()
          : authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        addresses: [],
        orderHistory: [],
        wishlist: []
      };
      dispatch({ type: 'SET_USER', payload: appUser });
    } else if (!authUser && state.user) {
      dispatch({ type: 'LOGOUT' });
    }
  }, [authUser, state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}