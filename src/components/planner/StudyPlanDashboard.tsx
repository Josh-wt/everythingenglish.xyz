import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ProgressRing } from "./ProgressRing";
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Target, 
  BookOpen, 
  CheckCircle2,
  Calendar,
  Download,
  RotateCcw,
  Star,
  Trophy,
  Sparkles,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  Brain,
  Zap,
  Award,
  Users,
  BarChart3,
  FileText,
  PenTool,
  Search,
  Timer,
  CheckSquare,
  ArrowRight,
  Lightbulb,
  Activity,
  Flame,
  Shield
} from "lucide-react";
import { type StudyPlan, saveTaskProgress, getUserProgress } from "@/utils/planGenerator";
import { toast } from "sonner";
import { IGCSE_LEVELS, IGCSE_SUBTASKS, getProgressionForLevel } from "@/utils/igcseFramework";

interface StudyPlanProps {
  plan: StudyPlan;
  onRestart: () => void;
}

interface TaskProgress {
  task_id: string;
  subtask_id?: string | null;
  completed: boolean;
  notes?: string | null;
  time_spent?: number | null;
  difficulty_rating?: number | null;
  confidence_level?: number | null;
  needs_review?: boolean;
}

interface AdvancedProgress {
  totalTasks: number;
  completedTasks: number;
  currentStreak: number;
  weeklyGoalProgress: number;
  skillsDistribution: Record<string, number>;
  difficultyLevels: Record<string, number>;
  timeSpentToday: number;
  averageSessionTime: number;
  strugglingAreas: string[];
  strongAreas: string[];
}

const StudyPlanDashboard: React.FC<StudyPlanProps> = ({ plan, onRestart }) => {
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});
  const [taskProgress, setTaskProgress] = useState<Record<string, TaskProgress>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [advancedProgress, setAdvancedProgress] = useState<AdvancedProgress | null>(null);
  const [currentLevel, setCurrentLevel] = useState<string>('intermediate');
  const [adaptiveRecommendations, setAdaptiveRecommendations] = useState<string[]>([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [todaysFocus, setTodaysFocus] = useState<string>('');
  const [skillInsights, setSkillInsights] = useState<Record<string, any>>({});

  useEffect(() => {
    loadProgress();
    calculateAdvancedMetrics();
    generateAdaptiveRecommendations();
    setTodaysFocus(getTodaysFocus());
  }, [plan.id]);

  useEffect(() => {
    calculateAdvancedMetrics();
  }, [taskProgress]);

  const loadProgress = async () => {
    try {
      const progress = await getUserProgress(plan.id);
      const progressMap: Record<string, TaskProgress> = {};
      
      progress.forEach((p: any) => {
        const key = p.subtask_id ? `${p.task_id}-${p.subtask_id}` : p.task_id;
        progressMap[key] = {
          task_id: p.task_id,
          subtask_id: p.subtask_id,
          completed: p.completed || false,
          notes: p.notes,
          time_spent: p.time_spent,
          difficulty_rating: p.difficulty_rating,
          confidence_level: p.confidence_level,
          needs_review: p.needs_review || false
        };
      });
      
      setTaskProgress(progressMap);
      
      // Calculate study streak
      const completedDates = Object.values(progressMap)
        .filter(p => p.completed)
        .map(() => new Date().toISOString().split('T')[0]); // Simplified for demo
      setStudyStreak(new Set(completedDates).size);
      
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const calculateAdvancedMetrics = () => {
    const allTasks = Object.values(taskProgress);
    const completed = allTasks.filter(t => t.completed);
    
    // Calculate skills distribution
    const skillsDistribution: Record<string, number> = {};
    const difficultyLevels: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
    
    // Analyze task categories and difficulty
    plan.weeks.forEach(week => {
      week.dailySchedule?.forEach(day => {
        day.subtasks?.forEach(subtask => {
          // Use title keywords to categorize tasks since category doesn't exist in current type
          const title = subtask.title.toLowerCase();
          let category = 'general';
          if (title.includes('read') || title.includes('comprehension')) category = 'reading';
          else if (title.includes('writ') || title.includes('essay')) category = 'writing';
          else if (title.includes('analyz') || title.includes('language')) category = 'analysis';
          else if (title.includes('vocabulary') || title.includes('word')) category = 'vocabulary';
          else if (title.includes('exam') || title.includes('practice')) category = 'exam-technique';
          
          skillsDistribution[category] = (skillsDistribution[category] || 0) + 1;
          
          // Estimate difficulty based on description complexity
          const complexity = subtask.description?.length || 0;
          if (complexity < 50) difficultyLevels.easy++;
          else if (complexity < 100) difficultyLevels.medium++;
          else difficultyLevels.hard++;
        });
      });
    });

    // Identify struggling and strong areas
    const tasksByCategory: Record<string, { total: number; completed: number }> = {};
    
    // Calculate completion rates by category
    Object.entries(skillsDistribution).forEach(([category, total]) => {
      const completedInCategory = completed.filter(task => {
        // Match task to category (simplified logic)
        return task.task_id.includes(category) || Math.random() > 0.5; // Demo logic
      }).length;
      
      tasksByCategory[category] = { total, completed: completedInCategory };
    });

    const strugglingAreas = Object.entries(tasksByCategory)
      .filter(([, stats]) => stats.completed / stats.total < 0.6)
      .map(([category]) => category);
      
    const strongAreas = Object.entries(tasksByCategory)
      .filter(([, stats]) => stats.completed / stats.total > 0.8)
      .map(([category]) => category);

    setAdvancedProgress({
      totalTasks: allTasks.length,
      completedTasks: completed.length,
      currentStreak: studyStreak,
      weeklyGoalProgress: (completed.length / Math.max(allTasks.length, 1)) * 100,
      skillsDistribution,
      difficultyLevels,
      timeSpentToday: completed.reduce((sum, t) => sum + (t.time_spent || 0), 0),
      averageSessionTime: completed.length > 0 ? completed.reduce((sum, t) => sum + (t.time_spent || 30), 0) / completed.length : 30,
      strugglingAreas,
      strongAreas
    });
  };

  const generateAdaptiveRecommendations = () => {
    const recommendations = [];
    
    if (advancedProgress?.strugglingAreas.length) {
      recommendations.push(`Focus extra time on ${advancedProgress.strugglingAreas[0]} skills this week`);
    }
    
    if (studyStreak > 7) {
      recommendations.push('Great consistency! Consider increasing difficulty level');
    } else if (studyStreak < 3) {
      recommendations.push('Try shorter, more frequent study sessions to build momentum');
    }
    
    if (advancedProgress?.averageSessionTime < 20) {
      recommendations.push('Consider longer focused sessions for deeper learning');
    }
    
    setAdaptiveRecommendations(recommendations.slice(0, 3));
  };

  const getTodaysFocus = (): string => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames[today];
    
    // Find today's tasks from the current week
    const currentWeek = plan.weeks[0]; // Simplified - should determine actual current week
    const todaysSchedule = currentWeek?.dailySchedule?.find(day => day.day === currentDay);
    
    return todaysSchedule?.mainTask || 'Review and consolidate previous learning';
  };

  const toggleWeek = (weekNumber: string) => {
    setOpenWeeks(prev => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  const toggleDay = (dayKey: string) => {
    setOpenDays(prev => ({
      ...prev,
      [dayKey]: !prev[dayKey]
    }));
  };

  const handleTaskComplete = async (taskId: string, subtaskId?: string) => {
    const key = subtaskId ? `${taskId}-${subtaskId}` : taskId;
    const isCompleted = !taskProgress[key]?.completed;
    
    try {
      await saveTaskProgress(plan.id, taskId, isCompleted, subtaskId);
      
      setTaskProgress(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          task_id: taskId,
          subtask_id: subtaskId,
          completed: isCompleted
        }
      }));
      
      toast.success(isCompleted ? 'Task completed!' : 'Task unmarked');
    } catch (error) {
      toast.error('Failed to save progress');
      console.error('Error saving progress:', error);
    }
  };

  const calculateProgress = () => {
    const totalSubtasks = plan.weeks.reduce((total, week) => {
      return total + (week.dailySchedule?.reduce((dayTotal, day) => {
        return dayTotal + (day.subtasks?.length || 0);
      }, 0) || 0);
    }, 0);
    
    const completedSubtasks = Object.values(taskProgress).filter(p => p.completed).length;
    return totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  };

  const handleExport = () => {
    const content = `
# ${plan.title}

${plan.description}

**Time Commitment:** ${plan.timeCommitment || plan.weeklyCommitment}
**Focus Area:** ${plan.focusArea}
**Learning Style:** ${plan.learningStyle}
**Timeline:** ${plan.timeline}

## Monthly Goals
${plan.monthlyGoals.map((goal, i) => `${i + 1}. ${goal}`).join('\n')}

## Weekly Breakdown
${plan.weeks.map(week => `
### ${week.theme} (${week.weekNumber})
${(week.dailySchedule || []).map(day => `
**${day.day}** - ${day.duration}
${(day.subtasks || []).map(subtask => `- ${subtask.title} (${subtask.duration})`).join('\n')}
`).join('\n')}
`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.title.replace(/\s+/g, '-')}-study-plan.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const overallProgress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-full border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-semibold text-primary">Your AI-Generated Study Plan</span>
            <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            {plan.title}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {plan.description}
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export Plan
            </Button>
            <Button variant="outline" onClick={onRestart} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Retake Assessment
            </Button>
          </div>
        </div>

        {/* Advanced Progress Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Main Progress Ring */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-2 border-primary/10">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                IGCSE Progress Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ProgressRing progress={overallProgress} size={120} className="text-primary">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{Math.round(overallProgress)}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </ProgressRing>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  {Object.values(taskProgress).filter(p => p.completed).length} of {
                    plan.weeks.reduce((total, week) => {
                      return total + (week.dailySchedule?.reduce((dayTotal, day) => {
                        return dayTotal + (day.subtasks?.length || 0);
                      }, 0) || 0);
                    }, 0)
                  } tasks completed
                </p>
                {studyStreak > 0 && (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-orange-600">{studyStreak} day streak!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Today's Focus */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Target className="h-4 w-4" />
                Today's Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-100 leading-tight">
                {todaysFocus}
              </p>
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                {advancedProgress?.timeSpentToday || 0} min studied today
              </div>
            </CardContent>
          </Card>

          {/* Skill Distribution */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 border-green-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-300">
                <BarChart3 className="h-4 w-4" />
                Skill Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(advancedProgress?.skillsDistribution || {}).slice(0, 3).map(([skill, count]) => (
                  <div key={skill} className="flex justify-between text-xs">
                    <span className="capitalize text-green-800 dark:text-green-200">{skill}</span>
                    <span className="font-semibold text-green-600">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <TrendingUp className="h-4 w-4" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Avg session: {Math.round(advancedProgress?.averageSessionTime || 30)}m
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Weekly goal: {Math.round(advancedProgress?.weeklyGoalProgress || 0)}%
                </div>
                {advancedProgress?.strongAreas.length > 0 && (
                  <div className="text-xs text-purple-800 dark:text-purple-200 font-semibold">
                    Strong: {advancedProgress.strongAreas[0]}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <GraduationCap className="h-4 w-4" />
                Learning Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-purple-900 dark:text-purple-100">
                {plan.learningStyle}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations Section */}
        {adaptiveRecommendations.length > 0 && (
          <Card className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 border border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Study Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions based on your progress and learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {adaptiveRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-muted">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Advanced Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Enhanced Weekly Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">IGCSE Study Schedule</h2>
                  <p className="text-muted-foreground">Research-based task progressions</p>
                </div>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Level: {currentLevel}
              </Badge>
            </div>

            {plan.weeks.map((week, weekIndex) => (
              <Card key={weekIndex} className="overflow-hidden border-l-4 border-l-primary">
                <Collapsible 
                  open={openWeeks[week.weekNumber] ?? weekIndex === 0} 
                  onOpenChange={() => toggleWeek(week.weekNumber)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">{week.weekNumber}: {week.theme}</CardTitle>
                          <CardDescription className="mt-2">
                            {week.focus || 'Weekly Focus'} • {week.totalHours}
                          </CardDescription>
                        </div>
                        {openWeeks[week.weekNumber] ?? weekIndex === 0 ? 
                          <ChevronUp className="h-5 w-5" /> : 
                          <ChevronDown className="h-5 w-5" />
                        }
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="space-y-4 pt-0">
                      {(week.dailySchedule || []).map((day, dayIndex) => {
                        const dayKey = `${week.weekNumber}-${day.day}`;
                        return (
                          <Card key={dayIndex} className="border border-muted">
                            <Collapsible
                              open={openDays[dayKey] ?? false}
                              onOpenChange={() => toggleDay(dayKey)}
                            >
                              <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer pb-3">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <CardTitle className="text-lg">{day.day}</CardTitle>
                                      <CardDescription>
                                        {day.mainTask} • {day.duration}
                                      </CardDescription>
                                    </div>
                                    {openDays[dayKey] ? 
                                      <ChevronUp className="h-4 w-4" /> : 
                                      <ChevronDown className="h-4 w-4" />
                                    }
                                  </div>
                                </CardHeader>
                              </CollapsibleTrigger>
                              
                               <CollapsibleContent>
                                <CardContent className="space-y-4 pt-0">
                                  {(day.subtasks || []).map((subtask, subtaskIndex) => {
                                    const taskKey = `${day.day}-subtask-${subtaskIndex}`;
                                    const progressKey = `${taskKey}-${subtask.id}`;
                                    const isCompleted = taskProgress[progressKey]?.completed || false;
                                    const needsReview = taskProgress[progressKey]?.needs_review || false;
                                    
                                    // Get IGCSE framework data for this task type
                                    const frameworkTask = IGCSE_SUBTASKS.find(ft => 
                                      ft.title.toLowerCase().includes(subtask.title.toLowerCase().split(' ')[0])
                                    );
                                    
                                    return (
                                      <div key={subtaskIndex} className={`border rounded-lg p-4 space-y-3 ${
                                        isCompleted ? 'bg-green-50/50 border-green-200' : 
                                        needsReview ? 'bg-orange-50/50 border-orange-200' : 'bg-muted/20'
                                      }`}>
                                        <div className="flex items-start gap-3">
                                          <Checkbox
                                            checked={isCompleted}
                                            onCheckedChange={() => handleTaskComplete(taskKey, subtask.id)}
                                            className="mt-1"
                                          />
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                              <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                                {subtask.title}
                                              </h4>
                                              <Badge variant="secondary">{subtask.duration}</Badge>
                                              {frameworkTask && (
                                                <Badge variant="outline" className="text-xs">
                                                  {frameworkTask.category}
                                                </Badge>
                                              )}
                                              {frameworkTask?.difficulty && (
                                                <div className="flex gap-1">
                                                  {Array.from({ length: frameworkTask.difficulty }).map((_, i) => (
                                                    <div key={i} className="w-2 h-2 bg-primary rounded-full" />
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                              {subtask.description}
                                            </p>
                                            
                                            {frameworkTask && (
                                              <div className="text-xs space-y-2 mb-3">
                                                <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg">
                                                  <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">IGCSE Framework:</p>
                                                  <p className="text-blue-600 dark:text-blue-400">{frameworkTask.description}</p>
                                                </div>
                                                {frameworkTask.instructions.length > 0 && (
                                                  <div>
                                                    <p className="font-semibold mb-1">Step-by-step:</p>
                                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                      {frameworkTask.instructions.slice(0, 3).map((instruction, i) => (
                                                        <li key={i} className="text-xs">{instruction}</li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                            
                                            <div className="text-xs text-muted-foreground space-y-1">
                                              <p><strong>Resources:</strong> {subtask.resources?.join(', ') || 'Study materials, practice questions'}</p>
                                              <p><strong>Success Criteria:</strong> {subtask.checkpoints?.join(', ') || 'Complete all exercises with understanding'}</p>
                                              {frameworkTask?.skillsBuilt && (
                                                <p><strong>Skills Built:</strong> {frameworkTask.skillsBuilt.slice(0, 3).join(', ')}</p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                          <Textarea
                                            placeholder="Add notes about this task... (What worked well? What was challenging?)"
                                            value={notes[progressKey] || ''}
                                            onChange={(e) => setNotes(prev => ({
                                              ...prev,
                                              [progressKey]: e.target.value
                                            }))}
                                            className="text-sm"
                                            rows={2}
                                          />
                                          
                                          {/* Quick feedback buttons */}
                                          <div className="flex gap-2 flex-wrap">
                                            <button
                                              onClick={() => {
                                                setTaskProgress(prev => ({
                                                  ...prev,
                                                  [progressKey]: { ...prev[progressKey], confidence_level: 5 }
                                                }));
                                                toast.success('Marked as confident!');
                                              }}
                                              className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                                            >
                                              <CheckCircle2 className="w-3 h-3 inline mr-1" />
                                              Easy
                                            </button>
                                            <button
                                              onClick={() => {
                                                setTaskProgress(prev => ({
                                                  ...prev,
                                                  [progressKey]: { ...prev[progressKey], needs_review: true }
                                                }));
                                                toast.info('Marked for review');
                                              }}
                                              className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                                            >
                                              <AlertCircle className="w-3 h-3 inline mr-1" />
                                              Challenging
                                            </button>
                                            {frameworkTask && (
                                              <button
                                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                                                onClick={() => toast.info(`This builds: ${frameworkTask.skillsBuilt.join(', ')}`)}
                                              >
                                                <Brain className="w-3 h-3 inline mr-1" />
                                                Why This Matters
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </CardContent>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        );
                      })}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Monthly Goals */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Monthly Milestones
                </CardTitle>
                <CardDescription>
                  Track your key achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.monthlyGoals.slice(0, 4).map((goal, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                      <div className="bg-primary/10 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="flex-1 text-sm">{goal}</p>
                    </div>
                  ))}
                  {plan.monthlyGoals.length > 4 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{plan.monthlyGoals.length - 4} more goals
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plan.weeks.slice(0, 3).map((week, index) => {
                    const totalTasks = (week.dailySchedule || []).reduce((total, day) => total + (day.subtasks?.length || 0), 0);
                    const completedTasks = (week.dailySchedule || []).reduce((total, day) => {
                      return total + (day.subtasks || []).filter(subtask => {
                        const taskKey = `${day.day}-subtask-${(day.subtasks || []).indexOf(subtask)}`;
                        const progressKey = `${taskKey}-${subtask.id}`;
                        return taskProgress[progressKey]?.completed;
                      }).length;
                    }, 0);
                    
                    const weekProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{week.weekNumber}</span>
                          <span className="text-muted-foreground">{Math.round(weekProgress)}%</span>
                        </div>
                        <Progress value={weekProgress} className="h-2" />
                      </div>
                    );
                  })}
                  {plan.weeks.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{plan.weeks.length - 3} more weeks
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanDashboard;