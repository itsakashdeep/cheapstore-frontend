'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, PackagePlus, LogIn, UserPlus, LogOut, Store } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white tracking-wide">
          <span className="p-1.5 bg-blue-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </span>
          ClearanceX B2B
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 text-sm">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Store className="w-4 h-4" />
            Marketplace
          </Link>

          {user && (user.role === 'vendor' || user.role === 'admin') && (
            <Link 
              href="/vendor/add-product" 
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg font-medium transition-all"
            >
              <PackagePlus className="w-4 h-4" />
              Add Clearance Inventory
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
              <span className="text-slate-400 text-xs hidden sm:inline">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-xs font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link 
                href="/register" 
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}