import React, { useState, useMemo } from 'react';
import type { Quiz, UserAnswers } from '../types';
import { CheckIcon3D, XIcon3D, ArrowLeftIcon3D } from './icons';

interface QuizScreenProps {
  quiz: Quiz;
  onFinish: (answers: UserAnswers) => void;
  onBack: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ quiz, onFinish, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const currentQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [quiz.questions, currentQuestionIndex]);
  const isAnswered = useMemo(() => userAnswers[currentQuestion.id] !== undefined, [userAnswers, currentQuestion.id]);
  const selectedAnswer = useMemo(() => userAnswers[currentQuestion.id] || null, [userAnswers, currentQuestion.id]);


  const handleFinishQuiz = () => {
    onFinish(userAnswers);
  };

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answerId }));
  };
  
  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    
    if (isLastQuestion) {
      handleFinishQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const progressPercentage = ((currentQuestionIndex) / quiz.questions.length) * 100;

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
                    className={'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-300'}
                >
                    Kết thúc
                </button>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                <span>Câu {currentQuestionIndex + 1} / {quiz.questions.length}</span>
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
              const isSelected = selectedAnswer === answer.id;
              let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-between text-lg';
              
               const isCorrect = answer.id === currentQuestion.correctAnswerId;
               if (isAnswered) {
                   if (isCorrect) {
                       buttonClass += ' bg-green-100 border-green-500 text-green-800 dark:bg-green-900/50 dark:border-green-600 dark:text-green-200';
                   } else if (isSelected && !isCorrect) {
                       buttonClass += ' bg-red-100 border-red-500 text-red-800 dark:bg-red-900/50 dark:border-red-600 dark:text-red-200';
                   } else {
                       buttonClass += ' border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300';
                   }
               } else {
                    if(isSelected) {
                        buttonClass += ' bg-indigo-100 border-indigo-500 dark:bg-indigo-900/50 dark:border-indigo-500 ring-2 ring-indigo-500';
                    } else {
                        buttonClass += ' bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600';
                    }
               }
              
              return (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <span>{answer.text}</span>
                  {isAnswered && (
                    <>
                      {answer.id === currentQuestion.correctAnswerId && <CheckIcon3D className="h-6 w-6 text-green-600 dark:text-green-400" />}
                      {isSelected && answer.id !== currentQuestion.correctAnswerId && <XIcon3D className="h-6 w-6 text-red-600 dark:text-red-400" />}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="text-right">
              {isAnswered ? (
                <button 
                    onClick={handleNext} 
                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 animate-slide-in-right"
                >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                </button>
              ) : (
                <div className="h-[48px]"></div> // Placeholder to prevent layout jump
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;