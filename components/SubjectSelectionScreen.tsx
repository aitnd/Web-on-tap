import React from 'react';
import type { Subject, UserProgressData } from '../types';
import { ArrowLeftIcon, ChevronRightIcon } from './icons';

interface SubjectSelectionScreenProps {
  subjects: Subject[];
  progress: UserProgressData;
  onSelect: (subject: Subject) => void;
  onBack: () => void;
}

const SubjectSelectionScreen: React.FC<SubjectSelectionScreenProps> = ({ subjects, progress, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-slide-in-right">
      <div className="relative text-center mb-10">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300">
            <ArrowLeftIcon className="h-6 w-6" />
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
                        <p className="text-slate-600 dark:text-slate-300">
                            Lần cuối: <span className="font-semibold text-blue-600 dark:text-blue-400">{subjectProgress.lastScore}/{subject.questions.length}</span>
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">
                            Cao nhất: <span className="font-semibold text-green-600 dark:text-green-400">{subjectProgress.highScore}/{subject.questions.length}</span>
                        </p>
                    </div>
                  )}
                  <ChevronRightIcon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
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