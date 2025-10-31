
import { useStudyGoals } from '@/hooks/useStudyGoals';
import { User } from '@supabase/supabase-js';
import { Badge } from '@/components/ui/badge';

interface PracticeGoalProgressProps {
  user: User | null;
  examType: string;
  onVariantComplete?: (goalId: string) => void;
}

export const PracticeGoalProgress = ({ user, examType }: PracticeGoalProgressProps) => {
  const { goals } = useStudyGoals(user, 'practice');

  const activeGoals = goals.filter(goal => 
    !goal.completed && 
    goal.exam_level === examType &&
    ['Complete Variants', 'Complete Sessions', 'Complete Papers'].includes(goal.type)
  );

  if (!user || activeGoals.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-2">
      <h3 className="text-sm font-medium text-gray-700 font-inter">Active Goals</h3>
      <div className="flex flex-wrap gap-2">
        {activeGoals.map(goal => (
          <Badge
            key={goal.id}
            variant="outline"
            className="bg-blue-50 border-blue-200 text-blue-700 font-inter"
          >
            {goal.goal_name}: {goal.progress.completed}/{goal.progress.target}
          </Badge>
        ))}
      </div>
    </div>
  );
};
