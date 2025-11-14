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

const RadioButton = ({ id, name, checked, onChange }: { id: string, name: string, checked: boolean, onChange: () => void }) => (
    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
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
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ?? 3600);

  const currentQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [quiz.questions, currentQuestionIndex]);

  const latestAnswers = useRef(userAnswers);
  useEffect(() => {
    latestAnswers.current = userAnswers;
  }, [userAnswers]);

  const handleBackWithConfirm = () => {
    if (window.confirm('Anh/chị có chắc chắn muốn thoát khỏi bài thi không? Mọi tiến trình sẽ bị mất.')) {
        onBack();
    }
  };

  const handleFinishQuiz = useCallback(() => {
    const finalAnswers = latestAnswers.current;
    const unansweredCount = quiz.questions.length - Object.keys(finalAnswers).length;
    const confirmationMessage = unansweredCount > 0 
        ? `Anh/chị vẫn còn ${unansweredCount} câu chưa trả lời. Anh/chị có chắc chắn muốn nộp bài không?`
        : 'Anh/chị đã hoàn thành tất cả các câu hỏi. Anh/chị có muốn nộp bài không?';
  
    if (window.confirm(confirmationMessage)) {
        onFinish(finalAnswers);
    }
  }, [quiz.questions.length, onFinish]);

  const stableOnFinish = useRef(onFinish);
  useEffect(() => {
      stableOnFinish.current = onFinish;
  }, [onFinish]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert('Đã hết giờ làm bài! Hệ thống sẽ tự động nộp bài của anh/chị.');
      stableOnFinish.current(latestAnswers.current);
    }
  }, [timeLeft]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answerId }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto font-sans text-black shadow-lg animate-slide-in-right rounded-md">
      <div className="h-3 bg-yellow-700 rounded-t-md border-b-2 border-yellow-900"></div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-start pb-4 border-b border-gray-300">
          <div className="flex gap-4 items-center">
            <img src="https://i.postimg.cc/8PDn1wfM/favicon.png" alt="Avatar" className="w-20 h-[100px] border border-gray-300 object-contain p-1"/>
            <div className="text-sm">
              <p>Số báo danh:</p>
              <p>Ngày sinh:</p>
              <p className="mt-2">Họ tên: <span className="font-bold text-blue-700">{userName || 'Học viên'}</span></p>
              <p>Hạng bằng: <span className="font-bold text-blue-700">{selectedLicense?.name || 'Thuyền trưởng hạng ba - T3'}</span></p>
            </div>
          </div>
          <div className="flex items-start gap-4">
             <div className="bg-[#f0ad4e] text-black p-2 rounded-md text-sm w-48">
                <p className="font-bold">Đang thi</p>
                <p>Thời gian: 45 phút</p>
                <p>Bù giờ: 0 phút</p>
                <p>Còn lại: <span className="font-bold">{formatTime(timeLeft)}</span></p>
            </div>
             <button onClick={handleBackWithConfirm} className="text-sm text-gray-600 hover:text-red-500 font-semibold">Thoát</button>
          </div>
        </div>

        <div className="flex mt-4 gap-4">
          <div className="w-[60%] border border-gray-400 rounded-md p-4 flex flex-col justify-between min-h-[500px]">
            <div>
              <p className="font-bold mb-4 border-b border-dashed border-gray-400 pb-2">Nội dung câu hỏi</p>
              <p className="font-bold text-red-600 mb-2">Câu :{currentQuestionIndex + 1}</p>
              <p className="mb-4 font-semibold">{currentQuestion.text}</p>
              <div className="space-y-4">
                {currentQuestion.answers.map((answer, index) => (
                  <label key={answer.id} htmlFor={`q_main_${answer.id}`} className="flex items-center cursor-pointer">
                    <RadioButton 
                      id={`q_main_${answer.id}`}
                      name={`q_main_${currentQuestion.id}`}
                      checked={userAnswers[currentQuestion.id] === answer.id}
                      onChange={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                    />
                    <span className="ml-3 flex">
                      <span className="font-bold mr-1 text-gray-700">{String.fromCharCode(97 + index)}.</span> 
                      <p>{answer.text}</p>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
               <button onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0} className="bg-[#f0ad4e] text-black px-4 py-2 rounded-md border border-gray-400 flex items-center font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                Trở lại
              </button>
              <button onClick={() => setCurrentQuestionIndex(p => Math.min(quiz.questions.length - 1, p + 1))} disabled={currentQuestionIndex === quiz.questions.length - 1} className="bg-[#f0ad4e] text-black px-4 py-2 rounded-md border border-gray-400 flex items-center font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Tiếp tục
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>

          <div className="w-[40%]">
            <div className="flex gap-2">
              <table className="w-1/2 border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f0ad4e]">
                    <th className="border border-gray-400 p-1">Câu</th>
                    <th className="border border-gray-400 p-1">a</th>
                    <th className="border border-gray-400 p-1">b</th>
                    <th className="border border-gray-400 p-1">c</th>
                    <th className="border border-gray-400 p-1">d</th>
                  </tr>
                </thead>
                <tbody>
                  {quiz.questions.slice(0, 15).map((q, index) => (
                    <tr key={q.id} className={currentQuestionIndex === index ? 'bg-cyan-200' : ''}>
                      {/* 💖 SỬA CHỖ NÀY NÈ ANH (Bảng 1) 💖 */}
                      <td className={`border border-gray-400 p-1 font-bold text-center cursor-pointer text-black`} onClick={() => setCurrentQuestionIndex(index)}>{index + 1}</td>
                      {q.answers.slice(0, 4).map((a) => (
                        <td key={a.id} className="border border-gray-400 p-1 text-center">
                           <RadioButton 
                            id={`grid_q_${q.id}_${a.id}`}
                            name={`grid_q_${q.id}`} 
                            checked={userAnswers[q.id] === a.id} 
                            onChange={() => handleAnswerSelect(q.id, a.id)} 
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-1/2">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f0ad4e]">
                      <th className="border border-gray-400 p-1">Câu</th>
                      <th className="border border-gray-400 p-1">a</th>
                      <th className="border border-gray-400 p-1">b</th>
                      <th className="border border-gray-400 p-1">c</th>
                      <th className="border border-gray-400 p-1">d</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quiz.questions.slice(15, 30).map((q, index) => {
                        const realIndex = index + 15;
                        return (
                            <tr key={q.id} className={currentQuestionIndex === realIndex ? 'bg-cyan-200' : ''}>
                            {/* 💖 SỬA CHỖ NÀY NÈ ANH (Bảng 2) 💖 */}
                            <td className={`border border-gray-400 p-1 font-bold text-center cursor-pointer text-black`} onClick={() => setCurrentQuestionIndex(realIndex)}>{realIndex + 1}</td>
                            {q.answers.slice(0,4).map(a => (
                                <td key={a.id} className="border border-gray-400 p-1 text-center">
                                   <RadioButton 
                                    id={`grid_q_${q.id}_${a.id}`}
                                    name={`grid_q_${q.id}`} 
                                    checked={userAnswers[q.id] === a.id} 
                                    onChange={() => handleAnswerSelect(q.id, a.id)} 
                                  />
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
            </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineExamScreen;