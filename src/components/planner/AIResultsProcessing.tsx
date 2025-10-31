
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Sparkles, Target, Zap, CheckCircle2 } from "lucide-react";

interface AIResultsProcessingProps {
  onComplete: () => void;
}

const AIResultsProcessing: React.FC<AIResultsProcessingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { 
      icon: Brain, 
      title: "Analyzing Your Responses", 
      description: "AI is processing your diagnostic answers",
      duration: 1500 
    },
    { 
      icon: Target, 
      title: "Identifying Learning Patterns", 
      description: "Discovering your unique learning style and strengths",
      duration: 2000 
    },
    { 
      icon: Sparkles, 
      title: "Selecting Study Components", 
      description: "Choosing the perfect activities for your level",
      duration: 1800 
    },
    { 
      icon: Zap, 
      title: "Assembling Your Plan", 
      description: "Creating your personalized weekly schedule",
      duration: 1200 
    },
    { 
      icon: CheckCircle2, 
      title: "Plan Ready!", 
      description: "Your AI-generated study plan is complete",
      duration: 800 
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Determine current step
      let accumulatedTime = 0;
      let stepIndex = 0;
      for (let i = 0; i < steps.length; i++) {
        accumulatedTime += steps[i].duration;
        if (elapsed <= accumulatedTime) {
          stepIndex = i;
          break;
        }
      }
      setCurrentStep(stepIndex);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <IconComponent className="h-16 w-16 text-primary animate-bounce" />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Creating Your Perfect Study Plan
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Our AI is working hard to personalize your learning experience
          </p>
        </div>

        <Card className="border-2 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{currentStepData.title}</h3>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mt-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                        index < currentStep
                          ? "bg-primary/20 text-primary"
                          : index === currentStep
                          ? "bg-primary/30 text-primary scale-110"
                          : "bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      <StepIcon className="h-5 w-5" />
                      <span className="text-xs font-medium text-center leading-tight">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>AI is analyzing your responses</span>
          </div>
          <p className="text-xs text-muted-foreground">
            This usually takes 5-10 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResultsProcessing;
