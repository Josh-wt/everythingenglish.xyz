
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Target, Loader2 } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface ResourceGoalButtonProps {
  resourceId: string;
  resourceTitle: string;
  user: User | null;
  onGoalUpdate?: () => void;
}

interface ResourceGoal {
  id: string;
  goal_name: string;
  completed: boolean;
  created_at: string;
  exam_level: string;
  type: string;
  target_resource_id: string;
}

export const ResourceGoalButton = ({ 
  resourceId, 
  resourceTitle, 
  user,
  onGoalUpdate 
}: ResourceGoalButtonProps) => {
  const [goal, setGoal] = useState<ResourceGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      loadResourceGoal();
    } else {
      setLoading(false);
    }
  }, [user, resourceId]);

  const loadResourceGoal = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('study_goals')
        .select('id, goal_name, completed, created_at, exam_level, type, target_resource_id')
        .eq('user_id', user.id)
        .eq('type', 'Master Resource')
        .eq('target_resource_id', resourceId)
        .maybeSingle();

      if (error) {
        console.error('Error loading resource goal:', error);
        return;
      }

      if (data) {
        setGoal({
          id: data.id,
          goal_name: data.goal_name || '',
          completed: data.completed || false,
          created_at: data.created_at,
          exam_level: data.exam_level,
          type: data.type,
          target_resource_id: data.target_resource_id || ''
        });
      }
    } catch (error) {
      console.error('Error in loadResourceGoal:', error);
    } finally {
      setLoading(false);
    }
  };

  const markGoalComplete = async () => {
    if (!user || !goal) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('study_goals')
        .update({ 
          completed: true,
          progress: { completed: 1, target: 1 }
        })
        .eq('id', goal.id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Update local state
      setGoal({ ...goal, completed: true });

      // Show success toast
      toast({
        title: "Goal Completed! 🎉",
        description: `You've mastered ${resourceTitle}!`,
      });

      // Call callback to update parent components
      onGoalUpdate?.();

    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Don't render if no user
  if (!user) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="w-full mt-4">
        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gray-50 border border-gray-200">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-gray-600">Loading goal...</span>
        </div>
      </div>
    );
  }

  // Don't render if no goal exists for this resource
  if (!goal) {
    return null;
  }

  // If goal is already completed, show completed state
  if (goal.completed) {
    return (
      <div className="w-full mt-4">
        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-50 border border-green-200 text-green-700 font-inter">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Goal Completed ✓</span>
        </div>
      </div>
    );
  }

  // Show mark complete button
  return (
    <div className="w-full mt-4">
      <Button
        onClick={markGoalComplete}
        disabled={isUpdating}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-inter font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isUpdating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Marking Complete...
          </>
        ) : (
          <>
            <Target className="h-4 w-4 mr-2" />
            Mark Goal Complete
          </>
        )}
      </Button>
    </div>
  );
};
