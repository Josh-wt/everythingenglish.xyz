
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface StudyGoal {
  id: string;
  goal_name: string;
  type: string;
  exam_level: string;
  progress: { completed: number; target: number };
  completed: boolean;
  target_date: string | null;
  created_at: string;
  target_resource_id?: string;
  user_id: string;
}

export const useStudyGoals = (user: User | null, context: 'practice' | 'resources' = 'practice') => {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user, context]);

  const loadGoals = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let query = supabase
        .from('study_goals')
        .select('id, goal_name, type, exam_level, progress, completed, target_date, created_at, target_resource_id, user_id')
        .eq('user_id', user.id);

      // Filter by goal type based on context
      if (context === 'resources') {
        query = query.eq('type', 'Master Resource');
      } else {
        query = query.in('type', ['Complete Variants', 'Complete Sessions', 'Complete Papers']);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading goals:', error);
        return;
      }

      const mappedGoals: StudyGoal[] = (data || []).map(goal => ({
        id: goal.id,
        goal_name: goal.goal_name || '',
        type: goal.type,
        exam_level: goal.exam_level,
        progress: typeof goal.progress === 'object' && goal.progress ? 
          goal.progress as { completed: number; target: number } : 
          { completed: 0, target: 1 },
        completed: goal.completed || false,
        target_date: goal.target_date,
        created_at: goal.created_at,
        target_resource_id: goal.target_resource_id || undefined,
        user_id: goal.user_id
      }));

      setGoals(mappedGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshGoals = () => {
    loadGoals();
  };

  return {
    goals,
    loading,
    refreshGoals
  };
};
