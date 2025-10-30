import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { ArrowLeftIcon3D, HelmIcon3D } from './icons';

interface LoginScreenProps {
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack }) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let loginEmail = account.trim();
    if (loginEmail.toLowerCase() === 'admin') {
        loginEmail = 'admin@onthihanghai.local';
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      setError('Tài khoản hoặc mật khẩu không chính xác.');
    }
    // onAuthStateChange in App.tsx will handle successful login
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-slide-in-right">
       <div className="relative text-center mb-10">
        <button 
          onClick={onBack} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700/50 p-3 rounded-full shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-110"
          aria-label="Quay lại"
        >
            <ArrowLeftIcon3D className="h-10 w-10" />
        </button>
        <HelmIcon3D className="h-20 w-20 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Đăng nhập</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
          Truy cập vào hệ thống quản lý học tập.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleLogin}>
          {error && <p className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-center">{error}</p>}
          
          <div className="mb-4">
            <label htmlFor="account" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tài khoản
            </label>
            <input
              id="account"
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="Nhập tài khoản hoặc email"
              className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password"  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;