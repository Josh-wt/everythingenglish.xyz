import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User } from '@supabase/supabase-js';
import { ExamType } from '@/pages/Practice';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { X, Target, Plus, CheckCircle, Trophy, Clock } from 'lucide-react';

interface StudyGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  selectedExam: ExamType | null;
  pageContext?: 'practice' | 'resources';
  onGoalUpdate?: () => void;
}

interface StudyGoal {
  id: string;
  goal_name: string;
  type: string;
  exam_level: string;
  progress: any;
  completed: boolean;
  target_date: string | null;
  created_at: string;
  target_resource_id?: string;
  target_quantity?: number;
}

// CONSTRAINT VALUES FOUND:
// exam_level: ['IGCSE English (0500)', 'O Level English (1123)', 'A Levels English', ...]
// type: ['papers', 'examples', 'vocabulary', 'complete']

// Map display-friendly goal types to database constraint values
const GOAL_TYPE_MAPPING = {
  'Master Resource': 'examples',        // Resources are often examples
  'Complete Variants': 'complete',      // General completion type
  'Complete Sessions': 'complete',      // General completion type  
  'Complete Papers': 'papers'           // Specific papers type
};

// Reverse mapping for display
const GOAL_TYPE_DISPLAY_MAPPING = {
  'examples': 'Master Resource',
  'complete': 'Complete Practice',
  'papers': 'Complete Papers',
  'vocabulary': 'Master Vocabulary'
};

export const StudyGoalsModal = ({ 
  isOpen, 
  onClose, 
  user, 
  selectedExam, 
  pageContext = 'practice',
  onGoalUpdate 
}: StudyGoalsModalProps) => {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    type: pageContext === 'resources' ? 'Master Resource' : 'Complete Variants',
    target: pageContext === 'resources' ? 1 : 10,
    examType: selectedExam?.id || 'IGCSE English (0500)',
    resourceId: ''
  });

  const isPractice = pageContext === 'practice';
  const modalTitle = isPractice ? 'Practice Goals' : 'Study Goals';

  useEffect(() => {
    if (isOpen) {
      loadGoals();
    }
  }, [isOpen, user.id, pageContext]);

  const loadGoals = async () => {
    let query = supabase
      .from('study_goals')
      .select('*')
      .eq('user_id', user.id);

    // Filter by mapped goal type values based on page context
    if (pageContext === 'resources') {
      query = query.eq('type', 'examples'); // 'Master Resource' maps to 'examples'
    } else {
      query = query.in('type', ['complete', 'papers']); // Practice goals map to 'complete' and 'papers'
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading goals:', error);
      return;
    }

    setGoals(data || []);
  };

  const createGoal = async () => {
    if (!newGoal.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a goal name",
        variant: "destructive"
      });
      return;
    }

    // Map display values to database constraint values
    const examLevel = newGoal.examType; // Already matches constraint
    const mappedGoalType = GOAL_TYPE_MAPPING[newGoal.type as keyof typeof GOAL_TYPE_MAPPING];
    
    if (!mappedGoalType) {
      toast({
        title: "Goal Type Error",
        description: `Cannot map goal type "${newGoal.type}" to database value.`,
        variant: "destructive"
      });
      console.log('Available goal type mappings:', GOAL_TYPE_MAPPING);
      console.log('Attempted to map goal type:', newGoal.type);
      return;
    }
    
    console.log('Using exam level:', examLevel);
    console.log('Mapped goal type:', newGoal.type, '→', mappedGoalType);

    const goalData = {
      user_id: user.id,
      goal_name: newGoal.name,
      type: mappedGoalType, // Use mapped database value
      exam_level: examLevel, // Use display value directly - no mapping needed
      progress: { completed: 0, target: newGoal.target },
      completed: false,
      target_resource_id: pageContext === 'resources' && newGoal.resourceId ? newGoal.resourceId : null
    };

    const { error } = await supabase
      .from('study_goals')
      .insert(goalData);

    if (error) {
      console.error('Database error:', error);
      
      // Special handling for constraint violations
      if (error.code === '23514') {
        console.log('Constraint violation details:', error);
        
        if (error.message.includes('study_goals_exam_level_check')) {
          toast({
            title: "Exam Level Constraint Error",
            description: `The exam level "${examLevel}" should be allowed but isn't working. Check console for details.`,
            variant: "destructive"
          });
          console.log('Exam Level constraint violation for value:', examLevel);
          console.log('Allowed exam level values:', [
            'IGCSE English (0500)', 'O Level English (1123)', 'A Levels English',
            'IGCSE English', 'O Level English', 'A Level English Language 9093',
            'A Level English Language EGP 8021', 'Edexcel A Level English Language',
            '0500', '1123', '9093', '8021', 'XEN01', 'a-levels', 'EGP', 
            'igcse', 'o-level', 'a-level'
          ]);
        } else if (error.message.includes('study_goals_type_check')) {
          toast({
            title: "Goal Type Constraint Error",
            description: `The goal type "${mappedGoalType}" is not allowed by database constraint.`,
            variant: "destructive"
          });
          console.log('Goal Type constraint violation for value:', mappedGoalType);
          console.log('Allowed goal type values in database:', ['papers', 'examples', 'vocabulary', 'complete']);
          console.log('Your mapping:', GOAL_TYPE_MAPPING);
        } else {
          toast({
            title: "Database Constraint Error",
            description: `Constraint violation: ${error.message}`,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
      return;
    }

    toast({ 
      title: "Success!",
      description: `${isPractice ? 'Practice' : 'Study'} goal created successfully!`
    });
    
    setShowCreateForm(false);
    setNewGoal({
      name: '',
      type: pageContext === 'resources' ? 'Master Resource' : 'Complete Variants',
      target: pageContext === 'resources' ? 1 : 10,
      examType: selectedExam?.id || 'IGCSE English (0500)',
      resourceId: ''
    });
    loadGoals();
    onGoalUpdate?.();
  };

  const deleteGoal = async (goalId: string) => {
    const { error } = await supabase
      .from('study_goals')
      .delete()
      .eq('id', goalId)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({ title: "Goal deleted" });
    loadGoals();
    onGoalUpdate?.();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  // No display mapping needed - use exam_level directly

  const renderResourceGoalCard = (goal: StudyGoal) => {
    return (
      <Card key={goal.id} className={`transition-all duration-300 ${goal.completed ? 'bg-green-50 border-green-200' : 'border-blue-200'}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg font-inter flex items-center gap-2">
                {goal.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                {goal.goal_name}
              </CardTitle>
              <div className="mt-1 space-y-1">
                <p className="text-sm text-muted-foreground">
                  Target Resource • {goal.exam_level}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Created {formatDate(goal.created_at)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteGoal(goal.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {goal.completed ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Trophy className="h-4 w-4" />
                  <span className="font-semibold">Completed ✓</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-blue-600">
                  <Target className="h-4 w-4" />
                  <span className="font-semibold">In Progress</span>
                </div>
              )}
            </div>
            {goal.completed && (
              <span className="text-xs text-green-600">
                Completed {getTimeAgo(goal.created_at)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPracticeGoalCard = (goal: StudyGoal) => {
    const progressPercentage = goal.progress ? 
      ((goal.progress.completed || 0) / (goal.progress.target || 1)) * 100 : 0;
    const completed = goal.progress?.completed || 0;
    const target = goal.progress?.target || 0;
    
    const isNearComplete = completed === target - 1 && !goal.completed;
    const encouragementText = goal.completed ? 
      'Goal Achieved!' : 
      isNearComplete ? 
        'Almost there!' : 
        `${target - completed} more to go!`;

    return (
      <Card key={goal.id} className={`transition-all duration-300 ${
        goal.completed ? 'bg-green-50 border-green-200' : 
        isNearComplete ? 'bg-amber-50 border-amber-200' : 
        'border-blue-200'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg font-inter flex items-center gap-2">
                {goal.completed && <Trophy className="h-5 w-5 text-green-600" />}
                {goal.goal_name}
              </CardTitle>
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {completed}/{target}
                  </span>
                  <span className="text-sm text-muted-foreground">completed</span>
                </div>
                <p className="text-sm font-medium mt-1 text-muted-foreground">
                  {encouragementText}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteGoal(goal.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress 
              value={progressPercentage} 
              className={`h-3 ${
                goal.completed ? 'progress-completed' : 
                isNearComplete ? 'progress-near-complete' : 
                'progress-active'
              }`}
            />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {goal.completed ? (
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Completed
                  </span>
                ) : isNearComplete ? (
                  <span className="text-amber-600 font-semibold">Almost There</span>
                ) : (
                  <span className="text-blue-600 font-semibold">In Progress</span>
                )}
              </div>
              <span className="text-muted-foreground">
                {goal.type} • Created {formatDate(goal.created_at)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-inter">
            <Target className="h-5 w-5" />
            {modalTitle}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              {isPractice ? 'Practice Goals' : 'Resources Goals'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Goals */}
          <div>
            <h3 className="font-semibold mb-4 text-primary font-inter">
              {isPractice ? 'Practice Progress' : 'Learning Goals'}
            </h3>
            {goals.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-inter">
                  No active {isPractice ? 'practice' : 'study'} goals. Create one below!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => 
                  isPractice ? renderPracticeGoalCard(goal) : renderResourceGoalCard(goal)
                )}
              </div>
            )}
          </div>

          {/* Create New Goal */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-primary font-inter">
                Create New {isPractice ? 'Practice' : 'Study'} Goal
              </h3>
              {!showCreateForm && (
                <Button onClick={() => setShowCreateForm(true)} className="font-inter">
                  <Plus className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              )}
            </div>

            {showCreateForm && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="goalName" className="font-inter">Goal Name:</Label>
                    <Input
                      id="goalName"
                      placeholder={isPractice ? "e.g., Complete 10 English Variants" : "e.g., Master IGCSE Examples"}
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      className="font-inter"
                    />
                  </div>

                  <div>
                    <Label htmlFor="goalType" className="font-inter">Goal Type:</Label>
                    <Select value={newGoal.type} onValueChange={(value) => setNewGoal({ ...newGoal, type: value })}>
                      <SelectTrigger className="font-inter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {isPractice ? (
                          <>
                            <SelectItem value="Complete Variants">Complete Variants</SelectItem>
                            <SelectItem value="Complete Sessions">Complete Sessions</SelectItem>
                            <SelectItem value="Complete Papers">Complete Papers</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="Master Resource">Master Resource</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {isPractice && (
                    <div>
                      <Label htmlFor="targetNumber" className="text-primary font-inter">Target Quantity:</Label>
                      <Input
                        id="targetNumber"
                        type="number"
                        placeholder="e.g., 10"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                        className="font-inter"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="examType" className="font-inter">Exam Type:</Label>
                    <Select value={newGoal.examType} onValueChange={(value) => setNewGoal({ ...newGoal, examType: value })}>
                      <SelectTrigger className="font-inter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IGCSE English (0500)">IGCSE English (0500)</SelectItem>
                        <SelectItem value="O Level English (1123)">O Level English (1123)</SelectItem>
                        <SelectItem value="A Levels English">A Levels English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={createGoal} className="font-inter">
                      Add Goal
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateForm(false)}
                      className="font-inter"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};