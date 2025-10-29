import React, { useState, useCallback, useEffect } from 'react';
import type { AppState, Quiz, UserAnswers, License, Subject, UserProgressData, Question } from './types';
import WelcomeModal from './components/WelcomeModal';
import LicenseSelectionScreen from './components/LicenseSelectionScreen';
import NameInputScreen from './components/NameInputScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import SubjectSelectionScreen from './components/SubjectSelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Footer from './components/Footer';
import { fetchLicenses } from './services/dataService';
import { SparklesIcon } from './components/icons';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgressData>({});
  
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [score, setScore] = useState(0);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLicenses();
        setLicenses(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Không thể tải được bộ đề thi. Vui lòng kiểm tra lại kết nối mạng và làm mới trang.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    if (selectedLicense && userName) {
      const key = `progress_${userName}_${selectedLicense.id}`;
      const savedProgress = localStorage.getItem(key);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      } else {
        setUserProgress({});
      }
    }
  }, [selectedLicense, userName]);

  // Save progress to localStorage
  const saveProgress = (subjectId: string, newScore: number) => {
    const key = `progress_${userName}_${selectedLicense!.id}`;
    const newProgress = { ...userProgress };
    const currentSubjectProgress = newProgress[subjectId] || { lastScore: null, highScore: 0 };
    
    currentSubjectProgress.lastScore = newScore;
    currentSubjectProgress.highScore = Math.max(currentSubjectProgress.highScore, newScore);
    
    newProgress[subjectId] = currentSubjectProgress;
    
    setUserProgress(newProgress);
    localStorage.setItem(key, JSON.stringify(newProgress));
  };


  const handleStart = useCallback(() => {
    setAppState('license_selection');
  }, []);

  const handleLicenseSelect = useCallback((license: License) => {
    setSelectedLicense(license);
    setAppState('name_input');
  }, []);
  
  const handleNameSubmit = useCallback((name: string) => {
    setUserName(name);
    setAppState('mode_selection');
  }, []);
  
  const startNewExam = useCallback(() => {
      if (!selectedLicense) return;
      const allQuestions = selectedLicense.subjects.flatMap(s => s.questions);
      const randomQuestions = shuffleArray(allQuestions).slice(0, 30);
      
      const examQuiz: Quiz = {
        id: 'exam-quiz',
        title: `Thi thử hạng ${selectedLicense.name}`,
        questions: randomQuestions.map((q: Question) => ({
          ...q,
          answers: shuffleArray(q.answers)
        })),
        timeLimit: 30 * 60, // 30 minutes
      };
      setCurrentQuiz(examQuiz);
      setUserAnswers({});
      setScore(0);
      setAppState('in_quiz');
  }, [selectedLicense]);

  const handleModeSelect = useCallback((mode: 'practice' | 'exam') => {
    if (mode === 'practice') {
      setAppState('subject_selection');
    } else {
      startNewExam();
    }
  }, [startNewExam]);
  
  const handleSubjectSelect = useCallback((subject: Subject) => {
      // Ôn tập
      const practiceQuiz: Quiz = {
        id: subject.id,
        title: `Ôn tập: ${subject.name}`,
        questions: subject.questions.map((q: Question) => ({
          ...q,
          answers: shuffleArray(q.answers)
        })),
      };
      setCurrentQuiz(practiceQuiz);
      setUserAnswers({});
      setScore(0);
      setAppState('in_quiz');
  }, []);


  const handleQuizFinish = useCallback((finalAnswers: UserAnswers) => {
    if (!currentQuiz) return;

    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      if (finalAnswers[q.id] === q.correctAnswerId) {
        correctCount++;
      }
    });

    setUserAnswers(finalAnswers);
    setScore(correctCount);

    // Save progress if it was a practice quiz
    if (currentQuiz.id !== 'exam-quiz') {
      saveProgress(currentQuiz.id, correctCount);
    }

    setAppState('results');
  }, [currentQuiz, saveProgress]);
  
  const handleBackToModeSelection = useCallback(() => {
      setCurrentQuiz(null);
      setUserAnswers({});
      setScore(0);
      setAppState('mode_selection');
  }, []);

  const handleBackToSubjectSelection = useCallback(() => {
      setCurrentQuiz(null);
      setUserAnswers({});
      setScore(0);
      setAppState('subject_selection');
  }, []);
  
  const handleBackFromQuiz = useCallback(() => {
    const isPracticeQuiz = currentQuiz && currentQuiz.id !== 'exam-quiz';
    if (isPracticeQuiz) {
        handleBackToSubjectSelection();
    } else {
        handleBackToModeSelection();
    }
  }, [currentQuiz, handleBackToSubjectSelection, handleBackToModeSelection]);

  const handleRetryQuiz = useCallback(() => {
    if (!currentQuiz) return;
    
    setUserAnswers({});
    setScore(0);
    
    if (currentQuiz.id === 'exam-quiz') {
      // Start a new exam with different questions
      startNewExam();
    } else {
      // Retry the same practice quiz
      setAppState('in_quiz');
    }
  }, [currentQuiz, startNewExam]);

  const handleBackToWelcome = useCallback(() => {
    setSelectedLicense(null);
    setUserName('');
    setUserProgress({});
    setAppState('welcome');
  }, []);

  const handleBackToLicenseSelection = useCallback(() => {
      setUserName('');
      setUserProgress({});
      setAppState('license_selection');
  }, []);

  const handleRestart = useCallback(() => {
    setSelectedLicense(null);
    setUserName('');
    setCurrentQuiz(null);
    setUserAnswers({});
    setScore(0);
    setUserProgress({});
    setAppState('license_selection');
  }, []);


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-4 animate-slide-in-right">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
            <SparklesIcon className="h-20 w-20 mx-auto text-indigo-500 mb-4 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Chào mừng anh/chị học viên!
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Hệ thống đang tải bộ đề thi mới nhất, vui lòng chờ trong giây lát.
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
         <div className="text-center p-4 animate-slide-in-right">
            <div className="bg-red-100 dark:bg-red-900/50 border-2 border-red-400 dark:border-red-600 rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold text-red-800 dark:text-red-200 mb-4">
                  Đã xảy ra lỗi
                </h1>
                <p className="text-lg text-red-700 dark:text-red-300">
                    {error}
                </p>
            </div>
        </div>
      );
    }

    switch (appState) {
      case 'welcome':
        return <WelcomeModal onStart={handleStart} />;
      case 'license_selection':
        return <LicenseSelectionScreen licenses={licenses} onSelect={handleLicenseSelect} onBack={handleBackToWelcome} />;
      case 'name_input':
        return <NameInputScreen onNameSubmit={handleNameSubmit} onBack={handleBackToLicenseSelection}/>;
      case 'mode_selection':
        return <ModeSelectionScreen onModeSelect={handleModeSelect} licenseName={selectedLicense?.name || ''} userName={userName} onSwitchLicense={handleRestart} />;
      case 'subject_selection':
        return <SubjectSelectionScreen subjects={selectedLicense?.subjects || []} progress={userProgress} onSelect={handleSubjectSelect} onBack={() => setAppState('mode_selection')} />;
      case 'in_quiz':
        return currentQuiz && <QuizScreen quiz={currentQuiz} onFinish={handleQuizFinish} onBack={handleBackFromQuiz} />;
      case 'results':
        const isPracticeQuiz = currentQuiz && currentQuiz.id !== 'exam-quiz';
        return currentQuiz && (
            <ResultsScreen
              quiz={currentQuiz}
              userAnswers={userAnswers}
              score={score}
              isPracticeQuiz={isPracticeQuiz}
              onRetry={handleRetryQuiz}
              onBack={isPracticeQuiz ? handleBackToSubjectSelection : handleBackToModeSelection}
            />
          );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-200 p-4 font-sans transition-colors duration-500">
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;