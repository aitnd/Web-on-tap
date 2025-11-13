import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Quiz, UserAnswers, License } from '../types';

interface OnlineExamScreenProps {
  quiz: Quiz;
  onFinish: (answers: UserAnswers) => void;
  onBack: () => void;
  userName: string;
  selectedLicense: License | null;
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Khôi phục component RadioButton để sử dụng trong bảng trả lời
const RadioButton = ({ id, name, checked, onChange }: { id: string, name: string, checked: boolean, onChange: () => void }) => (
    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0 mx-auto">
        <input 
            type="radio" 
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="appearance-none h-4 w-4 border-2 border-gray-400 rounded-full cursor-pointer"
        />
        {checked && <div className="absolute h-2 w-2 bg-blue-600 rounded-full"></div>}
    </div>
);

const OnlineExamScreen: React.FC<OnlineExamScreenProps> = ({ quiz, onFinish, onBack, userName, selectedLicense }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [isFinishing, setIsFinishing] = useState(false); // State for finishing process
  
  const currentQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [quiz.questions, currentQuestionIndex]);

  // Use a ref to hold the latest userAnswers for callbacks,
  // preventing stale state issues in closures.
  const latestAnswers = useRef(userAnswers);
  useEffect(() => {
    latestAnswers.current = userAnswers;
  }, [userAnswers]);

  const handleFinishQuiz = useCallback(() => {
    setIsFinishing(true);
    // Introduce a small delay to ensure the UI updates/state is stable
    setTimeout(() => {
        onFinish(latestAnswers.current);
    }, 100);
  }, [onFinish]);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleFinishQuiz]);

  const handleAnswerSelect = useCallback((questionId: number, answerId: number) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  }, []);

  const handleQuestionJump = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
  }, []);

  const answeredCount = useMemo(() => Object.keys(userAnswers).length, [userAnswers]);

  if (isFinishing) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <p className="text-2xl font-semibold text-[#337ab7] dark:text-blue-400">Đang nộp bài...</p>
                <div className="mt-4 border-4 border-t-4 border-blue-200 rounded-full w-12 h-12 animate-spin mx-auto"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <div className="bg-[#337ab7] text-white p-4 flex justify-between items-center rounded-t-md">
            <button 
                onClick={onBack} 
                className="bg-white text-[#337ab7] font-semibold py-1 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
                Quay lại
            </button>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Thi Trực Tuyến</h1>
                <p className="text-sm">{selectedLicense?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-sm font-semibold">
                    <p>Thí sinh: {userName}</p>
                </div>
                <div className="flex items-center space-x-2 bg-white text-[#337ab7] px-3 py-1 rounded-md font-bold text-lg">
                    <span>⏳</span>
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </div>
        </div>

        <div className="p-4 grid grid-cols-12 gap-4">
          
          {/* Question Display Area (Read-only, now showing answers) */}
          {currentQuestion && (
            <div className="col-span-12 lg:col-span-8">
                <div className="p-4 bg-white rounded-md shadow-md">
                    <h2 className="text-xl font-bold text-[#337ab7] mb-2 border-b-2 border-[#337ab7] pb-2">
                        Câu hỏi {currentQuestionIndex + 1}/{quiz.questions.length}
                    </h2>
                    <p className="text-lg mb-4 text-gray-800 font-semibold leading-relaxed">
                        {currentQuestion.text}
                    </p>

                    {/* LOGIC HIỂN THỊ ẢNH ĐÃ ĐƯỢC GIỮ LẠI */}
                    {currentQuestion.image && (
                        <div className="mt-4 mb-4 flex justify-center">
                            <img
                                src={currentQuestion.image}
                                alt="Hình ảnh minh họa"
                                className="max-w-full h-auto rounded-lg shadow-md max-h-80 border border-gray-300"
                            />
                        </div>
                    )}
                    {/* END LOGIC HIỂN THỊ ẢNH */}

                    {/* KHÔI PHỤC VÀ CHUYỂN LOGIC HIỂN THỊ ĐÁP ÁN THÀNH READ-ONLY */}
                    <div className="space-y-4 mt-6">
                        {currentQuestion.answers.map((answer, index) => {
                            const isSelected = userAnswers[currentQuestion.id] === answer.id;
                            
                            // Sử dụng div thay vì button và bỏ các hiệu ứng hover/cursor
                            let divClass = "flex items-start p-3 rounded-lg border-2 transition-all duration-200 text-left text-gray-800";
                            if (isSelected) {
                                // Giữ lại highlight cho đáp án đã chọn
                                divClass = "flex items-start p-3 rounded-lg border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-inner transition-all duration-200 text-left";
                            } else {
                                divClass += " border-gray-200";
                            }

                            return (
                                <div
                                    key={answer.id}
                                    className={divClass} // KHÔNG CÓ onClick handler
                                >
                                    <span className="font-bold mr-3 min-w-[20px] text-center">{String.fromCharCode(65 + index)}.</span>
                                    <span className="flex-1">{answer.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Đã loại bỏ khu vực nút điều khiển Câu trước/Câu tiếp */}
            </div>
          )}

          {/* Question Controller Area (Table) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-4">
              
              {/* ĐÃ BỎ KHỐI "Tổng quan bài thi" (Question Navigator Grid) */}

              <div className="p-4 bg-white rounded-md shadow-md">
                <h3 className="text-xl font-bold text-[#337ab7] mb-3 border-b-2 border-[#337ab7] pb-2">
                    Bảng trả lời
                </h3>
                <table className="min-w-full border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-200 text-sm font-semibold text-gray-700">Câu</th>
                      <th className="border border-gray-400 p-2 bg-gray-200 text-sm font-semibold text-gray-700">A</th>
                      <th className="border border-gray-400 p-2 bg-gray-200 text-sm font-semibold text-gray-700">B</th>
                      <th className="border border-gray-400 p-2 bg-gray-200 text-sm font-semibold text-gray-700">C</th>
                      <th className="border border-gray-400 p-2 bg-gray-200 text-sm font-semibold text-gray-700">D</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quiz.questions.map((q, index) => {
                        // Chỉ hiển thị tối đa 4 đáp án trong bảng (A, B, C, D)
                        const limitedAnswers = q.answers.slice(0, 4);
                        
                        return (
                            <tr key={q.id} className={currentQuestionIndex === index ? "bg-blue-100" : "hover:bg-gray-50"}>
                                <td 
                                    className="border border-gray-400 p-1 text-center font-bold cursor-pointer"
                                    onClick={() => handleQuestionJump(index)}
                                >
                                    {index + 1}
                                </td>
                            {limitedAnswers.map(a => (
                                <td key={a.id} className="border border-gray-400 p-1 text-center cursor-pointer hover:bg-gray-200 transition-colors"
                                    onClick={() => handleAnswerSelect(q.id, a.id)}>
                                   
                                   {/* LOGIC CHỌN ĐÁP ÁN BẰNG RADIO BUTTON Ở ĐÂY */}
                                   <RadioButton 
                                    id={`grid_q_${q.id}_${a.id}`}
                                    name={`grid_q_${q.id}`} 
                                    checked={userAnswers[q.id] === a.id} 
                                    onChange={() => handleAnswerSelect(q.id, a.id)} 
                                  />
                                </td>
                            ))}
                            {/* Đảm bảo bảng có đủ 4 cột nếu câu hỏi chỉ có 2 hoặc 3 đáp án */}
                            {Array(4 - limitedAnswers.length).fill(0).map((_, i) => (
                                <td key={`empty-${q.id}-${i}`} className="border border-gray-400 p-1 text-center text-gray-400">
                                    -
                                </td>
                            ))}
                            </tr>
                        )
                    })}
                  </tbody>
                </table>
                <div className="text-center mt-4">
                    <button onClick={handleFinishQuiz} className="bg-[#337ab7] text-white mt-4 px-8 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">Nộp bài</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-[#005a9c] text-white p-4 rounded-b-md flex items-center gap-4 text-xs">
            <img src="https://i.postimg.cc/8PDn1wfM/favicon.png" alt="Logo" className="h-16 w-16 object-contain"/>
            <div>
            <p className="font-bold">CÔNG TY CỔ PHẦN TƯ VẤN VÀ GIÁO DỤC NINH BÌNH</p>
            <p>Địa chỉ: Đường Triệu Việt Vương, phường Hoa Lư, tỉnh Ninh Bình </p>
            <p>Hotline: 022.96.282.969 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineExamScreen;