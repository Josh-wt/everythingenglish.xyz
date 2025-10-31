import type { QuizResponses, StudyPlan } from "./planGenerator";
import { supabase } from "@/integrations/supabase/client";

export interface StudyComponent {
  id: string;
  level: string;
  category: string;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  skills: string[];
  resources: string[];
  prerequisites: string[];
  follow_up: string[];
}

export async function fetchStudyComponents(): Promise<StudyComponent[]> {
  const { data, error } = await supabase
    .from('study_components')
    .select('*');
  
  if (error) {
    console.error('Error fetching study components:', error);
    return [];
  }
  
  return data || [];
}

export async function generateAIPlan(responses: QuizResponses): Promise<StudyPlan> {
  try {
    console.log('Calling secure edge function for AI plan generation...');
    
    // Validate responses first
    if (!responses || Object.keys(responses).length === 0) {
      console.warn('No responses provided, using fallback plan');
      return generateFallbackPlan(responses);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn('No authenticated user, using fallback plan');
      return generateFallbackPlan(responses);
    }

    // Call the secure edge function
    const { data, error } = await supabase.functions.invoke('generate-plan', {
      body: { responses }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Plan generation failed: ${error.message}`);
    }

    if (!data?.success) {
      console.warn('Plan generation failed, using fallback');
      return data?.plan || generateFallbackPlan(responses);
    }

    console.log('AI plan generated successfully via edge function');
    return data.plan;
  } catch (error) {
    console.error('AI plan generation failed:', error);
    console.log('Falling back to default plan...');
    return generateFallbackPlan(responses);
  }
}

function generateFallbackPlan(responses: QuizResponses): StudyPlan {
  console.log('Generating fallback plan with responses:', responses);
  const planId = `fallback-${Date.now()}`;
  
  // Parse the actual values from responses
  let monthsAvailable = 3;
  let weeklyHours = 6;
  
  const timelineResponse = responses.question_8 || 'months:3';
  if (timelineResponse.includes('months:')) {
    monthsAvailable = parseInt(timelineResponse.split(':')[1]) || 3;
  }
  
  const hoursResponse = responses.question_5 || 'hours:6';
  if (hoursResponse.includes('hours:')) {
    weeklyHours = parseInt(hoursResponse.split(':')[1]) || 6;
  }

  const weeksAvailable = monthsAvailable * 4;
  
  console.log(`Fallback plan: ${monthsAvailable} months (${weeksAvailable} weeks), ${weeklyHours} hours/week`);
  
  // Generate the correct number of weeks
  const weeks = [];
  for (let i = 0; i < weeksAvailable; i++) {
    const weekNumber = i + 1;
    let theme = "Foundation Building";
    
    if (i < weeksAvailable * 0.25) theme = "Foundation Building";
    else if (i < weeksAvailable * 0.5) theme = "Skill Development";
    else if (i < weeksAvailable * 0.75) theme = "Advanced Practice";
    else theme = "Exam Preparation";
    
    weeks.push({
      weekNumber: `Week ${weekNumber}`,
      theme: theme,
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
            "Complete practice exercises",
            "Test understanding with sample questions"
          ]
        }
      ]
    });
  }
  
  return {
    id: planId,
    title: "Essential IGCSE English Study Plan",
    description: `A comprehensive ${monthsAvailable}-month study plan with ${weeklyHours} hours per week`,
    level: "Developing",
    totalDuration: `${monthsAvailable} months (${weeksAvailable} weeks)`,
    weeklyCommitment: `${weeklyHours} hours per week`,
    timeCommitment: `${weeklyHours} hours per week`,
    focusAreas: ["Reading Comprehension", "Essay Writing", "Language Analysis"],
    focusArea: "Reading Comprehension",
    learningStyle: "Structured",
    timeline: `${monthsAvailable} months`,
    monthlyGoals: [
      "Master question interpretation and command words",
      "Develop systematic evidence-finding techniques", 
      "Strengthen analytical writing skills"
    ],
    weeks: weeks,
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
}

export async function customizeComponent(
  component: StudyComponent, 
  userProfile: any, 
  context: any
): Promise<StudyComponent> {
  // For now, return the component as-is
  // TODO: Implement component customization via edge function
  console.warn('Component customization not yet implemented with edge functions');
  return component;
}

export async function adaptPlanBasedOnProgress(
  userId: string,
  currentProgress: any,
  strugglingAreas: string[]
): Promise<any> {
  // For now, return null (no adaptation)
  // TODO: Implement plan adaptation via edge function
  console.warn('Plan adaptation not yet implemented with edge functions');
  return null;
}
