'use client';

import React, { useEffect, useState } from 'react';
import API from '@/lib/api';
import Link from 'next/link';
import { Sparkles, TrendingDown, Clock, ShieldCheck, ArrowRight, Package, Tag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  clearancePrice: number;
  stockQuantity: number;
  expiryDate: string;
  category: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      
      // Backend response structure array safety check
      const data = res.data;
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Expiry Tak Ke Din Calculate Karne Ke Liye
  const getDaysLeft = (expiryDateStr: string) => {
    const expiry = new Date(expiryDateStr);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🚀 HERO SECTION: Premium Dark Gradient */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" /> B2B Near-Expiry Clearance Hub
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Buy & Sell Bulk Goods Before Expiry <span className="text-blue-500">at Up to 70% Off</span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              Connect directly with verified FMCG vendors. Utilize AI dynamic pricing algorithms to liquidate inventory rapidly without loss.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a 
                href="#listings" 
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 text-sm"
              >
                Browse Active Deals
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                href="/vendor/add-product" 
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition-all text-sm"
              >
                List Inventory as Vendor
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: LIVE STATS CARD */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Live Clearance Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold mb-1">
                  <TrendingDown className="w-4 h-4" /> Avg Discount
                </div>
                <div className="text-2xl font-black text-white">45% - 70%</div>
                <p className="text-slate-400 text-[11px] mt-1">Guaranteed ROI for Retailers</p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1">
                  <Clock className="w-4 h-4" /> AI Recommender
                </div>
                <div className="text-2xl font-black text-white">Dynamic</div>
                <p className="text-slate-400 text-[11px] mt-1">Expiry-based auto pricing</p>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-blue-950/40 border border-blue-800/40 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-slate-300">
                100% Quality Inspected Batch Listings with Verified Expiry Dates.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 📦 MARKETPLACE LISTINGS SECTION */}
      <div id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Active Clearance Batches</h2>
            <p className="text-slate-500 text-sm mt-1">Sourced directly from verified distributors and FMCG brands</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 bg-slate-200 text-slate-700 rounded-full">
            {Array.isArray(products) ? products.length : 0} Products Available
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <Package className="w-10 h-10 animate-bounce mx-auto mb-3 text-blue-600" />
            <p className="text-sm font-medium">Fetching latest inventory deals...</p>
          </div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <Package className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Clearance Products Yet</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              Be the first vendor to list near-expiry inventory and leverage our AI Price Recommender!
            </p>
            <Link 
              href="/vendor/add-product" 
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => {
              const daysLeft = getDaysLeft(item.expiryDate);
              const discountPercent = Math.round(
                ((item.originalPrice - item.clearancePrice) / item.originalPrice) * 100
              );

              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div className="p-5">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {item.category || 'Grocery'}
                      </span>
                      
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        {daysLeft} Days Left
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">{item.description}</p>

                    {/* Price Section */}
                    <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">₹{item.clearancePrice}</span>
                        <span className="text-sm text-slate-400 line-through">₹{item.originalPrice}</span>
                        <span className="ml-auto text-xs font-extrabold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          {discountPercent}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Bulk Price / Unit</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                      <span>Available Stock: <strong>{item.stockQuantity} units</strong></span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <button className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                      <Tag className="w-3.5 h-3.5" /> Request Wholesale Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}