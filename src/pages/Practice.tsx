
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import type { Json } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';
import { ExamSelection } from '@/components/practice/ExamSelection';
import { ALevelSubjects } from '@/components/practice/ALevelSubjects';
import { YearSelection } from '@/components/practice/YearSelection';
import { PaperBrowser } from '@/components/practice/PaperBrowser';
import { StudyGoalsModal } from '@/components/practice/StudyGoalsModal';
import { SavedGroupsModal } from '@/components/practice/SavedGroupsModal';
import { PdfModal } from '@/components/practice/PdfModal';
import { AuthModal } from '@/components/practice/AuthModal';
import { getMostRecentYearForExam } from '@/data/papersData';
import { Search, HelpCircle, Target, Bookmark } from 'lucide-react';

export interface ExamType {
  id: string;
  name: string;
  fullName: string;
  years: number[];
  icon: string;
  defaultYear?: number;
}

const examTypes: ExamType[] = [
  {
    id: '1123',
    name: 'O Level English',
    fullName: 'O Level English (1123)',
    years: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
    icon: '📚',
    defaultYear: getMostRecentYearForExam('1123')
  },
  {
    id: '0500',
    name: 'IGCSE English',
    fullName: 'IGCSE English (0500)',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    icon: '📖',
    defaultYear: getMostRecentYearForExam('0500')
  },
  {
    id: 'a-levels',
    name: 'A Levels English',
    fullName: 'Cambridge & Edexcel Qualifications',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
    icon: '🎓',
    defaultYear: getMostRecentYearForExam('9093')
  }
];

const getExamTypeByLevel = (studyLevel: string): ExamType | null => {
  switch (studyLevel?.toLowerCase()) {
    case 'igcse':
      return examTypes.find(exam => exam.id === '0500') || null;
    case 'o-level':
    case 'olevel':
      return examTypes.find(exam => exam.id === '1123') || null;
    case 'a-level':
    case 'alevel':
    case 'a-levels-9093':
      return {
        id: '9093',
        name: 'Cambridge English Language (9093)',
        fullName: 'Complete A Level syllabus coverage',
        years: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
        icon: 'Languages',
        defaultYear: getMostRecentYearForExam('9093')
      };
    case 'a-levels-egp':
      return {
        id: '8021',
        name: 'Cambridge General Paper',
        fullName: 'Complete General Paper resources',
        years: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
        icon: 'Globe',
        defaultYear: getMostRecentYearForExam('8021')
      };
    default:
      return null;
  }
};

const Practice = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLevel, setUserLevel] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showALevelSubjects, setShowALevelSubjects] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authFeature, setAuthFeature] = useState<string>('');
  const [currentPdf, setCurrentPdf] = useState<{url: string, title: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelBasedNavigationDone, setLevelBasedNavigationDone] = useState(false);
  
  const [goalUpdateTrigger, setGoalUpdateTrigger] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLevel = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('study_level')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (profile?.study_level) {
            setUserLevel(profile.study_level);
          }
        } catch (error) {
          console.error('Error fetching user level:', error);
        }
      }
    };

    checkAuthAndLevel();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
          setUserLevel(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userLevel && !levelBasedNavigationDone && !selectedExam) {
      const examType = getExamTypeByLevel(userLevel);
      if (examType) {
        setSelectedExam(examType);
        const defaultYear = examType.defaultYear || getMostRecentYearForExam(examType.id) || 2024;
        setSelectedYear(defaultYear);
        setLevelBasedNavigationDone(true);
      }
    }
  }, [userLevel, levelBasedNavigationDone, selectedExam]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const requireAuth = (feature: string) => {
    if (!user) {
      setAuthFeature(feature);
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleGoalsClick = () => {
    if (requireAuth('study goals')) {
      setShowGoalsModal(true);
    }
  };

  const handleGroupsClick = () => {
    if (requireAuth('saved groups')) {
      setShowGroupsModal(true);
    }
  };

  const openPdf = (url: string, title: string) => {
    setCurrentPdf({ url, title });
    setShowPdfModal(true);
  };

  interface GoalProgress {
    completed: number;
    target: number;
  }

  const isValidProgress = (progress: any): progress is GoalProgress => {
    return progress && 
           typeof progress === 'object' && 
           typeof progress.completed === 'number' && 
           typeof progress.target === 'number';
  };

  const handleVariantComplete = async (variantInfo: { 
    type: 'variant' | 'session' | 'paper',
    examType: string,
    year: number,
    variantId: string 
  }) => {
    if (!user) return;

    try {
      const { data: activeGoals, error: goalsError } = await supabase
        .from('study_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .in('type', ['complete', 'papers'])
        .eq('exam_level', selectedExam?.fullName || '');

      if (goalsError) {
        console.error('Error fetching active goals:', goalsError);
        return;
      }

      if (!activeGoals || activeGoals.length === 0) {
        console.log('No active practice goals found for this exam type');
        return;
      }

      for (const goal of activeGoals) {
        const defaultProgress: GoalProgress = { completed: 0, target: 10 };
        const currentProgress: GoalProgress = isValidProgress(goal.progress) 
          ? goal.progress 
          : defaultProgress;
        
        const newCompleted = currentProgress.completed + 1;
        const newProgress: GoalProgress = { 
          completed: newCompleted, 
          target: currentProgress.target 
        };
        
        const isGoalComplete = newCompleted >= currentProgress.target;

        const { error: updateError } = await supabase
          .from('study_goals')
          .update({
            progress: newProgress as unknown as Json,
            completed: isGoalComplete
          })
          .eq('id', goal.id);

        if (updateError) {
          console.error('Error updating goal progress:', updateError);
        } else {
          console.log(`Updated goal progress: ${newCompleted}/${currentProgress.target}`);
          
          if (isGoalComplete) {
            toast({
              title: "🎉 Goal Completed!",
              description: `Congratulations! You've completed "${goal.goal_name}"`,
            });
          } else {
            toast({
              title: "Progress Updated!",
              description: `Goal progress: ${newCompleted}/${currentProgress.target} completed`,
            });
          }
        }
      }

      setGoalUpdateTrigger(prev => prev + 1);

    } catch (error) {
      console.error('Error updating study goal progress:', error);
    }
  };

  const handleExamSelection = (exam: ExamType) => {
    if (exam.id === 'a-levels') {
      setShowALevelSubjects(true);
    } else {
      setSelectedExam(exam);
      const defaultYear = exam.defaultYear || getMostRecentYearForExam(exam.id) || 2024;
      setSelectedYear(defaultYear);
    }
  };

  const handleALevelSubjectSelection = (subject: ExamType) => {
    setSelectedExam(subject);
    const defaultYear = subject.defaultYear || getMostRecentYearForExam(subject.id) || 2024;
    setSelectedYear(defaultYear);
    setShowALevelSubjects(false);
  };

  const handleGoBack = () => {
    if (selectedExam) {
      setSelectedExam(null);
      setSelectedYear(null);
      setLevelBasedNavigationDone(false);
    } else if (showALevelSubjects) {
      setShowALevelSubjects(false);
    }
  };

  const getSafeDefaultYear = () => {
    if (!selectedExam) return 2024;
    return selectedYear || selectedExam.defaultYear || getMostRecentYearForExam(selectedExam.id) || 2024;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="purple-gradient-border">
            <div className="purple-gradient-border-inner px-3 sm:px-4 py-2">
              {user ? (
                <>
                  <span className="text-xs sm:text-sm text-primary font-medium">
                    Signed in as: {user.email}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="ml-2 sm:ml-4 text-xs sm:text-sm text-primary hover:underline"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/auth')}
                  className="text-xs sm:text-sm text-primary hover:underline"
                >
                  Sign In for Goals & Saved Groups
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleGroupsClick}
            className="w-10 h-10 sm:w-12 sm:h-12 purple-gradient-border rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 self-end sm:self-auto"
          >
            <div className="purple-gradient-border-inner w-full h-full rounded-full flex items-center justify-center">
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
          </button>
        </div>

        {!selectedExam && !showALevelSubjects ? (
          <ExamSelection 
            examTypes={examTypes}
            onSelectExam={handleExamSelection}
          />
        ) : showALevelSubjects ? (
          <ALevelSubjects 
            onSelectSubject={handleALevelSubjectSelection}
            onGoBack={() => setShowALevelSubjects(false)}
          />
        ) : selectedExam ? (
          <div className="space-y-6 sm:space-y-8">
            <button
              onClick={handleGoBack}
              className="text-primary flex items-center gap-2 hover:underline font-medium"
            >
              ← Go Back
            </button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-card border-2 border-border rounded-lg sm:rounded-xl focus:outline-none focus:border-primary text-foreground shadow-sm text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <button className="w-9 h-9 sm:w-10 sm:h-10 purple-gradient-border rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="purple-gradient-border-inner w-full h-full rounded-full flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </div>
                </button>

                <button
                  onClick={handleGoalsClick}
                  className="purple-gradient-border rounded-lg sm:rounded-xl flex-shrink-0"
                >
                  <div className="purple-gradient-border-inner px-3 sm:px-4 py-2 flex items-center gap-1.5 sm:gap-2 text-primary hover:bg-card/50 transition-colors">
                    <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Goals</span>
                  </div>
                </button>
              </div>
            </div>

            <YearSelection
              examType={selectedExam}
              onSelectYear={setSelectedYear}
              selectedYear={getSafeDefaultYear()}
            />
            
            <PaperBrowser
              examType={selectedExam.id}
              year={getSafeDefaultYear()}
              user={user}
              onOpenPdf={openPdf}
              searchQuery={searchQuery}
              onVariantComplete={handleVariantComplete}
            />
          </div>
        ) : null}
      </div>

      {showGoalsModal && user && (
        <StudyGoalsModal
          isOpen={showGoalsModal}
          onClose={() => setShowGoalsModal(false)}
          user={user}
          selectedExam={selectedExam}
          pageContext="practice"
          onGoalUpdate={() => setGoalUpdateTrigger(prev => prev + 1)}
          key={goalUpdateTrigger}
        />
      )}

      {showGroupsModal && user && (
        <SavedGroupsModal
          isOpen={showGroupsModal}
          onClose={() => setShowGroupsModal(false)}
          user={user}
          onOpenPdf={openPdf}
        />
      )}

      {showPdfModal && currentPdf && (
        <PdfModal
          isOpen={showPdfModal}
          onClose={() => {
            setShowPdfModal(false);
            setCurrentPdf(null);
          }}
          pdfUrl={currentPdf.url}
          title={currentPdf.title}
          user={user}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          feature={authFeature}
        />
      )}
    </div>
  );
};

export default Practice;
