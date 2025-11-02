import React from 'react';
import type { Subject, UserProgressData } from '../types';
import { ArrowLeftIcon3D, ChevronRightIcon3D } from './icons';

interface SubjectSelectionScreenProps {
  subjects: Subject[];
  progress: UserProgressData;
  onSelect: (subject: Subject) => void;
  onBack: () => void;
}

const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `(${day}/${month} ${hours}:${minutes})`;
};

const SubjectSelectionScreen: React.FC<SubjectSelectionScreenProps> = ({ subjects, progress, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-slide-in-right">
      <div className="relative text-center mb-10">
        <button 
          onClick={onBack} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700/50 p-3 rounded-full shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-110"
          aria-label="Quay lại"
        >
            <ArrowLeftIcon3D className="h-10 w-10" />
        </button>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Chọn Môn học</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">Chọn một môn để bắt đầu ôn tập.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="space-y-3">
          {subjects.map(subject => {
            const subjectProgress = progress[subject.id];
            const hasProgress = subjectProgress && subjectProgress.lastScore !== null;
            
            return (
              <button
                key={subject.id}
                onClick={() => onSelect(subject)}
                className="w-full flex items-center justify-between p-5 bg-slate-100 dark:bg-slate-700 rounded-lg text-left hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 focus:outline-none"
              >
                <div>
                  <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{subject.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{subject.questions.length} câu hỏi</p>
                </div>
                <div className="flex items-center gap-4">
                  {hasProgress && (
                    <div className="text-right text-sm">
                        <p className="text-slate-600 dark:text-slate-300 flex items-center justify-end">
                            <span>Lần cuối:</span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400 ml-1">{subjectProgress.lastScore}/{subject.questions.length}</span>
                            {subjectProgress.lastScoreTimestamp && <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">{formatDate(subjectProgress.lastScoreTimestamp)}</span>}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center justify-end mt-0.5">
                            <span>Cao nhất:</span>
                            <span className="font-semibold text-green-600 dark:text-green-400 ml-1">{subjectProgress.highScore}/{subject.questions.length}</span>
                            {subjectProgress.highScoreTimestamp && <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">{formatDate(subjectProgress.highScoreTimestamp)}</span>}
                        </p>
                    </div>
                  )}
                  <ChevronRightIcon3D className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelectionScreen;