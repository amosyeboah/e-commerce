import { Product, User } from '../context/AppContext';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    category: "Electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
      "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg"
    ],
    description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort padding.",
    inStock: true,
    rating: 4.8,
    reviews: 324,
    variants: {
      colors: ["Black", "White", "Blue", "Red"]
    },
    featured: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 249,
    category: "Electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg"
    ],
    description: "Track your fitness goals with precision. Heart rate monitoring, GPS, sleep tracking, and 7-day battery life.",
    inStock: true,
    rating: 4.6,
    reviews: 189,
    variants: {
      colors: ["Black", "Silver", "Rose Gold"],
      sizes: ["38mm", "42mm"]
    },
    featured: true
  },
  {
    id: 3,
    name: "Designer Leather Jacket",
    price: 189,
    originalPrice: 259,
    category: "Fashion",
    image: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg",
    images: [
      "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg",
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"
    ],
    description: "Premium genuine leather jacket with modern styling. Perfect for any occasion with superior comfort and durability.",
    inStock: true,
    rating: 4.9,
    reviews: 76,
    variants: {
      colors: ["Black", "Brown", "Tan"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    featured: true
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 79,
    category: "Home",
    image: "https://images.pexels.com/photos/1002544/pexels-photo-1002544.jpeg",
    images: [
      "https://images.pexels.com/photos/1002544/pexels-photo-1002544.jpeg",
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg"
    ],
    description: "Modern adjustable desk lamp with LED lighting and touch controls. Perfect for any workspace.",
    inStock: true,
    rating: 4.4,
    reviews: 132,
    variants: {
      colors: ["White", "Black", "Silver"]
    }
  },
  {
    id: 5,
    name: "Professional Camera Lens",
    price: 899,
    category: "Electronics",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
      "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg"
    ],
    description: "Professional-grade camera lens with superior optics and fast autofocus. Perfect for portraits and landscapes.",
    inStock: false,
    rating: 4.7,
    reviews: 45,
    variants: {}
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 29,
    category: "Fashion",
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
    images: [
      "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
      "https://images.pexels.com/photos/2739666/pexels-photo-2739666.jpeg"
    ],
    description: "Soft, comfortable organic cotton t-shirt. Sustainable fashion that feels great and looks amazing.",
    inStock: true,
    rating: 4.3,
    reviews: 298,
    variants: {
      colors: ["White", "Black", "Gray", "Navy", "Green"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    }
  }
];

export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  addresses: [
    {
      id: 1,
      type: "billing",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      isDefault: true
    }
  ],
  orderHistory: [
    {
      id: 1,
      date: "2024-01-15",
      status: "delivered",
      items: [
        {
          ...mockProducts[0],
          quantity: 1,
          selectedColor: "Black"
        }
      ],
      total: 299,
      shippingAddress: {
        id: 1,
        type: "shipping",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
        isDefault: true
      },
      billingAddress: {
        id: 1,
        type: "billing",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
        isDefault: true
      }
    }
  ],
  wishlist: [2, 5]
};