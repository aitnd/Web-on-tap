import React, { useState, useCallback, useEffect } from 'react';
import type { AppState, Quiz, UserAnswers, License, Subject, UserProgressData, Question, UserProfile } from './types';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';

import WelcomeModal from './components/WelcomeModal';
import LicenseSelectionScreen from './components/LicenseSelectionScreen';
import NameInputScreen from './components/NameInputScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import SubjectSelectionScreen from './components/SubjectSelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ExamQuizScreen from './components/ExamQuizScreen';
import ExamResultsScreen from './components/ExamResultsScreen';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

import { fetchLicenses } from './services/dataService';
import { HelmIcon3D } from './components/icons';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Guest flow state
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgressData>({});
  
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [score, setScore] = useState(0);

  // Check user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch or create user profile if session exists.
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        // 1. Try to fetch the profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (data) {
          // Profile exists, set it
          setUserProfile(data);
        } else if (error && (error.code === 'PGRST116' || error.details.includes('0 rows'))) {
          // Profile not found (PGRST116: "exact number of rows not returned")
          // 2. Create a new profile
          const userEmail = session.user.email || '';
          const newRole = userEmail.toLowerCase() === 'admin@onthihanghai.local' ? 'admin' : 'student';

          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({ 
              id: session.user.id, 
              email: userEmail,
              role: newRole 
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError.message);
            setError('Không thể tạo hồ sơ người dùng mới. Vui lòng thử lại.');
            await supabase.auth.signOut();
          } else {
            setUserProfile(newProfile);
          }
        } else if (error) {
          console.error('Error fetching profile:', error.message);
          setError('Đã có lỗi xảy ra khi tải thông tin người dùng.');
          await supabase.auth.signOut();
        }
      } else {
        // No session, clear profile
        setUserProfile(null);
      }
    };

    fetchProfile();
  }, [session]);


  // Fetch licenses data
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

  // Load progress from localStorage for guest flow
  useEffect(() => {
    if (!session && selectedLicense && userName) {
      const key = `progress_${userName}_${selectedLicense.id}`;
      const savedProgress = localStorage.getItem(key);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      } else {
        setUserProgress({});
      }
    }
  }, [session, selectedLicense, userName]);

  // Save progress to localStorage for guest flow
  const saveProgress = (subjectId: string, newScore: number) => {
    if (session) return; // Don't save to localStorage if logged in
    const key = `progress_${userName}_${selectedLicense!.id}`;
    
    // Create a new progress state to avoid direct mutation
    const newProgress = { ...userProgress };
    
    // Get current progress for the subject, providing defaults for a robust structure
    // This handles old data formats that might be missing new fields.
    const existingSubjectProgress = newProgress[subjectId] || {};
    const currentSubjectProgress = { 
      lastScore: null, 
      highScore: 0,
      lastScoreTimestamp: null,
      highScoreTimestamp: null,
      ...existingSubjectProgress // Overwrite defaults with any existing saved values
    };
    
    const now = Date.now();

    currentSubjectProgress.lastScore = newScore;
    currentSubjectProgress.lastScoreTimestamp = now;

    // Update high score if it's a new record
    if (newScore >= currentSubjectProgress.highScore) {
      currentSubjectProgress.highScore = newScore;
      currentSubjectProgress.highScoreTimestamp = now;
    }
    
    // Update the progress object with the new subject data
    newProgress[subjectId] = currentSubjectProgress;
    
    // Set the new state and save to localStorage
    setUserProgress(newProgress);
    localStorage.setItem(key, JSON.stringify(newProgress));
  };

  const handleStart = useCallback(() => setAppState('license_selection'), []);
  const handleShowLogin = useCallback(() => setAppState('login'), []);
  const handleLicenseSelect = useCallback((license: License) => {
    setSelectedLicense(license);
    setAppState('name_input');
  }, []);
  const handleNameSubmit = useCallback((name: string) => {
    setUserName(name);
    setAppState('mode_selection');
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAppState('welcome');
    // Reset guest state as well
    setSelectedLicense(null);
    setUserName('');
    setUserProgress({});
  };

  const startNewExam = useCallback(() => {
      if (!selectedLicense) return;
      const allQuestions = selectedLicense.subjects.flatMap(s => s.questions);
      const randomQuestions = shuffleArray(allQuestions).slice(0, 30);
      
      const examQuiz: Quiz = {
        id: 'exam-quiz',
        title: `Thi thử hạng ${selectedLicense.name}`,
        questions: randomQuestions.map((q: Question) => ({ ...q, answers: shuffleArray(q.answers) })),
        timeLimit: 45 * 60,
      };
      setCurrentQuiz(examQuiz);
      setUserAnswers({});
      setScore(0);
      setAppState('in_quiz');
  }, [selectedLicense]);

  const handleModeSelect = useCallback((mode: 'practice' | 'exam') => {
    if (mode === 'practice') setAppState('subject_selection');
    else startNewExam();
  }, [startNewExam]);
  
  const handleSubjectSelect = useCallback((subject: Subject) => {
      const practiceQuiz: Quiz = {
        id: subject.id,
        title: `Ôn tập: ${subject.name}`,
        questions: subject.questions.map((q: Question) => ({ ...q, answers: shuffleArray(q.answers) })),
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
      if (finalAnswers[q.id] === q.correctAnswerId) correctCount++;
    });
    setUserAnswers(finalAnswers);
    setScore(correctCount);
    if (currentQuiz.id !== 'exam-quiz') saveProgress(currentQuiz.id, correctCount);
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
    if (isPracticeQuiz) handleBackToSubjectSelection();
    else handleBackToModeSelection();
  }, [currentQuiz, handleBackToSubjectSelection, handleBackToModeSelection]);

  const handleRetryQuiz = useCallback(() => {
    if (!currentQuiz) return;
    setUserAnswers({});
    setScore(0);
    if (currentQuiz.id === 'exam-quiz') startNewExam();
    else setAppState('in_quiz');
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
            <HelmIcon3D className="h-24 w-24 mx-auto text-indigo-500 mb-4 animate-pulse" />
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
                <p className="text-lg text-red-700 dark:text-red-300">{error}</p>
            </div>
        </div>
      );
    }
    
    if (session && userProfile) {
        return <Dashboard userProfile={userProfile} />;
    }

    // Guest Flow
    switch (appState) {
      case 'welcome':
        return <WelcomeModal onStart={handleStart} onLoginClick={handleShowLogin} />;
      case 'login':
        return <LoginScreen onBack={handleBackToWelcome} />;
      case 'license_selection':
        return <LicenseSelectionScreen licenses={licenses} onSelect={handleLicenseSelect} onBack={handleBackToWelcome} />;
      case 'name_input':
        return <NameInputScreen onNameSubmit={handleNameSubmit} onBack={handleBackToLicenseSelection}/>;
      case 'mode_selection':
        return <ModeSelectionScreen onModeSelect={handleModeSelect} licenseName={selectedLicense?.name || ''} userName={userName} onSwitchLicense={handleRestart} />;
      case 'subject_selection':
        return <SubjectSelectionScreen subjects={selectedLicense?.subjects || []} progress={userProgress} onSelect={handleSubjectSelect} onBack={() => setAppState('mode_selection')} />;
      case 'in_quiz':
        if (currentQuiz) {
          return currentQuiz.timeLimit !== undefined
            ? <ExamQuizScreen quiz={currentQuiz} onFinish={handleQuizFinish} onBack={handleBackFromQuiz} />
            : <QuizScreen quiz={currentQuiz} onFinish={handleQuizFinish} onBack={handleBackFromQuiz} />;
        }
        return null;
      case 'results':
        if (currentQuiz) {
          return currentQuiz.id !== 'exam-quiz'
            ? <ResultsScreen quiz={currentQuiz} userAnswers={userAnswers} score={score} onRetry={handleRetryQuiz} onBack={handleBackToSubjectSelection} userName={userName} />
            : <ExamResultsScreen quiz={currentQuiz} userAnswers={userAnswers} score={score} onRetry={handleRetryQuiz} onBack={handleBackToModeSelection} userName={userName} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-200 p-4 font-sans transition-colors duration-500">
      {session && userProfile && <Header userProfile={userProfile} onLogout={handleLogout} />}
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;