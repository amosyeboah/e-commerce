import React, { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Eye, Edit, Mail, Phone, MapPin, Calendar, Trash2, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Tables } from '../../types/database.types';

type Customer = Tables<'customers'>;

type CustomerForm = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  date_of_birth: string | null; // yyyy-mm-dd
  gender: Customer['gender'];
  is_active: boolean | null;
  email_verified: boolean | null;
  accepts_marketing: boolean | null;
};

const emptyForm: CustomerForm = {
  email: '',
  first_name: null,
  last_name: null,
  phone: null,
  date_of_birth: null,
  gender: null,
  is_active: true,
  email_verified: false,
  accepts_marketing: false,
};

export function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // '' | 'active' | 'inactive'
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState<CustomerForm>(emptyForm);

  // Fetch customers with server-side filters
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from('customers').select('*').order('created_at', { ascending: false });

        if (searchQuery.trim()) {
          const term = `%${searchQuery.trim()}%`;
          query = query.or(
            `email.ilike.${term},first_name.ilike.${term},last_name.ilike.${term},phone.ilike.${term}`
          );
        }

        if (filterStatus) {
          query = query.eq('is_active', filterStatus === 'active');
        }

        const { data, error } = await query;
        if (error) throw error;
        setCustomers(data || []);

        // Keep selection in sync
        if (selectedCustomer) {
          const updated = (data || []).find((c) => c.id === selectedCustomer.id) || null;
          setSelectedCustomer(updated);
        }
      } catch (e: any) {
        setError(e.message || 'Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [searchQuery, filterStatus]);

  const openCreate = () => {
    setEditingCustomer(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (c: Customer) => {
    setEditingCustomer(c);
    setForm({
      email: c.email,
      first_name: c.first_name,
      last_name: c.last_name,
      phone: c.phone,
      date_of_birth: c.date_of_birth,
      gender: c.gender,
      is_active: c.is_active,
      email_verified: c.email_verified,
      accepts_marketing: c.accepts_marketing,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  const handleChange = (field: keyof CustomerForm, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const saveCustomer = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!form.email) throw new Error('Email is required');

      if (editingCustomer) {
        const { error } = await supabase
          .from('customers')
          .update({
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
            date_of_birth: form.date_of_birth,
            gender: form.gender,
            is_active: form.is_active,
            email_verified: form.email_verified,
            accepts_marketing: form.accepts_marketing,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingCustomer.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('customers').insert([
          {
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
            date_of_birth: form.date_of_birth,
            gender: form.gender,
            is_active: form.is_active,
            email_verified: form.email_verified,
            accepts_marketing: form.accepts_marketing,
          },
        ]);
        if (error) throw error;
      }

      // Refresh list
      const { data } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      setCustomers(data || []);

      closeForm();
    } catch (e: any) {
      setError(e.message || 'Failed to save customer');
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('customers').delete().eq('id', id);
      if (error) throw error;
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      if (selectedCustomer?.id === id) setSelectedCustomer(null);
    } catch (e: any) {
      setError(e.message || 'Failed to delete customer');
    } finally {
      setLoading(false);
    }
  };

  const filteredStatusLabel = useMemo(() => (filterStatus === 'active' ? 'Active' : filterStatus === 'inactive' ? 'Inactive' : 'All Status'), [
    filterStatus,
  ]);

  const getStatusColor = (isActive: boolean | null | undefined) => {
    if (isActive) return 'bg-green-100 text-green-800';
    if (isActive === false) return 'bg-gray-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
  };

  const fullName = (c: Customer) => [c.first_name, c.last_name].filter(Boolean).join(' ') || c.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600 mt-2">Manage and view customer information</p>
          </div>
          <button
            onClick={openCreate}
            className="mt-4 lg:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Customer
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700">{error}</div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers (name, email, phone)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div></div>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customers List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className={`hover:bg-gray-50 cursor-pointer ${selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                              {fullName(customer).charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{fullName(customer)}</div>
                              <div className="text-sm text-gray-500">ID: {customer.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.phone || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.is_active)}`}>
                            {customer.is_active ? 'active' : 'inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCustomer(customer);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEdit(customer);
                              }}
                              className="text-green-600 hover:text-green-900 p-1 rounded"
                              title="Edit Customer"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCustomer(customer.id);
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded"
                              title="Delete Customer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {loading && (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              )}
              {!loading && customers.length === 0 && (
                <div className="p-8 text-center text-gray-500">No customers found</div>
              )}
            </div>
          </div>

          {/* Customer Details */}
          <div className="lg:col-span-1">
            {selectedCustomer ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-2xl text-gray-600">
                    {fullName(selectedCustomer).charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{fullName(selectedCustomer)}</h2>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCustomer.is_active)}`}>
                    {selectedCustomer.is_active ? 'active' : 'inactive'}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-gray-600">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-gray-600">{selectedCustomer.phone || '—'}</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                        <span className="text-gray-400">No address stored</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-gray-600">Joined {selectedCustomer.created_at?.slice(0, 10)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => (window.location.href = `mailto:${selectedCustomer.email}`)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => selectedCustomer.phone && (window.location.href = `tel:${selectedCustomer.phone}`)}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Select a customer to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="customer@example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">First name</label>
                    <input
                      type="text"
                      value={form.first_name ?? ''}
                      onChange={(e) => handleChange('first_name', e.target.value || null)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Last name</label>
                    <input
                      type="text"
                      value={form.last_name ?? ''}
                      onChange={(e) => handleChange('last_name', e.target.value || null)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone ?? ''}
                    onChange={(e) => handleChange('phone', e.target.value || null)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Date of birth</label>
                    <input
                      type="date"
                      value={form.date_of_birth ?? ''}
                      onChange={(e) => handleChange('date_of_birth', e.target.value || null)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Gender</label>
                    <select
                      value={form.gender ?? ''}
                      onChange={(e) => handleChange('gender', (e.target.value || null) as Customer['gender'])}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">—</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!form.is_active}
                      onChange={(e) => handleChange('is_active', e.target.checked)}
                    />
                    <span>Active</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!form.email_verified}
                      onChange={(e) => handleChange('email_verified', e.target.checked)}
                    />
                    <span>Email verified</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!form.accepts_marketing}
                      onChange={(e) => handleChange('accepts_marketing', e.target.checked)}
                    />
                    <span>Marketing</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={closeForm} className="px-4 py-2 rounded border">Cancel</button>
                <button
                  onClick={saveCustomer}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={loading}
                >
                  {editingCustomer ? 'Save Changes' : 'Create Customer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}