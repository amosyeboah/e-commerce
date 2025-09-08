/*
  # Admin Settings and Reports Tables

  1. New Tables
    - `admin_settings` - Store configuration settings for the admin panel
    - `admin_activity_logs` - Track admin user activities for audit purposes
    - `system_notifications` - System-wide notifications and alerts
    - `report_schedules` - Scheduled report generation settings

  2. Security
    - Enable RLS on all admin tables
    - Restrict access to admin users only
    - Add comprehensive audit logging

  3. Features
    - Settings management with categories
    - Activity logging for compliance
    - Notification system for alerts
    - Report scheduling capabilities
*/

-- Admin settings table for storing configuration
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL, -- 'general', 'email', 'payment', 'shipping', etc.
  setting_key text NOT NULL,
  setting_value text,
  setting_type text DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
  description text,
  is_encrypted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  UNIQUE(category, setting_key)
);

-- Admin activity logs for audit trail
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  action text NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout', etc.
  resource_type text NOT NULL, -- 'product', 'order', 'customer', 'setting', etc.
  resource_id text, -- ID of the affected resource
  old_values jsonb, -- Previous values for updates
  new_values jsonb, -- New values for creates/updates
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- System notifications for admin alerts
CREATE TABLE IF NOT EXISTS system_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('info', 'warning', 'error', 'success')),
  title text NOT NULL,
  message text NOT NULL,
  data jsonb, -- Additional structured data
  is_read boolean DEFAULT false,
  is_global boolean DEFAULT false, -- Show to all admins
  admin_user_id uuid REFERENCES admin_users(id) ON DELETE CASCADE, -- Specific admin (if not global)
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Report schedules for automated reporting
CREATE TABLE IF NOT EXISTS report_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  report_type text NOT NULL CHECK (report_type IN ('sales', 'products', 'customers', 'inventory', 'overview')),
  frequency text NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  parameters jsonb, -- Report parameters like date range, filters, etc.
  email_recipients text[], -- Array of email addresses
  is_active boolean DEFAULT true,
  last_run_at timestamptz,
  next_run_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Email templates for automated emails
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  subject text NOT NULL,
  html_content text NOT NULL,
  text_content text,
  variables jsonb, -- Available template variables
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Website analytics data (simplified)
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  metric_type text NOT NULL, -- 'page_views', 'unique_visitors', 'bounce_rate', etc.
  metric_value numeric NOT NULL,
  additional_data jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(date, metric_type)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_settings_category ON admin_settings(category);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_user ON admin_activity_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at ON admin_activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_resource ON admin_activity_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_system_notifications_admin_user ON system_notifications(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_system_notifications_created_at ON system_notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_system_notifications_is_read ON system_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_report_schedules_next_run ON report_schedules(next_run_at);
CREATE INDEX IF NOT EXISTS idx_analytics_data_date ON analytics_data(date);
CREATE INDEX IF NOT EXISTS idx_analytics_data_metric_type ON analytics_data(metric_type);

-- Enable Row Level Security
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;

-- Admin settings policies (only admins can access)
CREATE POLICY "Only admins can view settings"
  ON admin_settings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Only admins can manage settings"
  ON admin_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Activity logs policies (only admins can view, system can insert)
CREATE POLICY "Only admins can view activity logs"
  ON admin_activity_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "System can insert activity logs"
  ON admin_activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (admin_user_id::text = auth.uid()::text);

-- System notifications policies
CREATE POLICY "Admins can view their notifications"
  ON system_notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    ) AND (
      is_global = true OR admin_user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Admins can manage notifications"
  ON system_notifications
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Report schedules policies
CREATE POLICY "Admins can manage report schedules"
  ON report_schedules
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Email templates policies
CREATE POLICY "Admins can manage email templates"
  ON email_templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Analytics data policies
CREATE POLICY "Admins can view analytics data"
  ON analytics_data
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id::text = auth.uid()::text 
      AND admin_users.is_active = true
    )
  );

-- Functions for updating timestamps
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_report_schedules_updated_at BEFORE UPDATE ON report_schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log admin activities
CREATE OR REPLACE FUNCTION log_admin_activity(
  p_admin_user_id uuid,
  p_action text,
  p_resource_type text,
  p_resource_id text DEFAULT NULL,
  p_old_values jsonb DEFAULT NULL,
  p_new_values jsonb DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO admin_activity_logs (
    admin_user_id,
    action,
    resource_type,
    resource_id,
    old_values,
    new_values,
    ip_address,
    user_agent
  ) VALUES (
    p_admin_user_id,
    p_action,
    p_resource_type,
    p_resource_id,
    p_old_values,
    p_new_values,
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create system notification
CREATE OR REPLACE FUNCTION create_system_notification(
  p_type text,
  p_title text,
  p_message text,
  p_data jsonb DEFAULT NULL,
  p_is_global boolean DEFAULT false,
  p_admin_user_id uuid DEFAULT NULL,
  p_expires_at timestamptz DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO system_notifications (
    type,
    title,
    message,
    data,
    is_global,
    admin_user_id,
    expires_at
  ) VALUES (
    p_type,
    p_title,
    p_message,
    p_data,
    p_is_global,
    p_admin_user_id,
    p_expires_at
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default admin settings
INSERT INTO admin_settings (category, setting_key, setting_value, setting_type, description) VALUES
-- General Settings
('general', 'store_name', 'EliteShop', 'string', 'Store name displayed throughout the site'),
('general', 'store_description', 'Your premier destination for quality products', 'string', 'Store description for SEO and marketing'),
('general', 'store_email', 'support@eliteshop.com', 'string', 'Primary store contact email'),
('general', 'store_phone', '+1 (555) 123-4567', 'string', 'Store contact phone number'),
('general', 'currency', 'USD', 'string', 'Default store currency'),
('general', 'timezone', 'America/New_York', 'string', 'Store timezone'),

-- Email Settings
('email', 'smtp_host', 'smtp.gmail.com', 'string', 'SMTP server hostname'),
('email', 'smtp_port', '587', 'number', 'SMTP server port'),
('email', 'smtp_username', 'noreply@eliteshop.com', 'string', 'SMTP username'),
('email', 'email_from_name', 'EliteShop', 'string', 'Default sender name for emails'),
('email', 'email_from_address', 'noreply@eliteshop.com', 'string', 'Default sender email address'),

-- Shipping Settings
('shipping', 'free_shipping_threshold', '50.00', 'number', 'Minimum order amount for free shipping'),
('shipping', 'standard_shipping_rate', '9.99', 'number', 'Standard shipping rate'),
('shipping', 'express_shipping_rate', '19.99', 'number', 'Express shipping rate'),
('shipping', 'enable_international_shipping', 'true', 'boolean', 'Enable international shipping'),

-- Tax Settings
('tax', 'tax_rate', '10.0', 'number', 'Default tax rate percentage'),
('tax', 'enable_tax', 'true', 'boolean', 'Enable tax calculations'),

-- Notification Settings
('notifications', 'email_order_confirmation', 'true', 'boolean', 'Send order confirmation emails'),
('notifications', 'email_shipping_updates', 'true', 'boolean', 'Send shipping update emails'),
('notifications', 'email_low_stock', 'true', 'boolean', 'Send low stock alert emails'),
('notifications', 'low_stock_threshold', '5', 'number', 'Low stock alert threshold'),

-- Security Settings
('security', 'session_timeout', '60', 'number', 'Session timeout in minutes'),
('security', 'max_login_attempts', '5', 'number', 'Maximum login attempts before lockout'),
('security', 'enable_two_factor', 'false', 'boolean', 'Enable two-factor authentication')

ON CONFLICT (category, setting_key) DO NOTHING;

-- Insert default email templates
INSERT INTO email_templates (name, subject, html_content, text_content, variables) VALUES
('order_confirmation', 'Order Confirmation - {{order_number}}', 
 '<h1>Thank you for your order!</h1><p>Your order {{order_number}} has been confirmed.</p>', 
 'Thank you for your order! Your order {{order_number}} has been confirmed.',
 '["order_number", "customer_name", "order_total", "order_items"]'),
 
('shipping_notification', 'Your order {{order_number}} has shipped!', 
 '<h1>Your order is on the way!</h1><p>Tracking number: {{tracking_number}}</p>', 
 'Your order is on the way! Tracking number: {{tracking_number}}',
 '["order_number", "tracking_number", "customer_name", "estimated_delivery"]'),
 
('low_stock_alert', 'Low Stock Alert - {{product_name}}', 
 '<h1>Low Stock Alert</h1><p>{{product_name}} is running low on stock ({{current_stock}} remaining).</p>', 
 'Low Stock Alert: {{product_name}} is running low on stock ({{current_stock}} remaining).',
 '["product_name", "current_stock", "product_sku"]')

ON CONFLICT (name) DO NOTHING;