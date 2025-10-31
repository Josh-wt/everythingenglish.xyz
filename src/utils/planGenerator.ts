import { supabase } from "@/integrations/supabase/client";

export type QuizResponses = {
  question_1?: string;
  question_2?: string;
  question_3?: string;
  question_4?: string;
  question_5?: string;
  question_6?: string;
  question_7?: string;
  question_8?: string;
};

export type StudyPlan = {
  id: string;
  title: string;
  description: string;
  level: string;
  totalDuration: string;
  weeklyCommitment: string;
  timeCommitment: string;
  focusAreas: string[];
  focusArea: string;
  learningStyle: string;
  timeline: string;
  monthlyGoals: string[];
  weeks: {
    weekNumber: string;
    theme: string;
    focus?: string;
    totalHours: string;
    dailySchedule: {
      day: string;
      mainTask: string;
      duration: string;
      subtasks: {
        id: string;
        title: string;
        description: string;
        duration: string;
        resources: string[];
        checkpoints: string[];
      }[];
    }[];
    components?: {
      componentId: string;
      title: string;
      description: string;
      duration: number;
      day: number;
      completed: boolean;
      subtasks: string[];
    }[];
  }[];
  milestones: {
    week: number;
    title: string;
    description: string;
  }[];
};

export const generateStudyPlan = (responses: QuizResponses): StudyPlan => {
  const planId = `fallback-${Date.now()}`;
  
  console.log('Generating study plan with responses:', responses);
  
  // Extract actual numeric values from responses
  let monthsAvailable = 3; // default
  let weeklyHours = 6; // default
  
  // Parse timeline response - look for actual numeric data first
  const timelineResponse = responses.question_8 || 'months:3';
  if (timelineResponse.includes('months:')) {
    monthsAvailable = parseInt(timelineResponse.split(':')[1]) || 3;
  } else {
    // Legacy MCQ mapping
    switch (timelineResponse) {
      case 'A': monthsAvailable = 6; break;
      case 'B': monthsAvailable = 3; break; 
      case 'C': monthsAvailable = 2; break;
      case 'D': monthsAvailable = 1; break;
    }
  }

  // Parse hours response - look for actual numeric data first
  const hoursResponse = responses.question_5 || 'hours:6';
  if (hoursResponse.includes('hours:')) {
    weeklyHours = parseInt(hoursResponse.split(':')[1]) || 6;
  } else {
    // Legacy MCQ mapping
    switch (hoursResponse) {
      case 'A': weeklyHours = 4; break;
      case 'B': weeklyHours = 7; break;
      case 'C': weeklyHours = 12; break;
      case 'D': weeklyHours = 18; break;
    }
  }

  const weeksAvailable = monthsAvailable * 4; // 1 month = 4 weeks exactly
  
  console.log(`Plan parameters: ${monthsAvailable} months (${weeksAvailable} weeks), ${weeklyHours} hours/week`);

  // Generate weeks based on actual timeline
  const generateWeeks = (totalWeeks: number) => {
    const weeks = [];
    
    for (let i = 0; i < totalWeeks; i++) {
      const weekNumber = i + 1;
      let theme = "Foundation Building";
      
      // Determine theme based on progression
      if (i < totalWeeks * 0.25) {
        theme = "Foundation Building";
      } else if (i < totalWeeks * 0.5) {
        theme = "Skill Development";
      } else if (i < totalWeeks * 0.75) {
        theme = "Advanced Practice";
      } else {
        theme = "Exam Preparation";
      }
      
      const week = {
        weekNumber: `Week ${weekNumber}`,
        theme: theme,
        focus: weekNumber <= 4 ? "Question Understanding" : weekNumber <= 8 ? "Evidence Finding" : "Analysis Skills",
        totalHours: `${weeklyHours} hours`,
        dailySchedule: [
          {
            day: "Monday", 
            mainTask: "Master Command Words",
            duration: "60 minutes",
            subtasks: [
              {
                id: `understand-command-words-w${weekNumber}`,
                title: "Master Question Command Words", 
                description: "Learn what 'analyze', 'explain', 'compare' actually require",
                duration: "60 minutes",
                resources: ["command-words-guide", "practice-examples"],
                checkpoints: ["Identify 5 key command words", "Complete practice exercises"]
              }
            ]
          }
        ],
        components: [
          {
            componentId: `understand-command-words-w${weekNumber}`,
            title: "Master Question Command Words",
            description: "Learn what 'analyze', 'explain', 'compare' actually require", 
            duration: 60,
            day: 1,
            completed: false,
            subtasks: [
              "Study command words guide",
              "Complete practice exercises"
            ]
          }
        ]
      };
      
      weeks.push(week);
    }
    
    return weeks;
  };
  
  return {
    id: planId,
    title: "IGCSE English Study Plan",
    description: `A comprehensive ${monthsAvailable}-month study plan tailored to your needs`,
    level: determineLevelFromResponses(responses),
    totalDuration: `${monthsAvailable} months (${weeksAvailable} weeks)`,
    weeklyCommitment: `${weeklyHours} hours per week`,
    timeCommitment: `${weeklyHours} hours per week`,
    focusAreas: ["Reading", "Writing", "Analysis"],
    focusArea: "Reading",
    learningStyle: "Structured",
    timeline: `${monthsAvailable} months`,
    monthlyGoals: [
      "Master question interpretation and command words",
      "Develop systematic evidence-finding techniques",
      "Strengthen analytical writing skills"
    ],
    weeks: generateWeeks(weeksAvailable),
    milestones: [
      {
        week: Math.floor(weeksAvailable * 0.33),
        title: "Foundation Check",
        description: "Review basic skills and adjust plan as needed"
      },
      {
        week: Math.floor(weeksAvailable * 0.66),
        title: "Mid-Point Assessment", 
        description: "Practice exam questions and evaluate progress"
      },
      {
        week: weeksAvailable,
        title: "Final Review",
        description: "Complete practice exam and final preparation"
      }
    ]
  };
};

function determineLevelFromResponses(responses: QuizResponses): string {
  const readingLevel = responses.question_1 || 'B';
  const writingLevel = responses.question_2 || 'B';
  const analysisLevel = responses.question_3 || 'B';
  
  const levels = [readingLevel, writingLevel, analysisLevel];
  const avgLevel = levels.filter(l => l === 'A').length > 0 ? 'Foundation' :
                  levels.filter(l => l === 'D').length > 1 ? 'Advanced' :
                  levels.filter(l => l === 'C').length > 1 ? 'Proficient' : 'Developing';
  
  return avgLevel;
}

// Assessment responses are now saved in the generated_plans table in the Edge Function

export const saveTaskProgress = async (
  planId: string,
  taskId: string,
  completed: boolean,
  subtaskId?: string,
  notes?: string,
  timeSpent?: number
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        plan_id: planId,
        task_id: taskId,
        subtask_id: subtaskId,
        completed,
        notes,
        time_spent: timeSpent,
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving task progress:', error);
    throw error;
  }
};

export const getUserProgress = async (planId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('plan_id', planId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading user progress:', error);
    throw error;
  }
};
