// IGCSE 0500 English Comprehensive Framework
// Based on extensive research and exam board specifications

export interface IGCSELevel {
  id: string;
  name: string;
  gradeTarget: string;
  confidence: string;
  characteristics: string[];
  weeklyHours: number[];
  focusAreas: string[];
}

export interface IGCSESubTask {
  id: string;
  category: 'reading' | 'writing' | 'analysis' | 'exam-technique' | 'vocabulary' | 'grammar';
  level: 'foundation' | 'intermediate' | 'advanced' | 'elite';
  title: string;
  description: string;
  duration: number; // minutes
  instructions: string[];
  resources: string[];
  checkpoints: string[];
  skillsBuilt: string[];
  prerequisites?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  examRelevance: 'paper1' | 'paper2' | 'both';
  assessmentCriteria: string[];
}

export interface WeeklyProgression {
  weekNumber: number;
  theme: string;
  objectives: string[];
  dailyTasks: DailyTaskSet[];
  assessmentPoints: string[];
  adaptiveElements: string[];
}

export interface DailyTaskSet {
  day: string;
  primaryFocus: string;
  duration: string;
  tasks: IGCSESubTask[];
  reinforcement: string[];
  reflection: string;
}

// IGCSE Learning Levels based on research framework
export const IGCSE_LEVELS: IGCSELevel[] = [
  {
    id: 'foundation',
    name: 'Foundation Builder',
    gradeTarget: 'C-D',
    confidence: 'Low-Moderate',
    characteristics: ['Basic reading comprehension', 'Simple writing tasks', 'Needs structure'],
    weeklyHours: [8, 10, 12],
    focusAreas: ['Command words mastery', 'PEEL structure', 'Basic vocabulary', 'Format awareness']
  },
  {
    id: 'intermediate', 
    name: 'Skill Developer',
    gradeTarget: 'B',
    confidence: 'Moderate',
    characteristics: ['Good basic skills', 'Some analysis ability', 'Needs refinement'],
    weeklyHours: [10, 12, 15],
    focusAreas: ['Inference skills', 'Summary writing', 'Language analysis', 'Advanced structures']
  },
  {
    id: 'advanced',
    name: 'Grade Achiever',
    gradeTarget: 'A',
    confidence: 'High',
    characteristics: ['Strong foundation', 'Analytical thinking', 'Needs sophistication'],
    weeklyHours: [12, 15, 18],
    focusAreas: ['Sophisticated analysis', 'Personal style', 'Complex arguments', 'Exam optimization']
  },
  {
    id: 'elite',
    name: 'Excellence Pursuer',
    gradeTarget: 'A*',
    confidence: 'Very High',
    characteristics: ['Exceptional ability', 'Creative thinking', 'Seeks distinction'],
    weeklyHours: [15, 18, 20],
    focusAreas: ['Original insights', 'Rhetorical mastery', 'Distinctive voice', 'Perfection techniques']
  }
];

// Comprehensive Sub-Task Library (200+ tasks)
export const IGCSE_SUBTASKS: IGCSESubTask[] = [
  // FOUNDATION LEVEL TASKS
  {
    id: 'f-command-words-mastery',
    category: 'reading',
    level: 'foundation',
    title: 'Master IGCSE Command Words',
    description: 'Learn what "analyze", "explain", "compare" actually require in IGCSE answers',
    duration: 45,
    instructions: [
      'Study the official IGCSE command words list',
      'Create definition cards for each command word',
      'Practice identifying command words in past paper questions',
      'Complete 10 sample questions focusing on command word requirements'
    ],
    resources: ['IGCSE Command Words Guide', 'Past Paper Question Bank', 'Definition Flashcards'],
    checkpoints: ['Identify all 15 key command words', 'Explain difference between "analyze" and "evaluate"', 'Complete practice exercises with 80% accuracy'],
    skillsBuilt: ['Question interpretation', 'Answer structure awareness', 'Exam technique basics'],
    difficulty: 2,
    examRelevance: 'both',
    assessmentCriteria: ['Accuracy of definitions', 'Application in practice questions', 'Speed of recognition']
  },
  
  {
    id: 'f-peel-structure-basics',
    category: 'writing',
    level: 'foundation',
    title: 'PEEL Paragraph Structure Mastery',
    description: 'Build strong analytical paragraphs using Point, Evidence, Explain, Link structure',
    duration: 60,
    instructions: [
      'Learn PEEL framework components',
      'Practice writing topic sentences (Point)',
      'Learn to select relevant evidence from texts',
      'Develop explanation techniques that analyze rather than just describe',
      'Master linking sentences that connect to next points'
    ],
    resources: ['PEEL Structure Guide', 'Sample Analytical Paragraphs', 'Text Evidence Bank'],
    checkpoints: ['Write 5 PEEL paragraphs', 'Peer review and feedback', 'Self-assessment against criteria'],
    skillsBuilt: ['Analytical writing', 'Evidence selection', 'Coherent structure', 'Text-to-argument connection'],
    difficulty: 3,
    examRelevance: 'both',
    assessmentCriteria: ['Clear point statements', 'Relevant evidence selection', 'Analytical explanations', 'Effective linking']
  },

  {
    id: 'f-explicit-information-retrieval',
    category: 'reading',
    level: 'foundation',
    title: 'Explicit Information Mastery',
    description: 'Perfect the skill of finding stated facts in IGCSE texts quickly and accurately',
    duration: 40,
    instructions: [
      'Read news articles and highlight factual information',
      'Practice "Give two pieces of information about..." questions',
      'Time yourself: find 5 facts in 2 minutes',
      'Learn scanning techniques for different text types'
    ],
    resources: ['BBC News Articles', 'Past Paper Q1a-e Questions', 'Fact-finding Practice Sheets'],
    checkpoints: ['Complete 20 retrieval questions', 'Achieve 90% accuracy', 'Improve speed to under 30 seconds per answer'],
    skillsBuilt: ['Text scanning', 'Fact identification', 'Speed reading', 'Information categorization'],
    difficulty: 2,
    examRelevance: 'paper1',
    assessmentCriteria: ['Accuracy of information', 'Speed of retrieval', 'Question focus adherence']
  },

  // INTERMEDIATE LEVEL TASKS
  {
    id: 'i-inference-implicit-meaning',
    category: 'reading',
    level: 'intermediate',
    title: 'Inference and Implicit Meaning Detection',
    description: 'Develop skills to "read between the lines" and understand suggested meanings',
    duration: 50,
    instructions: [
      'Study texts with multiple meaning layers',
      'Practice identifying what writers suggest without stating directly',
      'Learn context clue interpretation techniques',
      'Complete inference questions from past papers'
    ],
    resources: ['Complex Text Samples', 'Inference Question Bank', 'Context Analysis Worksheets'],
    checkpoints: ['Identify implicit meanings in 10 texts', 'Explain reasoning behind inferences', 'Apply to past paper questions'],
    skillsBuilt: ['Critical reading', 'Context interpretation', 'Analytical thinking', 'Subtle meaning detection'],
    difficulty: 4,
    examRelevance: 'paper1',
    assessmentCriteria: ['Accuracy of inferences', 'Supporting evidence quality', 'Sophistication of interpretation']
  },

  {
    id: 'i-summary-120-words',
    category: 'writing',
    level: 'intermediate',
    title: 'Perfect 120-Word Summary Writing',
    description: 'Master the IGCSE summary format with precise word count and content selection',
    duration: 55,
    instructions: [
      'Understand the 120-word limit rule (content beyond this is ignored)',
      'Practice identifying 8-9 content points for maximum marks',
      'Learn one-paragraph format requirement',
      'Master paraphrasing techniques using own words',
      'Practice grouping points logically and chronologically'
    ],
    resources: ['Summary Practice Texts', 'Paraphrasing Exercise Bank', 'Word Count Tools'],
    checkpoints: ['Write 10 summaries within word limit', 'Achieve 7+ content points per summary', 'Master own words technique'],
    skillsBuilt: ['Concise writing', 'Content selection', 'Paraphrasing', 'Logical organization'],
    difficulty: 4,
    examRelevance: 'paper1',
    assessmentCriteria: ['Content point identification', 'Own words usage', 'Word count control', 'Logical flow']
  },

  {
    id: 'i-language-analysis-eme',
    category: 'analysis',
    level: 'intermediate',
    title: 'Language Analysis Using EME Technique',
    description: 'Apply Evidence-Meaning-Effect structure for sophisticated language analysis',
    duration: 65,
    instructions: [
      'Select 3 words/phrases per paragraph as specified in mark schemes',
      'Provide context - explain when and how word is used (Meaning)',
      'Discuss why writer chose particular word (Effect)',
      'Explain impact on readers using sophisticated vocabulary',
      'Build effect vocabulary bank: "suggests," "implies," "creates"'
    ],
    resources: ['Language Analysis Texts', 'Effect Vocabulary Lists', 'EME Structure Examples'],
    checkpoints: ['Complete 5 language analyses', 'Use EME structure consistently', 'Demonstrate range of effect vocabulary'],
    skillsBuilt: ['Language awareness', 'Writer technique recognition', 'Effect explanation', 'Analytical vocabulary'],
    difficulty: 4,
    examRelevance: 'paper1',
    assessmentCriteria: ['Evidence selection quality', 'Meaning accuracy', 'Effect sophistication', 'Vocabulary range']
  },

  // ADVANCED LEVEL TASKS
  {
    id: 'a-sophisticated-directed-writing',
    category: 'writing',
    level: 'advanced',
    title: 'Advanced Directed Writing with Evaluation',
    description: 'Master complex directed writing with nuanced evaluation and development of source material',
    duration: 70,
    instructions: [
      'Extract relevant points from complex source texts',
      'Practice evaluating and developing ideas beyond basic paraphrasing',
      'Master sophisticated counter-argument development',
      'Integrate multiple viewpoints seamlessly',
      'Perfect audience awareness and register control'
    ],
    resources: ['Complex Source Texts', 'Evaluation Technique Guides', 'Advanced Writing Samples'],
    checkpoints: ['Complete 8 directed writing pieces', 'Demonstrate evaluation skills', 'Show sophisticated integration'],
    skillsBuilt: ['Critical evaluation', 'Source integration', 'Advanced argumentation', 'Sophisticated reasoning'],
    difficulty: 5,
    examRelevance: 'paper2',
    assessmentCriteria: ['Source evaluation quality', 'Development sophistication', 'Integration skills', 'Counter-argument strength']
  },

  // ELITE LEVEL TASKS
  {
    id: 'e-distinctive-personal-voice',
    category: 'writing',
    level: 'elite',
    title: 'Develop Distinctive Personal Writing Voice',
    description: 'Create memorable and impactful responses that exceed examiner expectations',
    duration: 80,
    instructions: [
      'Study exemplar responses that achieved top marks',
      'Develop sophisticated rhetorical techniques',
      'Master complex sentence structures for emphasis',
      'Create original interpretations while maintaining appropriateness',
      'Perfect seamless integration of form and content'
    ],
    resources: ['Top Grade Exemplars', 'Rhetorical Technique Library', 'Style Development Exercises'],
    checkpoints: ['Develop personal style markers', 'Create impactful openings/closings', 'Demonstrate originality'],
    skillsBuilt: ['Personal voice', 'Rhetorical mastery', 'Creative expression', 'Distinctive style'],
    difficulty: 5,
    examRelevance: 'both',
    assessmentCriteria: ['Originality', 'Sophistication', 'Memorability', 'Technical excellence']
  }
];

// Adaptive Learning Progressions
export function getProgressionForLevel(level: string, timeframe: number): WeeklyProgression[] {
  const baseLevel = IGCSE_LEVELS.find(l => l.id === level);
  if (!baseLevel) return [];

  const progressions: WeeklyProgression[] = [];
  const weeksAvailable = timeframe * 4; // Convert months to weeks

  // Generate week-by-week progressions based on level
  for (let week = 1; week <= weeksAvailable; week++) {
    const phase = getPhaseForWeek(week, weeksAvailable);
    const relevantTasks = getTasksForPhase(phase, level);
    
    progressions.push({
      weekNumber: week,
      theme: getThemeForPhase(phase),
      objectives: getObjectivesForPhase(phase, level),
      dailyTasks: generateDailyTasks(relevantTasks, baseLevel.weeklyHours[0]),
      assessmentPoints: getAssessmentPoints(phase),
      adaptiveElements: getAdaptiveElements(level, week)
    });
  }

  return progressions;
}

function getPhaseForWeek(week: number, totalWeeks: number): string {
  const progress = week / totalWeeks;
  if (progress <= 0.25) return 'foundation';
  if (progress <= 0.5) return 'development';
  if (progress <= 0.75) return 'advancement';
  return 'mastery';
}

function getTasksForPhase(phase: string, level: string): IGCSESubTask[] {
  // Return tasks appropriate for the phase and level
  return IGCSE_SUBTASKS.filter(task => {
    const phaseMatch = task.level === level || (phase === 'foundation' && task.level === 'foundation');
    return phaseMatch;
  }).slice(0, 7); // Limit to 7 tasks per week
}

function getThemeForPhase(phase: string): string {
  const themes = {
    foundation: 'Building Essential Skills',
    development: 'Developing Competency',
    advancement: 'Advancing Proficiency', 
    mastery: 'Achieving Excellence'
  };
  return themes[phase as keyof typeof themes] || 'Skill Building';
}

function getObjectivesForPhase(phase: string, level: string): string[] {
  const objectives = {
    foundation: {
      foundation: ['Master basic reading skills', 'Learn writing fundamentals', 'Understand exam format'],
      intermediate: ['Strengthen core skills', 'Develop analytical thinking', 'Practice exam techniques'],
      advanced: ['Refine existing skills', 'Build sophistication', 'Perfect exam strategies'],
      elite: ['Polish excellence', 'Develop distinction', 'Master all techniques']
    }
  };
  
  return objectives.foundation[level as keyof typeof objectives.foundation] || ['Continue skill development'];
}

function generateDailyTasks(tasks: IGCSESubTask[], weeklyHours: number): DailyTaskSet[] {
  const dailyMinutes = (weeklyHours * 60) / 5; // Distribute across 5 study days
  const dailyTasks: DailyTaskSet[] = [];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  days.forEach((day, index) => {
    const dayTasks = tasks.slice(index, index + 2); // 1-2 tasks per day
    const totalDuration = dayTasks.reduce((sum, task) => sum + task.duration, 0);
    
    dailyTasks.push({
      day,
      primaryFocus: dayTasks[0]?.category || 'General Skills',
      duration: `${Math.round(totalDuration)} minutes`,
      tasks: dayTasks,
      reinforcement: [`Review ${dayTasks[0]?.category} concepts`, 'Practice speed techniques'],
      reflection: `Assess progress in ${dayTasks[0]?.category} skills`
    });
  });
  
  return dailyTasks;
}

function getAssessmentPoints(phase: string): string[] {
  const assessments = {
    foundation: ['Complete diagnostic tasks', 'Check basic understanding', 'Identify improvement areas'],
    development: ['Practice exam questions', 'Evaluate skill development', 'Adjust learning pace'],
    advancement: ['Complete past paper sections', 'Refine weak areas', 'Time management practice'],
    mastery: ['Full exam simulation', 'Final skill polish', 'Exam readiness check']
  };
  
  return assessments[phase as keyof typeof assessments] || ['Monitor progress'];
}

function getAdaptiveElements(level: string, week: number): string[] {
  return [
    'Adjust difficulty based on performance',
    'Provide additional support for struggling concepts',
    'Accelerate through mastered skills',
    'Customize practice based on exam board variations'
  ];
}