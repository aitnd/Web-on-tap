import React, { useState } from 'react';
import { UserIcon, ArrowLeftIcon } from './icons';

interface NameInputScreenProps {
  onNameSubmit: (name: string) => void;
  onBack: () => void;
}

const NameInputScreen: React.FC<NameInputScreenProps> = ({ onNameSubmit, onBack }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      onNameSubmit(trimmedName);
    } else {
      onNameSubmit('Học viên');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-slide-in-right">
      <div className="relative text-center mb-10">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300">
            <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <UserIcon className="h-16 w-16 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Thông tin của anh/chị</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
          Nhập tên để tôi có thể lưu lại tiến độ học tập cho anh/chị.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tên của anh/chị
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A (có thể bỏ trống)"
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
            autoFocus
          />
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInputScreen;