
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Target, 
  BookOpen, 
  CheckCircle2,
  Calendar,
  Download,
  Share2,
  RotateCcw
} from "lucide-react";
import { type StudyPlan, saveTaskProgress, getUserProgress } from "@/utils/planGenerator";
import { toast } from "sonner";

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
}

const StudyPlanDisplay: React.FC<StudyPlanProps> = ({ plan, onRestart }) => {
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});
  const [taskProgress, setTaskProgress] = useState<Record<string, TaskProgress>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    loadProgress();
  }, [plan.id]);

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
          time_spent: p.time_spent
        };
      });
      
      setTaskProgress(progressMap);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.title}</h1>
              <p className="text-gray-600 text-lg max-w-3xl">{plan.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={onRestart}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{plan.timeCommitment || plan.weeklyCommitment}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Focus Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{plan.focusArea}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learning Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{plan.learningStyle}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{Math.round(overallProgress)}%</p>
                <Progress value={overallProgress} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="goals">Monthly Goals</TabsTrigger>
            <TabsTrigger value="progress">Progress Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            {plan.weeks.map((week, weekIndex) => (
              <Card key={weekIndex}>
                <Collapsible 
                  open={openWeeks[week.weekNumber] ?? weekIndex === 0} 
                  onOpenChange={() => toggleWeek(week.weekNumber)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">{week.weekNumber}: {week.theme}</CardTitle>
                          <CardDescription className="mt-1">
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
                    <CardContent className="space-y-4">
                      {(week.dailySchedule || []).map((day, dayIndex) => {
                        const dayKey = `${week.weekNumber}-${day.day}`;
                        return (
                          <Card key={dayIndex} className="border-l-4 border-l-blue-500">
                            <Collapsible
                              open={openDays[dayKey] ?? false}
                              onOpenChange={() => toggleDay(dayKey)}
                            >
                              <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer">
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
                                <CardContent className="space-y-3">
                                  {(day.subtasks || []).map((subtask, subtaskIndex) => {
                                    const taskKey = `${day.day}-subtask-${subtaskIndex}`;
                                    const progressKey = `${taskKey}-${subtask.id}`;
                                    const isCompleted = taskProgress[progressKey]?.completed || false;
                                    
                                    return (
                                      <div key={subtaskIndex} className="border rounded-lg p-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                          <Checkbox
                                            checked={isCompleted}
                                            onCheckedChange={() => handleTaskComplete(taskKey, subtask.id)}
                                            className="mt-1"
                                          />
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                              <h4 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                                                {subtask.title}
                                              </h4>
                                              <Badge variant="secondary">{subtask.duration}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                              {subtask.description}
                                            </p>
                                            <div className="text-xs text-gray-500">
                                              <p><strong>Resources:</strong> {subtask.resources?.join(', ') || 'None'}</p>
                                              <p><strong>Checkpoints:</strong> {subtask.checkpoints?.join(', ') || 'None'}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <Textarea
                                          placeholder="Add notes about this task..."
                                          value={notes[progressKey] || ''}
                                          onChange={(e) => setNotes(prev => ({
                                            ...prev,
                                            [progressKey]: e.target.value
                                          }))}
                                          className="text-sm"
                                          rows={2}
                                        />
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
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Milestones</CardTitle>
                <CardDescription>
                  Track your progress through these key monthly achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plan.monthlyGoals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <p className="flex-1">{goal}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Study Plan Completion</span>
                        <span>{Math.round(overallProgress)}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plan.weeks.map((week, index) => {
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
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{week.weekNumber}: {week.theme}</span>
                            <span>{completedTasks}/{totalTasks} tasks ({Math.round(weekProgress)}%)</span>
                          </div>
                          <Progress value={weekProgress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyPlanDisplay;
