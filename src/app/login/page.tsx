'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, AlertCircle, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === 'vendor' || user.role === 'admin') {
        router.push('/vendor/add-product');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-100">
        
        {/* LEFT COLUMN: Modern Branding & Visual Banner */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 bg-blue-500/20 backdrop-blur rounded-lg border border-blue-400/30">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </span>
              <span className="font-bold text-xl tracking-wide text-white">ClearanceX B2B</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-white">
              AI-Powered Near-Expiry Clearance Platform
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Clear your near-expiry inventory 5x faster using dynamic smart pricing and instant retailer matching.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-xs font-medium text-slate-200">AI Dynamic Pricing for maximum ROI</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-medium text-slate-200">Verified Retailer & Vendor Network</span>
              </div>
            </div>
          </div>

          {/* Visual Illustration */}
          <div className="relative z-10 mt-8 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSF87O_l8I6oll7Nr2hSCEW8vuzMEUa3UJXuq614Cl5rZt747fApPqZ9QZqTDK38I5qr5BTVKSJQuWt6Kg" 
              alt="B2B Warehouse Management" 
              className="w-full h-40 object-cover transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Welcome Back</h3>
            <p className="text-sm text-slate-500 mt-1">Sign in to manage your inventory and AI recommendations.</p>
          </div>

          {error && (
            <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 transition-all text-sm"
                placeholder="vendor@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              New to ClearanceX?{' '}
              <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                Create Vendor Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}