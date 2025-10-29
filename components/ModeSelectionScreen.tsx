import React from 'react';
import { BookOpenIcon, CpuChipIcon, ArrowPathIcon } from './icons';

interface ModeSelectionScreenProps {
  onModeSelect: (mode: 'practice' | 'exam') => void;
  licenseName: string;
  userName: string;
  onSwitchLicense: () => void;
}

const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onModeSelect, licenseName, userName, onSwitchLicense }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-slide-in-right">
      <div className="relative text-center mb-10">
         <div className="absolute right-0 top-0">
             <button 
                onClick={onSwitchLicense} 
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 py-1 px-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                title="Chọn lại hạng bằng"
            >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Chọn lại hạng bằng</span>
            </button>
         </div>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Chào anh/chị {userName}!
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
          Anh/chị đang học hạng bằng <span className="font-semibold text-indigo-500 dark:text-indigo-400">{licenseName}</span>.
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">
          Hãy chọn một chế độ để bắt đầu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practice Mode */}
        <button
          onClick={() => onModeSelect('practice')}
          className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
        >
          <BookOpenIcon className="h-16 w-16 mx-auto text-indigo-500 mb-4 transition-transform group-hover:scale-110" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Ôn tập</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Luyện tập từng môn để nắm vững kiến thức.</p>
        </button>

        {/* Exam Mode */}
        <button
          onClick={() => onModeSelect('exam')}
          className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center hover:bg-red-50 dark:hover:bg-red-900/50 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
        >
          <CpuChipIcon className="h-16 w-16 mx-auto text-red-500 mb-4 transition-transform group-hover:scale-110" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Thi thử</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Làm bài thi 30 câu ngẫu nhiên trong 30 phút.</p>
        </button>
      </div>
    </div>
  );
};

export default ModeSelectionScreen;