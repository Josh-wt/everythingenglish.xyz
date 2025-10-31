
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles, Target, Zap } from "lucide-react";
import { quizQuestions } from "@/data/quizQuestions";
import type { QuizResponses } from "@/utils/planGenerator";

interface EnhancedDiagnosticQuizProps {
  onComplete: (responses: QuizResponses) => void;
  onBack: () => void;
}

const EnhancedDiagnosticQuiz: React.FC<EnhancedDiagnosticQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponses>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newResponses = {
      ...responses,
      [`question_${currentQuestion + 1}`]: selectedAnswer
    };
    setResponses(newResponses);

    if (isLastQuestion) {
      onComplete(newResponses);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(responses[`question_${currentQuestion}`] || "");
    }
  };

  const currentQuestionData = quizQuestions[currentQuestion];

  const getProgressIcon = () => {
    if (progress < 30) return <Target className="h-5 w-5" />;
    if (progress < 70) return <Zap className="h-5 w-5" />;
    return <Sparkles className="h-5 w-5" />;
  };

  const getProgressColor = () => {
    if (progress < 30) return "bg-blue-500";
    if (progress < 70) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background p-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getProgressColor()} text-white transition-colors duration-500`}>
                {getProgressIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Diagnostic Assessment</h2>
                <p className="text-muted-foreground">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onBack} className="hover:scale-105 transition-transform">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="relative">
            <Progress value={progress} className="h-3 bg-muted" />
            <div 
              className={`absolute top-0 left-0 h-3 ${getProgressColor()} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Getting to know you...</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card className="border-2 hover:border-primary/20 transition-all duration-300 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl leading-relaxed">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`p-6 text-left rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                    selectedAnswer === option.value
                      ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                      : "border-border hover:border-primary/40 bg-card hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                        selectedAnswer === option.value
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedAnswer === option.value && (
                        <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-2">{option.text}</p>
                      {option.description && (
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="hover:scale-105 transition-transform"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                {quizQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index < currentQuestion
                        ? "bg-primary"
                        : index === currentQuestion
                        ? "bg-primary/60"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`hover:scale-105 transition-all duration-200 ${
                  selectedAnswer
                    ? "bg-primary hover:bg-primary/90"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                {isLastQuestion ? "Generate My Plan" : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your responses help our AI create the perfect study plan for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDiagnosticQuiz;
