import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Quiz, UserAnswers } from '../types';
import { ClockIcon3D, ArrowLeftIcon3D } from './icons';

interface ExamQuizScreenProps {
  quiz: Quiz;
  onFinish: (answers: UserAnswers) => void;
  onBack: () => void;
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const ExamQuizScreen: React.FC<ExamQuizScreenProps> = ({ quiz, onFinish, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);

  const currentQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [quiz.questions, currentQuestionIndex]);

  // Use a ref to hold the latest userAnswers for callbacks,
  // preventing stale state issues in closures.
  const latestAnswers = useRef(userAnswers);
  useEffect(() => {
    latestAnswers.current = userAnswers;
  }, [userAnswers]);

  const handleFinishQuiz = useCallback(() => {
    const finalAnswers = latestAnswers.current; // Use the ref to get the latest answers
    const unansweredCount = quiz.questions.length - Object.keys(finalAnswers).length;
    const confirmationMessage = unansweredCount > 0 
        ? `Anh/chị vẫn còn ${unansweredCount} câu chưa trả lời. Anh/chị có chắc chắn muốn nộp bài không?`
        : 'Anh/chị đã hoàn thành tất cả các câu hỏi. Anh/chị có muốn nộp bài không?';
  
    if (window.confirm(confirmationMessage)) {
        onFinish(finalAnswers);
    }
  }, [quiz.questions.length, onFinish]);

  // Set up the countdown timer. Runs only once on mount.
  useEffect(() => {
      if (timeLeft === undefined) return;

      const intervalId = setInterval(() => {
          setTimeLeft(t => (t ? t - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once.

  // Stable onFinish using ref for autosubmit
  const stableOnFinish = useRef(onFinish);
  useEffect(() => {
      stableOnFinish.current = onFinish;
  }, [onFinish]);
  
  // Handle auto-submission when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      alert('Đã hết giờ làm bài! Hệ thống sẽ tự động nộp bài của anh/chị.');
      stableOnFinish.current(latestAnswers.current);
    }
  }, [timeLeft]);


  const handleAnswerSelect = (answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answerId }));
  };
  
  const examProgress = (Object.keys(userAnswers).length / quiz.questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 animate-slide-in-right">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4 relative">
                <button 
                  onClick={onBack} 
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700/50 p-3 rounded-full shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-110"
                  aria-label="Quay lại"
                >
                    <ArrowLeftIcon3D className="h-10 w-10" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-center flex-grow">{quiz.title}</h1>
                <button 
                    onClick={handleFinishQuiz}
                    className={'bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-300'}
                >
                    Nộp bài
                </button>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${examProgress}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                <span>Câu {currentQuestionIndex + 1} / {quiz.questions.length}</span>
                {timeLeft !== undefined && (
                    <div className="flex items-center font-semibold text-red-500 dark:text-red-400">
                        <ClockIcon3D className="h-5 w-5 mr-1" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                )}
            </div>
        </div>

        <div className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-6">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Danh sách câu hỏi:</h3>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((q, index) => {
              const isCurrent = index === currentQuestionIndex;
              const isQuestionAnswered = userAnswers[q.id] !== undefined;
              let btnClass = 'w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs transition-all duration-200 ';
              if (isCurrent) {
                btnClass += 'bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-400 dark:ring-indigo-500';
              } else if (isQuestionAnswered) {
                btnClass += 'bg-blue-200 dark:bg-blue-800/60 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700 hover:bg-blue-300';
              } else {
                btnClass += 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600';
              }
              return (
                <button key={q.id} className={btnClass} onClick={() => setCurrentQuestionIndex(index)}>
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-slate-900 dark:text-white">{currentQuestion.text}</h2>
          {currentQuestion.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img src={currentQuestion.image} alt="Câu hỏi" className="w-full h-auto object-cover max-h-80" />
            </div>
          )}
          
          <div className="space-y-3">
            {currentQuestion.answers.map(answer => {
              const isSelected = userAnswers[currentQuestion.id] === answer.id;
              let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-between text-lg';
              
              if(isSelected) {
                  buttonClass += ' bg-indigo-100 border-indigo-500 dark:bg-indigo-900/50 dark:border-indigo-500 ring-2 ring-indigo-500';
              } else {
                  buttonClass += ' bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600';
              }
              
              return (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  className={buttonClass}
                >
                  <span>{answer.text}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    disabled={currentQuestionIndex === 0}
                    className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                    Câu trước
                </button>
                <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    disabled={currentQuestionIndex === quiz.questions.length - 1}
                    className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                    Câu tiếp
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamQuizScreen;