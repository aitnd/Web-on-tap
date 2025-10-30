import React from 'react';
import type { UserProfile } from '../types';
import { UserIcon3D } from './icons';

interface HeaderProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const roleMap = {
    admin: 'Quản trị viên',
    teacher: 'Giáo viên',
    student: 'Học viên'
};


const Header: React.FC<HeaderProps> = ({ userProfile, onLogout }) => {
  return (
    <header className="w-full max-w-4xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl shadow-md mb-8 sticky top-4 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
            <UserIcon3D className="h-10 w-10 text-indigo-500" />
            <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">{userProfile.email}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full inline-block">{roleMap[userProfile.role]}</p>
            </div>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-colors duration-300"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
