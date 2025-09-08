import React, { useState } from 'react';
import { 
  Save, 
  Upload, 
  Globe, 
  Mail, 
  Shield, 
  CreditCard, 
  Truck, 
  Bell,
  Eye,
  EyeOff,
  Check,
  AlertCircle
} from 'lucide-react';

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'EliteShop',
    storeDescription: 'Your premier destination for quality products',
    storeEmail: 'support@eliteshop.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Commerce St, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@eliteshop.com',
    smtpPassword: '',
    emailFromName: 'EliteShop',
    emailFromAddress: 'noreply@eliteshop.com',
    
    // Payment Settings
    stripePublishableKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalClientId: '',
    paypalClientSecret: '',
    enableStripe: true,
    enablePaypal: false,
    
    // Shipping Settings
    freeShippingThreshold: '50.00',
    standardShippingRate: '9.99',
    expressShippingRate: '19.99',
    internationalShippingRate: '29.99',
    enableInternationalShipping: true,
    
    // Tax Settings
    taxRate: '10.0',
    enableTax: true,
    taxIncluded: false,
    
    // Notification Settings
    emailOrderConfirmation: true,
    emailShippingUpdates: true,
    emailLowStock: true,
    emailNewReviews: true,
    lowStockThreshold: '5',
    
    // Security Settings
    enableTwoFactor: false,
    sessionTimeout: '60',
    maxLoginAttempts: '5',
    enableCaptcha: false,
    
    // SEO Settings
    metaTitle: 'EliteShop - Premium Products Online',
    metaDescription: 'Discover premium products with unmatched quality and style at EliteShop.',
    metaKeywords: 'ecommerce, premium products, online shopping',
    googleAnalyticsId: '',
    facebookPixelId: '',
    
    // Social Media
    facebookUrl: 'https://facebook.com/eliteshop',
    twitterUrl: 'https://twitter.com/eliteshop',
    instagramUrl: 'https://instagram.com/eliteshop',
    linkedinUrl: 'https://linkedin.com/company/eliteshop'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your store configuration and preferences</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className={`mr-3 h-5 w-5 ${
                          activeTab === tab.id ? 'text-blue-700' : 'text-gray-400'
                        }`} />
                        {tab.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Name
                      </label>
                      <input
                        type="text"
                        name="storeName"
                        value={settings.storeName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Email
                      </label>
                      <input
                        type="email"
                        name="storeEmail"
                        value={settings.storeEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Phone
                      </label>
                      <input
                        type="tel"
                        name="storePhone"
                        value={settings.storePhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={settings.currency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Description
                      </label>
                      <textarea
                        name="storeDescription"
                        value={settings.storeDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Address
                      </label>
                      <textarea
                        name="storeAddress"
                        value={settings.storeAddress}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Email Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        name="smtpHost"
                        value={settings.smtpHost}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        name="smtpPort"
                        value={settings.smtpPort}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        name="smtpUsername"
                        value={settings.smtpUsername}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKey ? "text" : "password"}
                          name="smtpPassword"
                          value={settings.smtpPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                      </label>
                      <input
                        type="text"
                        name="emailFromName"
                        value={settings.emailFromName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Address
                      </label>
                      <input
                        type="email"
                        name="emailFromAddress"
                        value={settings.emailFromAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Settings</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Stripe</h3>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="enableStripe"
                            checked={settings.enableStripe}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Enable Stripe</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Publishable Key
                          </label>
                          <input
                            type="text"
                            name="stripePublishableKey"
                            value={settings.stripePublishableKey}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Secret Key
                          </label>
                          <input
                            type="password"
                            name="stripeSecretKey"
                            value={settings.stripeSecretKey}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="enablePaypal"
                            checked={settings.enablePaypal}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Enable PayPal</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client ID
                          </label>
                          <input
                            type="text"
                            name="paypalClientId"
                            value={settings.paypalClientId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client Secret
                          </label>
                          <input
                            type="password"
                            name="paypalClientSecret"
                            value={settings.paypalClientSecret}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Free Shipping Threshold ($)
                      </label>
                      <input
                        type="number"
                        name="freeShippingThreshold"
                        value={settings.freeShippingThreshold}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standard Shipping Rate ($)
                      </label>
                      <input
                        type="number"
                        name="standardShippingRate"
                        value={settings.standardShippingRate}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Express Shipping Rate ($)
                      </label>
                      <input
                        type="number"
                        name="expressShippingRate"
                        value={settings.expressShippingRate}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        International Shipping Rate ($)
                      </label>
                      <input
                        type="number"
                        name="internationalShippingRate"
                        value={settings.internationalShippingRate}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="enableInternationalShipping"
                          checked={settings.enableInternationalShipping}
                          onChange={handleInputChange}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Enable International Shipping</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="emailOrderConfirmation"
                            checked={settings.emailOrderConfirmation}
                            onChange={handleInputChange}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Send order confirmation emails</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="emailShippingUpdates"
                            checked={settings.emailShippingUpdates}
                            onChange={handleInputChange}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Send shipping update emails</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="emailLowStock"
                            checked={settings.emailLowStock}
                            onChange={handleInputChange}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Send low stock alerts</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="emailNewReviews"
                            checked={settings.emailNewReviews}
                            onChange={handleInputChange}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Send new review notifications</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        name="lowStockThreshold"
                        value={settings.lowStockThreshold}
                        onChange={handleInputChange}
                        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          name="sessionTimeout"
                          value={settings.sessionTimeout}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Login Attempts
                        </label>
                        <input
                          type="number"
                          name="maxLoginAttempts"
                          value={settings.maxLoginAttempts}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="enableTwoFactor"
                          checked={settings.enableTwoFactor}
                          onChange={handleInputChange}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="enableCaptcha"
                          checked={settings.enableCaptcha}
                          onChange={handleInputChange}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Enable CAPTCHA on login</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}