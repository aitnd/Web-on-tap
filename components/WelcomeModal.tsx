import React from 'react';
import { HelmIcon3D, InformationCircleIcon } from './icons';

interface WelcomeModalProps {
  onStart: () => void;
  onLoginClick: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart, onLoginClick }) => {
  return (
    <div className="text-center p-4 animate-slide-in-right">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto relative">
        <HelmIcon3D className="h-24 w-24 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Ôn Thi Hàng Hải
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Chào mừng anh/chị đã đến với ứng dụng chuyên ôn thi các chứng chỉ ngành hàng hải. Cùng nhau chinh phục mọi kỳ thi nhé!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-indigo-600 text-white font-bold text-lg py-4 px-10 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 transform hover:scale-105"
          >
            Bắt đầu (Khách)
          </button>
           <button
            onClick={onLoginClick}
            className="w-full sm:w-auto bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold text-lg py-4 px-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800 transition-all duration-300"
          >
            Đăng nhập
          </button>
        </div>
        <div className="mt-8 text-sm text-left text-slate-500 dark:text-slate-400">
            <details className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg cursor-pointer">
                <summary className="font-semibold flex items-center gap-2">
                    <InformationCircleIcon className="h-5 w-5"/>
                    Lịch sử cập nhật (v2.9.3)
                </summary>
                <div className="mt-3 pl-2 border-l-2 border-slate-300 dark:border-slate-600 max-h-[30vh] overflow-y-auto">
                    <p className="font-semibold text-slate-600 dark:text-slate-300"><strong>Cập nhật phiên bản v2.9.3:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Cải thiện giao diện Thi thử: Đổi màu đánh dấu các câu đã trả lời sang màu xanh lá cây nổi bật hơn, giúp anh dễ dàng theo dõi tiến độ làm bài.</li>
                    </ul>
                    {/* ... other changelog items */}
                </div>
            </details>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;