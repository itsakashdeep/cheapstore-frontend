'use client';

import React, { useState } from 'react';
import API from '@/lib/api';
import { Sparkles, PackagePlus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    clearancePrice: '',
    stockQuantity: '',
    minOrderQuantity: '1',
    expiryDate: '',
    batchNumber: '',
    category: 'General Grocery',
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🤖 AI Price Recommender Trigger
  const handleFetchAiPrice = async () => {
    if (!formData.originalPrice || !formData.expiryDate || !formData.stockQuantity) {
      setMessage({ type: 'error', text: 'Please enter Original Price, Expiry Date, and Stock Quantity first to get AI Price!' });
      return;
    }

    setAiLoading(true);
    setMessage(null);

    try {
      const res = await API.post('/products/recommend-price', {
        originalPrice: Number(formData.originalPrice),
        expiryDate: formData.expiryDate,
        stockQuantity: Number(formData.stockQuantity),
      });

      const { recommendedClearancePrice, aiReasoning } = res.data.data;
      
      // Form mein clearance price auto-fill kar do
      setFormData((prev) => ({ ...prev, clearancePrice: recommendedClearancePrice.toString() }));
      setAiReasoning(aiReasoning);
      setMessage({ type: 'success', text: 'AI Price applied successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to fetch AI price recommendation.' });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      await API.post('/products', {
        ...formData,
        originalPrice: Number(formData.originalPrice),
        clearancePrice: Number(formData.clearancePrice),
        stockQuantity: Number(formData.stockQuantity),
        minOrderQuantity: Number(formData.minOrderQuantity),
      });

      setMessage({ type: 'success', text: 'Near-expiry product listed successfully!' });
      setFormData({
        name: '', description: '', originalPrice: '', clearancePrice: '',
        stockQuantity: '', minOrderQuantity: '1', expiryDate: '', batchNumber: '', category: 'General Grocery'
      });
      setAiReasoning(null);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to list product.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <PackagePlus className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">List Near-Expiry Inventory</h1>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            placeholder="e.g. Amul Butter 500g Pack"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg outline-none text-gray-900"
              placeholder="275"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Volume (Units)</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg outline-none text-gray-900"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg outline-none text-gray-900"
            />
          </div>
        </div>

        {/* 🤖 AI Recommendation Box */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg my-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-semibold text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Smart AI Price Recommender
              </h3>
              <p className="text-xs text-purple-700 mt-0.5">
                Calculates optimal clearance price based on expiry date & stock volume.
              </p>
            </div>
            <button
              type="button"
              onClick={handleFetchAiPrice}
              disabled={aiLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {aiLoading ? 'Calculating...' : 'Suggest Clearance Price'}
            </button>
          </div>

          {aiReasoning && (
            <p className="text-xs text-purple-800 bg-purple-100/60 p-2.5 rounded mt-3 border border-purple-200">
              💡 <strong>AI Insights:</strong> {aiReasoning}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clearance Selling Price (₹)</label>
            <input
              type="number"
              name="clearancePrice"
              value={formData.clearancePrice}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg font-bold text-green-700 outline-none"
              placeholder="Auto-filled by AI or set manually"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Quantity (MOQ)</label>
            <input
              type="number"
              name="minOrderQuantity"
              value={formData.minOrderQuantity}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg outline-none text-gray-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all mt-6"
        >
          Publish Listing
        </button>
      </form>
    </div>
  );
}