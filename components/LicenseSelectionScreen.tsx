import React from 'react';
import type { License } from '../types';
import { BookOpenIcon, ChevronRightIcon, ArrowLeftIcon } from './icons';

interface LicenseSelectionScreenProps {
  licenses: License[];
  onSelect: (license: License) => void;
  onBack: () => void;
}

const LicenseSelectionScreen: React.FC<LicenseSelectionScreenProps> = ({ licenses, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-slide-in-right">
      <div className="relative text-center mb-10">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300">
            <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <BookOpenIcon className="h-16 w-16 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Chọn Hạng Bằng</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">Anh/chị vui lòng chọn hạng bằng muốn ôn tập và thi thử.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="space-y-3">
          {licenses.map(license => (
            <button
              key={license.id}
              onClick={() => onSelect(license)}
              className="w-full flex items-center justify-between p-5 bg-slate-100 dark:bg-slate-700 rounded-lg text-left hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 focus:outline-none"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{license.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{license.subjects.length} môn học</p>
              </div>
              <ChevronRightIcon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LicenseSelectionScreen;