-- Ecommerce Database Sample Data
-- Run these INSERT statements in your Supabase SQL editor

-- Insert Categories (hierarchical structure)
INSERT INTO categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Smart Device', 'smart-device', 'Latest smart devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500', NULL, 1, true),
('550e8400-e29b-41d4-a716-446655440002', 'Clothing', 'clothing', 'Fashion and apparel for all', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500', NULL, 2, true),
('550e8400-e29b-41d4-a716-446655440003', 'Home & Garden', 'home-garden', 'Everything for your home and garden', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', NULL, 3, true),
('550e8400-e29b-41d4-a716-446655440004', 'Sports', 'sports', 'Sports equipment and fitness gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', NULL, 4, true),
('550e8400-e29b-41d4-a716-446655440005', 'Smartphones', 'smartphones', 'Latest smartphones and accessories', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', '550e8400-e29b-41d4-a716-446655440001', 1, true),
('550e8400-e29b-41d4-a716-446655440006', 'Laptops', 'laptops', 'Computers and laptops', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', '550e8400-e29b-41d4-a716-446655440001', 2, true),
('550e8400-e29b-41d4-a716-446655440007', 'Men''s Clothing', 'mens-clothing', 'Fashion for men', 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500', '550e8400-e29b-41d4-a716-446655440002', 1, true),
('550e8400-e29b-41d4-a716-446655440008', 'Women''s Clothing', 'womens-clothing', 'Fashion for women', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500', '550e8400-e29b-41d4-a716-446655440002', 2, true);

-- Insert Products
INSERT INTO products (id, name, slug, description, short_description, sku, category_id, price, original_price, cost_price, weight, dimensions, is_active, is_featured, is_digital, requires_shipping, meta_title, meta_description) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'iPhone 15 Pro', 'iphone-15-pro', 'The latest iPhone with titanium design, A17 Pro chip, and advanced camera system. Perfect for photography enthusiasts and professionals.', 'Latest iPhone with titanium design and A17 Pro chip', 'IPH15PRO001', '550e8400-e29b-41d4-a716-446655440005', 999.00, 1099.00, 600.00, 0.19, '{"length": 14.67, "width": 7.09, "height": 0.83}', true, true, false, true, 'iPhone 15 Pro - Latest Apple Smartphone', 'Buy the new iPhone 15 Pro with titanium design and advanced features'),
('650e8400-e29b-41d4-a716-446655440002', 'Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Premium Android smartphone with S Pen, 200MP camera, and AI-powered features for productivity and creativity.', 'Premium Galaxy with S Pen and 200MP camera', 'SGS24U001', '550e8400-e29b-41d4-a716-446655440005', 899.00, 999.00, 550.00, 0.23, '{"length": 16.28, "width": 7.90, "height": 0.86}', true, true, false, true, 'Samsung Galaxy S24 Ultra - Premium Android Phone', 'Experience the power of Galaxy S24 Ultra with S Pen'),
('650e8400-e29b-41d4-a716-446655440003', 'MacBook Pro 14"', 'macbook-pro-14', 'Powerful laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for professionals and creators.', 'MacBook Pro with M3 chip and 14-inch display', 'MBP14M3001', '550e8400-e29b-41d4-a716-446655440006', 1599.00, 1799.00, 1000.00, 1.60, '{"length": 31.26, "width": 22.12, "height": 1.55}', true, true, false, true, 'MacBook Pro 14" - Professional Laptop', 'MacBook Pro with M3 chip for professionals'),
('650e8400-e29b-41d4-a716-446655440004', 'Dell XPS 13', 'dell-xps-13', 'Ultra-portable Windows laptop with InfinityEdge display and premium build quality. Ideal for business and productivity.', 'Ultra-portable laptop with InfinityEdge display', 'DXPS13001', '550e8400-e29b-41d4-a716-446655440006', 1199.00, 1299.00, 800.00, 1.20, '{"length": 29.57, "width": 19.90, "height": 1.49}', true, false, false, true, 'Dell XPS 13 - Ultra-portable Laptop', 'Premium Dell XPS 13 laptop for professionals'),
('650e8400-e29b-41d4-a716-446655440005', 'Men''s Premium T-Shirt', 'mens-premium-tshirt', 'High-quality cotton t-shirt with modern fit. Available in multiple colors and sizes. Perfect for casual wear.', 'Premium cotton t-shirt with modern fit', 'MTSH001', '550e8400-e29b-41d4-a716-446655440007', 29.99, 39.99, 12.00, 0.15, '{"length": 28, "width": 20, "height": 0.5}', true, false, false, true, 'Men''s Premium T-Shirt - Quality Cotton', 'Comfortable premium t-shirt for men'),
('650e8400-e29b-41d4-a716-446655440006', 'Women''s Summer Dress', 'womens-summer-dress', 'Elegant summer dress made from breathable fabric. Perfect for casual outings and special occasions.', 'Elegant summer dress in breathable fabric', 'WSDR001', '550e8400-e29b-41d4-a716-446655440008', 79.99, 99.99, 35.00, 0.25, '{"length": 32, "width": 24, "height": 1}', true, true, false, true, 'Women''s Summer Dress - Elegant Style', 'Beautiful summer dress for women'),
('650e8400-e29b-41d4-a716-446655440007', 'Wireless Bluetooth Headphones', 'wireless-bluetooth-headphones', 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers.', 'Wireless headphones with noise cancellation', 'WBTH001', '550e8400-e29b-41d4-a716-446655440001', 199.99, 249.99, 80.00, 0.30, '{"length": 18, "width": 16, "height": 8}', true, true, false, true, 'Wireless Bluetooth Headphones - Premium Audio', 'High-quality wireless headphones with noise cancellation'),
('650e8400-e29b-41d4-a716-446655440008', 'Smart Fitness Watch', 'smart-fitness-watch', 'Advanced fitness tracking watch with heart rate monitor, GPS, and 7-day battery life. Track your health goals.', 'Smart watch with fitness tracking features', 'SFW001', '550e8400-e29b-41d4-a716-446655440004', 299.99, 349.99, 150.00, 0.08, '{"length": 4.5, "width": 4, "height": 1.2}', true, true, false, true, 'Smart Fitness Watch - Health Tracking', 'Advanced fitness watch with health monitoring'),
('650e8400-e29b-41d4-a716-446655440009', 'Ergonomic Office Chair', 'ergonomic-office-chair', 'Comfortable office chair with lumbar support and adjustable height. Perfect for long working hours.', 'Ergonomic chair with lumbar support', 'EOC001', '550e8400-e29b-41d4-a716-446655440003', 399.99, 499.99, 200.00, 15.00, '{"length": 66, "width": 66, "height": 120}', true, false, false, true, 'Ergonomic Office Chair - Comfortable Seating', 'Professional office chair with ergonomic design'),
('650e8400-e29b-41d4-a716-446655440010', 'Premium Coffee Maker', 'premium-coffee-maker', 'Automatic coffee maker with programmable settings and thermal carafe. Make perfect coffee every morning.', 'Programmable coffee maker with thermal carafe', 'PCM001', '550e8400-e29b-41d4-a716-446655440003', 149.99, 179.99, 75.00, 3.50, '{"length": 35, "width": 25, "height": 40}', true, false, false, true, 'Premium Coffee Maker - Perfect Coffee Daily', 'Automatic coffee maker for perfect morning coffee');

-- Insert Product Images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
-- iPhone 15 Pro images
('650e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', 'iPhone 15 Pro front view', 0, true),
('650e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1695048133112-b20c7e893861?w=800', 'iPhone 15 Pro back view', 1, false),
('650e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1695048132983-f7a4e04c5cbb?w=800', 'iPhone 15 Pro side view', 2, false),
-- Samsung Galaxy S24 Ultra images
('650e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', 'Galaxy S24 Ultra front view', 0, true),
('650e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800', 'Galaxy S24 Ultra with S Pen', 1, false),
-- MacBook Pro images
('650e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'MacBook Pro open view', 0, true),
('650e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'MacBook Pro side profile', 1, false),
-- Dell XPS 13 images
('650e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', 'Dell XPS 13 open', 0, true),
-- T-shirt images
('650e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'Men''s premium t-shirt front', 0, true),
('650e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800', 'Men''s premium t-shirt back', 1, false),
-- Summer dress images
('650e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'Summer dress front view', 0, true),
('650e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', 'Summer dress styled', 1, false),
-- Headphones images
('650e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'Wireless headphones front', 0, true),
('650e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800', 'Headphones side view', 1, false),
-- Smart watch images
('650e8400-e29b-41d4-a716-446655440008', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', 'Smart fitness watch face', 0, true),
('650e8400-e29b-41d4-a716-446655440008', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800', 'Smart watch on wrist', 1, false),
-- Office chair images
('650e8400-e29b-41d4-a716-446655440009', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'Ergonomic office chair', 0, true),
-- Coffee maker images
('650e8400-e29b-41d4-a716-446655440010', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', 'Premium coffee maker', 0, true);

-- Insert Product Variants
INSERT INTO product_variants (product_id, name, value, price_adjustment, sku_suffix, sort_order) VALUES
-- iPhone 15 Pro variants
('650e8400-e29b-41d4-a716-446655440001', 'Color', 'Natural Titanium', 0.00, 'NT', 0),
('650e8400-e29b-41d4-a716-446655440001', 'Color', 'Blue Titanium', 0.00, 'BT', 1),
('650e8400-e29b-41d4-a716-446655440001', 'Color', 'White Titanium', 0.00, 'WT', 2),
('650e8400-e29b-41d4-a716-446655440001', 'Color', 'Black Titanium', 0.00, 'BKT', 3),
('650e8400-e29b-41d4-a716-446655440001', 'Storage', '128GB', 0.00, '128', 0),
('650e8400-e29b-41d4-a716-446655440001', 'Storage', '256GB', 100.00, '256', 1),
('650e8400-e29b-41d4-a716-446655440001', 'Storage', '512GB', 300.00, '512', 2),
('650e8400-e29b-41d4-a716-446655440001', 'Storage', '1TB', 500.00, '1TB', 3),
-- Samsung Galaxy variants
('650e8400-e29b-41d4-a716-446655440002', 'Color', 'Titanium Gray', 0.00, 'TG', 0),
('650e8400-e29b-41d4-a716-446655440002', 'Color', 'Titanium Black', 0.00, 'TB', 1),
('650e8400-e29b-41d4-a716-446655440002', 'Color', 'Titanium Violet', 0.00, 'TV', 2),
('650e8400-e29b-41d4-a716-446655440002', 'Storage', '256GB', 0.00, '256', 0),
('650e8400-e29b-41d4-a716-446655440002', 'Storage', '512GB', 120.00, '512', 1),
('650e8400-e29b-41d4-a716-446655440002', 'Storage', '1TB', 240.00, '1TB', 2),
-- MacBook Pro variants
('650e8400-e29b-41d4-a716-446655440003', 'Color', 'Space Gray', 0.00, 'SG', 0),
('650e8400-e29b-41d4-a716-446655440003', 'Color', 'Silver', 0.00, 'SV', 1),
('650e8400-e29b-41d4-a716-446655440003', 'Memory', '8GB', 0.00, '8GB', 0),
('650e8400-e29b-41d4-a716-446655440003', 'Memory', '16GB', 200.00, '16GB', 1),
('650e8400-e29b-41d4-a716-446655440003', 'Memory', '32GB', 600.00, '32GB', 2),
-- T-shirt variants
('650e8400-e29b-41d4-a716-446655440005', 'Size', 'S', 0.00, 'S', 0),
('650e8400-e29b-41d4-a716-446655440005', 'Size', 'M', 0.00, 'M', 1),
('650e8400-e29b-41d4-a716-446655440005', 'Size', 'L', 0.00, 'L', 2),
('650e8400-e29b-41d4-a716-446655440005', 'Size', 'XL', 2.00, 'XL', 3),
('650e8400-e29b-41d4-a716-446655440005', 'Size', 'XXL', 4.00, 'XXL', 4),
('650e8400-e29b-41d4-a716-446655440005', 'Color', 'White', 0.00, 'W', 0),
('650e8400-e29b-41d4-a716-446655440005', 'Color', 'Black', 0.00, 'B', 1),
('650e8400-e29b-41d4-a716-446655440005', 'Color', 'Navy', 0.00, 'N', 2),
('650e8400-e29b-41d4-a716-446655440005', 'Color', 'Gray', 0.00, 'G', 3),
-- Summer dress variants
('650e8400-e29b-41d4-a716-446655440006', 'Size', 'XS', 0.00, 'XS', 0),
('650e8400-e29b-41d4-a716-446655440006', 'Size', 'S', 0.00, 'S', 1),
('650e8400-e29b-41d4-a716-446655440006', 'Size', 'M', 0.00, 'M', 2),
('650e8400-e29b-41d4-a716-446655440006', 'Size', 'L', 0.00, 'L', 3),
('650e8400-e29b-41d4-a716-446655440006', 'Size', 'XL', 0.00, 'XL', 4),
('650e8400-e29b-41d4-a716-446655440006', 'Color', 'Floral Blue', 0.00, 'FB', 0),
('650e8400-e29b-41d4-a716-446655440006', 'Color', 'Solid Red', 0.00, 'SR', 1),
('650e8400-e29b-41d4-a716-446655440006', 'Color', 'White', 0.00, 'W', 2),
-- Headphones variants
('650e8400-e29b-41d4-a716-446655440007', 'Color', 'Black', 0.00, 'B', 0),
('650e8400-e29b-41d4-a716-446655440007', 'Color', 'White', 0.00, 'W', 1),
('650e8400-e29b-41d4-a716-446655440007', 'Color', 'Silver', 10.00, 'S', 2),
-- Smart watch variants
('650e8400-e29b-41d4-a716-446655440008', 'Color', 'Black', 0.00, 'B', 0),
('650e8400-e29b-41d4-a716-446655440008', 'Color', 'Silver', 0.00, 'S', 1),
('650e8400-e29b-41d4-a716-446655440008', 'Color', 'Rose Gold', 25.00, 'RG', 2),
('650e8400-e29b-41d4-a716-446655440008', 'Band', 'Sport Band', 0.00, 'SP', 0),
('650e8400-e29b-41d4-a716-446655440008', 'Band', 'Leather', 50.00, 'LE', 1),
('650e8400-e29b-41d4-a716-446655440008', 'Band', 'Metal', 100.00, 'MT', 2);

-- Insert Inventory
INSERT INTO inventory (product_id, variant_combination, quantity, reserved_quantity, low_stock_threshold, track_inventory) VALUES
-- iPhone 15 Pro inventory
('650e8400-e29b-41d4-a716-446655440001', '{"Color": "Natural Titanium", "Storage": "128GB"}', 25, 0, 5, true),
('650e8400-e29b-41d4-a716-446655440001', '{"Color": "Natural Titanium", "Storage": "256GB"}', 30, 2, 5, true),
('650e8400-e29b-41d4-a716-446655440001', '{"Color": "Blue Titanium", "Storage": "128GB"}', 20, 1, 5, true),
('650e8400-e29b-41d4-a716-446655440001', '{"Color": "Blue Titanium", "Storage": "256GB"}', 18, 0, 5, true),
('650e8400-e29b-41d4-a716-446655440001', '{"Color": "White Titanium", "Storage": "512GB"}', 15, 0, 5, true),
-- Samsung Galaxy inventory
('650e8400-e29b-41d4-a716-446655440002', '{"Color": "Titanium Gray", "Storage": "256GB"}', 22, 1, 5, true),
('650e8400-e29b-41d4-a716-446655440002', '{"Color": "Titanium Black", "Storage": "256GB"}', 28, 0, 5, true),
('650e8400-e29b-41d4-a716-446655440002', '{"Color": "Titanium Violet", "Storage": "512GB"}', 16, 2, 5, true),
-- MacBook Pro inventory
('650e8400-e29b-41d4-a716-446655440003', '{"Color": "Space Gray", "Memory": "8GB"}', 12, 0, 3, true),
('650e8400-e29b-41d4-a716-446655440003', '{"Color": "Silver", "Memory": "16GB"}', 8, 1, 3, true),
-- Dell XPS inventory
('650e8400-e29b-41d4-a716-446655440004', NULL, 15, 0, 5, true),
-- T-shirt inventory
('650e8400-e29b-41d4-a716-446655440005', '{"Size": "S", "Color": "White"}', 45, 2, 10, true),
('650e8400-e29b-41d4-a716-446655440005', '{"Size": "M", "Color": "White"}', 50, 3, 10, true),
('650e8400-e29b-41d4-a716-446655440005', '{"Size": "L", "Color": "Black"}', 40, 1, 10, true),
('650e8400-e29b-41d4-a716-446655440005', '{"Size": "XL", "Color": "Navy"}', 35, 0, 10, true),
-- Summer dress inventory
('650e8400-e29b-41d4-a716-446655440006', '{"Size": "S", "Color": "Floral Blue"}', 20, 1, 8, true),
('650e8400-e29b-41d4-a716-446655440006', '{"Size": "M", "Color": "White"}', 25, 2, 8, true),
('650e8400-e29b-41d4-a716-446655440006', '{"Size": "L", "Color": "Solid Red"}', 18, 0, 8, true),
-- Headphones inventory
('650e8400-e29b-41d4-a716-446655440007', '{"Color": "Black"}', 35, 2, 8, true),
('650e8400-e29b-41d4-a716-446655440007', '{"Color": "White"}', 30, 1, 8, true),
('650e8400-e29b-41d4-a716-446655440007', '{"Color": "Silver"}', 25, 0, 8, true),
-- Smart watch inventory
('650e8400-e29b-41d4-a716-446655440008', '{"Color": "Black", "Band": "Sport Band"}', 40, 3, 10, true),
('650e8400-e29b-41d4-a716-446655440008', '{"Color": "Silver", "Band": "Leather"}', 30, 1, 10, true),
('650e8400-e29b-41d4-a716-446655440008', '{"Color": "Rose Gold", "Band": "Metal"}', 20, 0, 10, true),
-- Office chair inventory
('650e8400-e29b-41d4-a716-446655440009', NULL, 12, 1, 5, true),
-- Coffee maker inventory
('650e8400-e29b-41d4-a716-446655440010', NULL, 25, 0, 8, true);

-- Insert Sample Customers (for testing - these would normally be created via Supabase Auth)
INSERT INTO customers (id, email, first_name, last_name, phone, is_active, email_verified, accepts_marketing) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'john.doe@example.com', 'John', 'Doe', '+1234567890', true, true, true),
('750e8400-e29b-41d4-a716-446655440002', 'jane.smith@example.com', 'Jane', 'Smith', '+1234567891', true, true, false),
('750e8400-e29b-41d4-a716-446655440003', 'mike.johnson@example.com', 'Mike', 'Johnson', '+1234567892', true, true, true),
('750e8400-e29b-41d4-a716-446655440004', 'sarah.wilson@example.com', 'Sarah', 'Wilson', '+1234567893', true, true, true),
('750e8400-e29b-41d4-a716-446655440005', 'david.brown@example.com', 'David', 'Brown', '+1234567894', true, false, false);

-- Insert Customer Addresses
INSERT INTO addresses (customer_id, type, first_name, last_name, company, address_line_1, address_line_2, city, state, postal_code, country, phone, is_default) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'shipping', 'John', 'Doe', NULL, '123 Main Street', 'Apt 4B', 'New York', 'NY', '10001', 'US', '+1234567890', true),
('750e8400-e29b-41d4-a716-446655440001', 'billing', 'John', 'Doe', NULL, '123 Main Street', 'Apt 4B', 'New York', 'NY', '10001', 'US', '+1234567890', true),
('750e8400-e29b-41d4-a716-446655440002', 'shipping', 'Jane', 'Smith', 'Tech Corp', '456 Oak Avenue', 'Suite 200', 'Los Angeles', 'CA', '90210', 'US', '+1234567891', true),
('750e8400-e29b-41d4-a716-446655440002', 'billing', 'Jane', 'Smith', 'Tech Corp', '456 Oak Avenue', 'Suite 200', 'Los Angeles', 'CA', '90210', 'US', '+1234567891', true),
('750e8400-e29b-41d4-a716-446655440003', 'shipping', 'Mike', 'Johnson', NULL, '789 Pine Road', NULL, 'Chicago', 'IL', '60601', 'US', '+1234567892', true),
('750e8400-e29b-41d4-a716-446655440004', 'shipping', 'Sarah', 'Wilson', NULL, '321 Elm Street', 'Unit 5', 'Miami', 'FL', '33101', 'US', '+1234567893', true),
('750e8400-e29b-41d4-a716-446655440005', 'shipping', 'David', 'Brown', 'Design Studio', '654 Maple Lane', NULL, 'Seattle', 'WA', '98101', 'US', '+1234567894', true);

-- Insert Coupons
INSERT INTO coupons (id, code, name, description, discount_type, discount_value, minimum_order_amount, maximum_discount_amount, usage_limit, usage_count, is_active, starts_at, expires_at) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'WELCOME10', 'Welcome Discount', 'Get 10% off your first order', 'percentage', 10.00, 50.00, 100.00, 1000, 45, true, now() - interval '30 days', now() + interval '60 days'),
('850e8400-e29b-41d4-a716-446655440002', 'SAVE50', 'Save $50', 'Save $50 on orders over $500', 'fixed_amount', 50.00, 500.00, NULL, 500, 23, true, now() - interval '15 days', now() + interval '45 days'),
('850e8400-e29b-41d4-a716-446655440003', 'SMART20', 'Smart Device Sale', '20% off all smart devices', 'percentage', 20.00, 100.00, 200.00, 200, 67, true, now() - interval '7 days', now() + interval '21 days'),
('850e8400-e29b-41d4-a716-446655440004', 'FREESHIP', 'Free Shipping', 'Free shipping on all orders', 'fixed_amount', 10.00, 25.00, 10.00, NULL, 156, true, now() - interval '60 days', now() + interval '30 days'),
('850e8400-e29b-41d4-a716-446655440005', 'SUMMER25', 'Summer Sale', '25% off summer collection', 'percentage', 25.00, 75.00, 150.00, 300, 89, true, now() - interval '10 days', now() + interval '20 days');

-- Insert Sample Orders
INSERT INTO orders (id, order_number, customer_id, status, customer_email, customer_phone, subtotal, tax_amount, shipping_amount, discount_amount, total_amount, billing_address, shipping_address, shipping_method, payment_status, payment_method, coupon_id, coupon_code, created_at) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'ORD-20241215-0001', '750e8400-e29b-41d4-a716-446655440001', 'delivered', 'john.doe@example.com', '+1234567890', 999.00, 89.91, 0.00, 99.90, 989.01, '{"first_name": "John", "last_name": "Doe", "address_line_1": "123 Main Street", "address_line_2": "Apt 4B", "city": "New York", "state": "NY", "postal_code": "10001", "country": "US", "phone": "+1234567890"}', '{"first_name": "John", "last_name": "Doe", "address_line_1": "123 Main Street", "address_line_2": "Apt 4B", "city": "New York", "state": "NY", "postal_code": "10001", "country": "US", "phone": "+1234567890"}', 'Standard Shipping', 'paid', 'Credit Card', '850e8400-e29b-41d4-a716-446655440001', 'WELCOME10', now() - interval '5 days'),
('950e8400-e29b-41d4-a716-446655440002', 'ORD-20241216-0002', '750e8400-e29b-41d4-a716-446655440002', 'shipped', 'jane.smith@example.com', '+1234567891', 1599.00, 143.91, 15.99, 0.00, 1758.90, '{"first_name": "Jane", "last_name": "Smith", "company": "Tech Corp", "address_line_1": "456 Oak Avenue", "address_line_2": "Suite 200", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "US", "phone": "+1234567891"}', '{"first_name": "Jane", "last_name": "Smith", "company": "Tech Corp", "address_line_1": "456 Oak Avenue", "address_line_2": "Suite 200", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "US", "phone": "+1234567891"}', 'Express Shipping', 'paid', 'PayPal', NULL, NULL, now() - interval '3 days'),
('950e8400-e29b-41d4-a716-446655440003', 'ORD-20241217-0003', '750e8400-e29b-41d4-a716-446655440003', 'processing', 'mike.johnson@example.com', '+1234567892', 359.97, 32.40, 10.99, 50.00, 353.36, '{"first_name": "Mike", "last_name": "Johnson", "address_line_1": "789 Pine Road", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "US", "phone": "+1234567892"}', '{"first_name": "Mike", "last_name": "Johnson", "address_line_1": "789 Pine Road", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "US", "phone": "+1234567892"}', 'Standard Shipping', 'paid', 'Credit Card', '850e8400-e29b-41d4-a716-446655440002', 'SAVE50', now() - interval '2 days'),
('950e8400-e29b-41d4-a716-446655440004', 'ORD-20241218-0004', '750e8400-e29b-41d4-a716-446655440004', 'pending', 'sarah.wilson@example.com', '+1234567893', 109.98, 9.90, 0.00, 0.00, 119.88, '{"first_name": "Sarah", "last_name": "Wilson", "address_line_1": "321 Elm Street", "address_line_2": "Unit 5", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "US", "phone": "+1234567893"}', '{"first_name": "Sarah", "last_name": "Wilson", "address_line_1": "321 Elm Street", "address_line_2": "Unit 5", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "US", "phone": "+1234567893"}', 'Free Shipping', 'pending', 'Credit Card', '850e8400-e29b-41d4-a716-446655440004', 'FREESHIP', now() - interval '1 day');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, product_name, product_sku, variant_details, quantity, unit_price, total_price) VALUES
-- Order 1 items
('950e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'iPhone 15 Pro', 'IPH15PRO001', '{"Color": "Natural Titanium", "Storage": "128GB"}', 1, 999.00, 999.00),
-- Order 2 items
('950e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', 'MacBook Pro 14"', 'MBP14M3001', '{"Color": "Space Gray", "Memory": "8GB"}', 1, 1599.00, 1599.00),
-- Order 3 items
('950e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440007', 'Wireless Bluetooth Headphones', 'WBTH001', '{"Color": "Black"}', 1, 199.99, 199.99),
('950e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440008', 'Smart Fitness Watch', 'SFW001', '{"Color": "Black", "Band": "Sport Band"}', 1, 299.99, 299.99),
('950e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440005', 'Men''s Premium T-Shirt', 'MTSH001', '{"Size": "L", "Color": "Black"}', 2, 29.99, 59.98),
-- Order 4 items
('950e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440006', 'Women''s Summer Dress', 'WSDR001', '{"Size": "M", "Color": "White"}', 1, 79.99, 79.99),
('950e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440005', 'Men''s Premium T-Shirt', 'MTSH001', '{"Size": "M", "Color": "Navy"}', 1, 29.99, 29.99);

-- Insert Cart Items (current shopping carts)
INSERT INTO cart_items (customer_id, session_id, product_id, variant_details, quantity) VALUES
('750e8400-e29b-41d4-a716-446655440001', NULL, '650e8400-e29b-41d4-a716-446655440004', NULL, 1),
('750e8400-e29b-41d4-a716-446655440002', NULL, '650e8400-e29b-41d4-a716-446655440002', '{"Color": "Titanium Gray", "Storage": "256GB"}', 1),
('750e8400-e29b-41d4-a716-446655440003', NULL, '650e8400-e29b-41d4-a716-446655440010', NULL, 1),
('750e8400-e29b-41d4-a716-446655440003', NULL, '650e8400-e29b-41d4-a716-446655440005', '{"Size": "L", "Color": "White"}', 2),
-- Guest cart items (using session_id)
(NULL, 'guest-session-123456', '650e8400-e29b-41d4-a716-446655440007', '{"Color": "White"}', 1),
(NULL, 'guest-session-789012', '650e8400-e29b-41d4-a716-446655440006', '{"Size": "S", "Color": "Floral Blue"}', 1);

-- Insert Wishlist Items
INSERT INTO wishlists (customer_id, product_id) VALUES
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'),
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003'),
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008'),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001'),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440007'),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440009'),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440006'),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440010'),
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440001'),
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440004');

-- Insert Product Reviews
INSERT INTO reviews (product_id, customer_id, order_id, rating, title, comment, is_verified_purchase, is_approved) VALUES
('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440001', 5, 'Amazing phone!', 'The iPhone 15 Pro exceeded my expectations. The titanium build feels premium and the camera quality is outstanding. The A17 Pro chip makes everything super smooth. Highly recommended!', true, true),
('650e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440002', 5, 'Perfect for work', 'This MacBook Pro is exactly what I needed for my development work. The M3 chip handles everything I throw at it, and the display is gorgeous. Battery life is excellent too.', true, true),
('650e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440003', 4, 'Great sound quality', 'These headphones have excellent sound quality and the noise cancellation works well. The only minor issue is that they can get a bit uncomfortable during very long sessions.', true, true),
('650e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440003', 4, 'Good fitness tracker', 'Tracks my workouts well and the heart rate monitor seems accurate. The battery life is as advertised. The app could use some improvements but overall happy with the purchase.', true, true),
('650e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440003', 5, 'Excellent quality t-shirt', 'The fabric quality is really good and the fit is perfect. Washed it several times and it still looks new. Will definitely buy more colors.', true, true),
('650e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440004', '950e8400-e29b-41d4-a716-446655440004', 5, 'Beautiful dress', 'Love this dress! The fabric is light and breathable, perfect for summer. The fit is flattering and I get compliments every time I wear it.', true, true),
-- Additional reviews from other customers
('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440005', NULL, 4, 'Great but expensive', 'The phone is fantastic with great cameras and performance. However, it is quite expensive. If you can afford it, it''s worth it.', false, true),
('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', NULL, 5, 'Samsung does it again', 'The Galaxy S24 Ultra is incredible. The S Pen functionality is amazing and the camera zoom is out of this world. Best Android phone I''ve owned.', false, true),
('650e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440005', NULL, 5, 'Perfect for daily use', 'Use these headphones for work calls and music. The noise cancellation is excellent and the battery lasts all day. Very comfortable too.', false, true),
('650e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440002', NULL, 4, 'Makes great coffee', 'This coffee maker produces consistently good coffee. The programmable features are handy for morning routines. Easy to clean and maintain.', false, true);

-- Insert Admin Users
INSERT INTO admin_users (id, email, password_hash, first_name, last_name, role, is_active) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'admin@yourstore.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'super_admin', true),
('a50e8400-e29b-41d4-a716-446655440002', 'manager@yourstore.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Store', 'Manager', 'manager', true),
('a50e8400-e29b-41d4-a716-446655440003', 'support@yourstore.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Customer', 'Support', 'admin', true);

-- Update some order timestamps for variety
UPDATE orders SET 
  shipped_at = created_at + interval '1 day',
  delivered_at = created_at + interval '4 days'
WHERE status = 'delivered';

UPDATE orders SET 
  shipped_at = created_at + interval '1 day'
WHERE status = 'shipped';

-- Add some helpful counts and ensure referential integrity
UPDATE products SET updated_at = now() WHERE id IS NOT NULL;
UPDATE categories SET updated_at = now() WHERE id IS NOT NULL;

-- Final verification queries (optional - you can run these to check data)
-- SELECT 'Categories' as table_name, count(*) as count FROM categories
-- UNION ALL
-- SELECT 'Products', count(*) FROM products
-- UNION ALL  
-- SELECT 'Product Images', count(*) FROM product_images
-- UNION ALL
-- SELECT 'Product Variants', count(*) FROM product_variants
-- UNION ALL
-- SELECT 'Inventory', count(*) FROM inventory
-- UNION ALL
-- SELECT 'Customers', count(*) FROM customers
-- UNION ALL
-- SELECT 'Addresses', count(*) FROM addresses
-- UNION ALL
-- SELECT 'Coupons', count(*) FROM coupons
-- UNION ALL
-- SELECT 'Orders', count(*) FROM orders
-- UNION ALL
-- SELECT 'Order Items', count(*) FROM order_items
-- UNION ALL
-- SELECT 'Cart Items', count(*) FROM cart_items
-- UNION ALL
-- SELECT 'Wishlists', count(*) FROM wishlists
-- UNION ALL
-- SELECT 'Reviews', count(*) FROM reviews
-- UNION ALL
-- SELECT 'Admin Users', count(*) FROM admin_users;


-- Now create comprehensive SQL insert statements to populate the database with realistic sample data. I will put this data in the sql editor of supabase. And update the hard code samples data in the project to reflect the values of the database. This will give me a good foundation to test the frontend.