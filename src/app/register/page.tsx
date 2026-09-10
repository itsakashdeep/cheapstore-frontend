'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Fixed: Changed 'link' to 'next/link'
import { UserPlus, AlertCircle, CheckCircle2, Sparkles, ShieldCheck, Store } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'vendor',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-100">
        
        {/* LEFT COLUMN: Branding & Visual Banner */}
        <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 bg-blue-500/20 backdrop-blur rounded-lg border border-blue-400/30">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </span>
              <span className="font-bold text-xl tracking-wide text-white">ClearanceX B2B</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-white">
              Join the B2B Inventory Clearance Network
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Register as a Vendor to automate dynamic clearance pricing or as a Retailer to source bulk near-expiry goods at huge discounts.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <Store className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-medium text-slate-200">Direct Vendor to Retailer B2B Connection</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-xs font-medium text-slate-200">Fast Registration & Instant Dashboard Access</span>
              </div>
            </div>
          </div>

          {/* Visual Banner */}
          <div className="relative z-10 mt-8 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSF87O_l8I6oll7Nr2hSCEW8vuzMEUa3UJXuq614Cl5rZt747fApPqZ9QZqTDK38I5qr5BTVKSJQuWt6Kg" 
              alt="B2B Wholesale Business" 
              className="w-full h-40 object-cover transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Register Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Create Your Account</h3>
            <p className="text-sm text-slate-500 mt-1">Start listing or buying near-expiry inventory in minutes.</p>
          </div>

          {error && (
            <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full / Business Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm transition-all"
                placeholder="Acme Wholesalers Pvt Ltd"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm transition-all"
                placeholder="vendor@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Select Account Type
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm bg-white transition-all"
              >
                <option value="vendor">Vendor (Sell Clearance Goods)</option>
                <option value="customer">Retailer / Customer (Buy Clearance Goods)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 mt-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? 'Creating Account...' : 'Register Now'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}