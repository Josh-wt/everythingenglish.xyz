
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { questions, type QuizQuestion } from "@/data/quizQuestions";
import { type QuizResponses } from "@/utils/planGenerator";

interface DiagnosticQuizProps {
  onComplete: (responses: QuizResponses) => void;
  onBack: () => void;
}

const DiagnosticQuiz: React.FC<DiagnosticQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponses>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleOptionSelect = (value: "A" | "B" | "C" | "D") => {
    const newResponses = {
      ...responses,
      [question.id]: value
    };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const canProceed = responses[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Diagnostic Assessment</h1>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">
            About {Math.ceil((questions.length - currentQuestion - 1) * 0.6)} minutes remaining
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{question.title}</CardTitle>
            <CardDescription className="text-lg">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={responses[question.id] || ""} 
              onValueChange={handleOptionSelect}
              className="space-y-4"
            >
              {question.options.map((option) => (
                <div key={option.value} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value} 
                      className="text-base font-medium cursor-pointer flex-1"
                    >
                      {option.text}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {option.description}
                  </p>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentQuestion === 0 ? "Back to Start" : "Previous"}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;
