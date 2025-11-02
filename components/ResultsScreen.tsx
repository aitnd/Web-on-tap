import React, { useState, useMemo } from 'react';
import type { Quiz, UserAnswers } from '../types';
import { CheckIcon3D, XIcon3D, TrophyIcon3D } from './icons';

interface ResultsScreenProps {
  quiz: Quiz;
  userAnswers: UserAnswers;
  score: number;
  onRetry: () => void;
  onBack: () => void;
  userName: string;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ quiz, userAnswers, score, onRetry, onBack, userName }) => {
  const [filter, setFilter] = useState<'all' | 'incorrect'>('all');
  const [completionDate] = useState(() => new Date());
  
  const totalQuestions = quiz.questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(completionDate);
  }, [completionDate]);

  const filteredQuestions = useMemo(() => {
    if (filter === 'incorrect') {
      return quiz.questions.filter(q => userAnswers[q.id] !== q.correctAnswerId);
    }
    return quiz.questions;
  }, [filter, quiz.questions, userAnswers]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-slide-in-right">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center mb-8">
            <TrophyIcon3D className="h-24 w-24 mx-auto text-yellow-400 dark:text-yellow-300 mb-4" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Kết quả Ôn tập</h1>

            <div className="my-4 text-slate-600 dark:text-slate-300">
                <p className="text-lg">Học viên: <span className="font-bold text-indigo-500 dark:text-indigo-400">{userName}</span></p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Hoàn thành lúc: {formattedDate}</p>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/50 inline-block p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4">
                <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-300">
                    {score} / {totalQuestions}
                </p>
                <p className="text-2xl font-semibold text-indigo-500 dark:text-indigo-400 mt-1">({percentage}%)</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Xem lại bài làm</h2>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                      Tất cả
                  </button>
                  <button onClick={() => setFilter('incorrect')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${filter === 'incorrect' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                      Chỉ câu sai ({quiz.questions.length - score})
                  </button>
              </div>
            </div>
            
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                {filteredQuestions.length > 0 ? filteredQuestions.map((question, index) => {
                    const userAnswerId = userAnswers[question.id];
                    const correctAnswerId = question.correctAnswerId;
                    
                    return (
                        <div key={question.id} className="p-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                            <p className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200">
                                <span className="mr-2">Câu {quiz.questions.findIndex(q => q.id === question.id) + 1}:</span>
                                {question.text}
                            </p>
                            <div className="space-y-2">
                                {question.answers.map(answer => {
                                    const isUserAnswer = answer.id === userAnswerId;
                                    const isCorrectAnswer = answer.id === correctAnswerId;
                                    
                                    let itemClass = "flex items-center p-3 rounded-md text-sm ";
                                    if(isCorrectAnswer) {
                                        itemClass += "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300";
                                    } else if(isUserAnswer) {
                                        itemClass += "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300";
                                    } else {
                                        itemClass += "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400";
                                    }

                                    return (
                                        <div key={answer.id} className={itemClass}>
                                            {isCorrectAnswer ? <CheckIcon3D className="h-5 w-5 mr-3 text-green-500" /> : isUserAnswer ? <XIcon3D className="h-5 w-5 mr-3 text-red-500" /> : <div className="w-5 h-5 mr-3"></div>}
                                            <span>{answer.text}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                }) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-8">Tuyệt vời! Anh/chị đã trả lời đúng tất cả các câu hỏi.</p>
                )}
            </div>
        </div>
        
        <div className="text-center mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
              onClick={onBack}
              className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 transform hover:scale-105"
          >
              Các môn khác
          </button>
          <button
              onClick={onRetry}
              className="w-full sm:w-auto bg-slate-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800 transition-colors duration-300"
          >
              Làm lại
          </button>
        </div>
    </div>
  );
};

export default ResultsScreen;