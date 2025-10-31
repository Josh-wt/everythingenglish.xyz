import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://everythingenglish.lovable.app',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
};

interface QuizResponses {
  [key: string]: string;
}

interface StudyPlan {
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
  weeks: any[];
  milestones: any[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration missing');
    }

    const { responses } = await req.json() as { responses: QuizResponses };
    
    console.log('Starting AI plan generation for authenticated user');
    
    // Validate responses
    if (!responses || Object.keys(responses).length === 0) {
      console.warn('No responses provided, using fallback plan');
      return new Response(JSON.stringify({ 
        success: false, 
        plan: generateFallbackPlan(responses),
        fallback: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the actual numeric values from responses
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

    console.log('Generating plan with validated parameters');

    const prompt = `
You are an expert English Language tutor creating personalized IGCSE study plans.

STUDENT PROFILE:
- Reading Comprehension: ${responses.question_1 || 'B'} (A=Basic, B=Developing, C=Good, D=Advanced)
- Writing Ability: ${responses.question_2 || 'B'} (A=Basic, B=Developing, C=Good, D=Advanced)
- Analysis Skills: ${responses.question_3 || 'B'} (A=Basic, B=Developing, C=Good, D=Advanced)
- Current Grade: ${responses.question_4 || 'B'} (A=C/D level, B=B level, C=A level, D=A* level)
- Time Available: ${weeklyHours} hours per week
- Timeline: ${monthsAvailable} months (${monthsAvailable * 4} weeks)
- Main Challenge: ${responses.question_6 || 'A'} (A=Questions, B=Evidence, C=Analysis, D=Time)
- Learning Style: ${responses.question_7 || 'A'} (A=Step-by-step, B=Examples, C=Theory-first, D=Experimental)

IMPORTANT CONSTRAINTS:
- Must create exactly ${monthsAvailable * 4} weeks (${monthsAvailable} months × 4 weeks per month)
- Each week must have exactly ${weeklyHours} hours of study time
- Plan must be realistic and achievable

Create a personalized study plan with EXACTLY ${monthsAvailable * 4} weeks. Return ONLY valid JSON in this exact format:
{
  "id": "plan-${Date.now()}",
  "title": "Personalized IGCSE English Study Plan",
  "description": "${monthsAvailable}-month plan with ${weeklyHours} hours per week",
  "level": "Foundation|Developing|Proficient|Advanced",
  "totalDuration": "${monthsAvailable} months (${monthsAvailable * 4} weeks)",
  "weeklyCommitment": "${weeklyHours} hours per week",
  "timeCommitment": "${weeklyHours} hours per week",
  "focusAreas": ["Reading Comprehension", "Writing", "Analysis"],
  "focusArea": "Reading Comprehension",
  "learningStyle": "Structured",
  "timeline": "${monthsAvailable} months",
  "monthlyGoals": ["Master question interpretation", "Develop evidence-finding", "Strengthen analysis"],
  "weeks": [/* Array of exactly ${monthsAvailable * 4} weeks */],
  "milestones": [
    {
      "week": ${Math.floor((monthsAvailable * 4) * 0.33)},
      "title": "Foundation Check",
      "description": "Review progress and adjust if needed"
    },
    {
      "week": ${Math.floor((monthsAvailable * 4) * 0.66)},
      "title": "Mid-Point Assessment",
      "description": "Practice exam questions"
    },
    {
      "week": ${monthsAvailable * 4},
      "title": "Final Review",
      "description": "Complete preparation"
    }
  ]
}`;

    console.log('Sending request to OpenRouter API...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      console.error(`OpenRouter API request failed: ${response.statusText}`);
      throw new Error(`OpenRouter API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const planText = data.choices?.[0]?.message?.content;

    if (!planText) {
      console.error('No response content from AI');
      throw new Error('No response from AI');
    }

    console.log('AI response received, parsing JSON...');
    
    // Clean the response to extract JSON
    const jsonMatch = planText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No valid JSON found in AI response:', planText.substring(0, 500));
      throw new Error('No valid JSON found in AI response');
    }

    let aiPlan: StudyPlan;
    try {
      aiPlan = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Validate the parsed plan structure
    if (!aiPlan.id || !aiPlan.title || !Array.isArray(aiPlan.weeks)) {
      console.error('Invalid plan structure:', aiPlan);
      throw new Error('AI generated plan has invalid structure');
    }

    // Ensure we have the correct number of weeks
    const expectedWeeks = monthsAvailable * 4;
    if (aiPlan.weeks.length !== expectedWeeks) {
      console.warn(`AI plan has ${aiPlan.weeks.length} weeks, expected ${expectedWeeks}. Using fallback.`);
      return new Response(JSON.stringify({ 
        success: false, 
        plan: generateFallbackPlan(responses),
        fallback: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('AI plan parsed and validated successfully');
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get user from authorization header
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      
      if (user) {
        try {
          const componentsUsed = aiPlan.weeks?.flatMap((week: any) => 
            week.components?.map((comp: any) => comp.componentId) || []
          ) || [];

          await supabase
            .from('generated_plans')
            .insert({
              user_id: user.id,
              assessment_responses: responses,
              plan_data: aiPlan,
              components_used: componentsUsed,
              generation_prompt: prompt.substring(0, 1000),
              ai_model: 'moonshotai/kimi-k2:free',
            });
          console.log('Plan saved to database successfully');
        } catch (dbError) {
          console.error('Error saving to database:', dbError);
          // Don't throw here - plan generation succeeded, saving failed
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      plan: aiPlan,
      fallback: false 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI plan generation failed:', error);
    
    // Try to get responses from request for fallback
    let responses: QuizResponses = {};
    try {
      const body = await req.json();
      responses = body.responses || {};
    } catch {
      // Use empty responses
    }

    return new Response(JSON.stringify({ 
      success: false, 
      plan: generateFallbackPlan(responses),
      fallback: true,
      error: 'Failed to generate plan. Please try again.' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});

function generateFallbackPlan(responses: QuizResponses): StudyPlan {
  console.log('Generating fallback plan');
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
  
  console.log('Fallback plan parameters validated');
  
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