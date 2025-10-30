import React from 'react';
import type { UserProfile } from '../types';
import { BookOpenIcon3D, PracticeIcon3D } from './icons';

interface DashboardProps {
    userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
    const isAdmin = userProfile.role === 'admin';

    const handleDisabledClick = () => {
        alert('Tài khoản của anh/chị không có quyền truy cập chức năng này.');
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 animate-slide-in-right">
             <div className="relative text-center mb-10">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                    Bảng điều khiển
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
                    Chào mừng trở lại, {userProfile.email}!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quản lý lớp học */}
                <button
                    className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
                >
                    <BookOpenIcon3D className="h-16 w-16 mx-auto text-indigo-500 mb-4 transition-transform group-hover:scale-110" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Quản lý Lớp học</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Tạo, xem và quản lý các lớp học của anh/chị.</p>
                </button>

                {/* Quản lý Học viên */}
                <button
                    className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center hover:bg-sky-50 dark:hover:bg-sky-900/50 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
                >
                    <PracticeIcon3D className="h-16 w-16 mx-auto text-sky-500 mb-4 transition-transform group-hover:scale-110" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Quản lý Học viên</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Thêm, xóa và xem tiến độ của học viên trong lớp.</p>
                </button>

                {/* Quản lý Giáo viên (Admin only) */}
                <button
                    onClick={!isAdmin ? handleDisabledClick : undefined}
                    disabled={!isAdmin}
                    className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center transition-all duration-300 focus:outline-none 
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                               hover:bg-teal-50 dark:hover:bg-teal-900/50 transform hover:-translate-y-2 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
                >
                    <PracticeIcon3D className="h-16 w-16 mx-auto text-teal-500 mb-4 transition-transform group-hover:scale-110" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Quản lý Giáo viên</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Tạo và quản lý tài khoản cho các giáo viên khác (chỉ Admin).</p>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
