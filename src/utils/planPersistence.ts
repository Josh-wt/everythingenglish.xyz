
import { supabase } from "@/integrations/supabase/client";
import type { StudyPlan } from "./planGenerator";

export const savePlanToStorage = async (plan: StudyPlan): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Save to database for authenticated users
      const { error } = await supabase
        .from('generated_plans')
        .upsert({
          id: plan.id,
          user_id: user.id,
          plan_data: plan,
          assessment_responses: {},
          components_used: [],
          created_at: new Date().toISOString()
        });
        
      if (error) {
        console.error('Error saving plan to database:', error);
        // Fall back to localStorage
        localStorage.setItem('currentStudyPlan', JSON.stringify(plan));
      }
    } else {
      // Save to localStorage for non-authenticated users
      localStorage.setItem('currentStudyPlan', JSON.stringify(plan));
    }
  } catch (error) {
    console.error('Error in savePlanToStorage:', error);
    // Always fall back to localStorage
    localStorage.setItem('currentStudyPlan', JSON.stringify(plan));
  }
};

export const loadPlanFromStorage = async (): Promise<StudyPlan | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Try to load from database first
      const { data, error } = await supabase
        .from('generated_plans')
        .select('plan_data')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (!error && data) {
        return data.plan_data as StudyPlan;
      }
    }
    
    // Fall back to localStorage
    const savedPlan = localStorage.getItem('currentStudyPlan');
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
    
    return null;
  } catch (error) {
    console.error('Error loading plan from storage:', error);
    
    // Final fallback to localStorage
    const savedPlan = localStorage.getItem('currentStudyPlan');
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
    
    return null;
  }
};

export const clearPlanFromStorage = async (): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase
        .from('generated_plans')
        .delete()
        .eq('user_id', user.id);
    }
    
    localStorage.removeItem('currentStudyPlan');
  } catch (error) {
    console.error('Error clearing plan from storage:', error);
    localStorage.removeItem('currentStudyPlan');
  }
};
