
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  PenTool, 
  Search, 
  Target,
  Clock,
  Calendar,
  Zap,
  Brain
} from "lucide-react";
import type { QuizResponses } from "@/utils/planGenerator";

interface ImprovedDiagnosticQuizProps {
  onComplete: (responses: QuizResponses) => void;
  onBack: () => void;
}

const ImprovedDiagnosticQuiz: React.FC<ImprovedDiagnosticQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponses>({});
  const [weeklyHours, setWeeklyHours] = useState("");
  const [timelineMonths, setTimelineMonths] = useState("");

  const questions = [
    {
      id: "question_1",
      title: "Reading Comprehension Level",
      description: "How confident are you with understanding complex texts?",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      type: "radio" as const,
      options: [
        { value: "A", label: "I struggle with basic texts", emoji: "😰" },
        { value: "B", label: "I can handle simple passages", emoji: "🙂" },
        { value: "C", label: "I understand most texts well", emoji: "😊" },
        { value: "D", label: "I excel at complex analysis", emoji: "🤓" }
      ]
    },
    {
      id: "question_2", 
      title: "Writing Ability",
      description: "How strong are your essay writing skills?",
      icon: <PenTool className="h-6 w-6 text-green-500" />,
      type: "radio" as const,
      options: [
        { value: "A", label: "I find writing very challenging", emoji: "😓" },
        { value: "B", label: "I can write basic essays", emoji: "✍️" },
        { value: "C", label: "My essays are generally good", emoji: "📝" },
        { value: "D", label: "I'm a confident, skilled writer", emoji: "🏆" }
      ]
    },
    {
      id: "question_3",
      title: "Analysis Skills", 
      description: "How well can you analyze and interpret texts?",
      icon: <Search className="h-6 w-6 text-purple-500" />,
      type: "radio" as const,
      options: [
        { value: "A", label: "Analysis is very difficult for me", emoji: "🤯" },
        { value: "B", label: "I can spot some basic themes", emoji: "🔍" },
        { value: "C", label: "I'm good at finding deeper meanings", emoji: "🎯" },
        { value: "D", label: "I excel at literary analysis", emoji: "🧠" }
      ]
    },
    {
      id: "question_4",
      title: "Current Grade Target",
      description: "What grade are you aiming for?",
      icon: <Target className="h-6 w-6 text-red-500" />,
      type: "radio" as const,
      options: [
        { value: "A", label: "C/D grade (Pass)", emoji: "🎯" },
        { value: "B", label: "B grade (Good)", emoji: "⭐" },
        { value: "C", label: "A grade (Excellent)", emoji: "🌟" },
        { value: "D", label: "A* grade (Outstanding)", emoji: "✨" }
      ]
    },
    {
      id: "question_5",
      title: "Weekly Study Time",
      description: "How many hours per week can you dedicate to English?",
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      type: "input" as const,
      inputType: "number",
      placeholder: "Enter hours (e.g., 8)",
      min: 1,
      max: 40
    },
    {
      id: "question_6", 
      title: "Main Challenge",
      description: "What's your biggest struggle with English?",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      type: "radio" as const,
      options: [
        { value: "A", label: "Understanding what questions ask", emoji: "❓" },
        { value: "B", label: "Finding evidence in texts", emoji: "🔎" },
        { value: "C", label: "Writing analytical responses", emoji: "📚" },
        { value: "D", label: "Time management in exams", emoji: "⏰" }
      ]
    },
    {
      id: "question_7",
      title: "Learning Style",
      description: "How do you learn best?",
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      type: "radio" as const,
      options: [
        { value: "A", label: "Step-by-step instructions", emoji: "🪜" },
        { value: "B", label: "Lots of examples", emoji: "📋" },
        { value: "C", label: "Theory first, then practice", emoji: "📖" },
        { value: "D", label: "Learning by doing", emoji: "🛠️" }
      ]
    },
    {
      id: "question_8",
      title: "Study Timeline",
      description: "How many months until your exam?",
      icon: <Calendar className="h-6 w-6 text-pink-500" />,
      type: "input" as const,
      inputType: "number",
      placeholder: "Enter months (e.g., 3)",
      min: 1,
      max: 12
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Prepare final responses with actual values
      const finalResponses = { ...responses };
      
      // Store actual numeric values for hours and timeline
      if (weeklyHours) {
        finalResponses.question_5 = `hours:${weeklyHours}`;
      }
      
      if (timelineMonths) {
        finalResponses.question_8 = `months:${timelineMonths}`;
      }
      
      console.log('Quiz completed with responses:', finalResponses);
      onComplete(finalResponses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const handleResponseChange = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleInputChange = (value: string) => {
    if (currentQ.id === "question_5") {
      setWeeklyHours(value);
    } else if (currentQ.id === "question_8") {
      setTimelineMonths(value);
    }
  };

  const isAnswered = () => {
    if (currentQ.type === "input") {
      return (currentQ.id === "question_5" && weeklyHours) || 
             (currentQ.id === "question_8" && timelineMonths);
    }
    return responses[currentQ.id as keyof QuizResponses];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="px-3 py-1">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Building your personalized learning profile...
          </p>
        </div>

        {/* Question Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                {currentQ.icon}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentQ.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {currentQ.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentQ.type === "radio" ? (
              <RadioGroup
                value={responses[currentQ.id as keyof QuizResponses] || ""}
                onValueChange={handleResponseChange}
                className="space-y-4"
              >
                {currentQ.options?.map((option) => (
                  <div key={option.value} className="space-y-2">
                    <label className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-gray-700 font-medium">{option.label}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-4">
                <Label htmlFor={currentQ.id} className="text-base font-medium">
                  {currentQ.id === "question_5" ? "Weekly Hours" : "Months Available"}
                </Label>
                <Input
                  id={currentQ.id}
                  type={currentQ.inputType}
                  placeholder={currentQ.placeholder}
                  min={currentQ.min}
                  max={currentQ.max}
                  value={currentQ.id === "question_5" ? weeklyHours : timelineMonths}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400"
                />
                <p className="text-sm text-muted-foreground">
                  {currentQ.id === "question_5" 
                    ? "Be realistic - this helps us create an achievable plan!"
                    : "Consider your exam date and current preparation level"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="px-6 py-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentQuestion === 0 ? "Back to Welcome" : "Previous"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            {currentQuestion === questions.length - 1 ? "Create My Plan" : "Next"}
            {currentQuestion < questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            {currentQuestion === questions.length - 1 && <Target className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImprovedDiagnosticQuiz;
