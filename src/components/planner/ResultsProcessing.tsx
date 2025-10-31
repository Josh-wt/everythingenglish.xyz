
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, BookOpen, Target } from "lucide-react";

interface ResultsProcessingProps {
  onComplete: () => void;
}

const ResultsProcessing: React.FC<ResultsProcessingProps> = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    { icon: Brain, text: "Analyzing your responses...", duration: 1000 },
    { icon: BookOpen, text: "Matching learning style preferences...", duration: 800 },
    { icon: Target, text: "Generating personalized study plan...", duration: 1200 }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step
      let cumulativeDuration = 0;
      for (let i = 0; i < steps.length; i++) {
        cumulativeDuration += steps[i].duration;
        if (elapsed <= cumulativeDuration) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mb-4">
            <CurrentIcon className="h-16 w-16 text-blue-600 mx-auto animate-pulse" />
          </div>
          <CardTitle className="text-2xl">Creating Your Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Progress value={progress} className="h-3" />
            <p className="text-center text-sm text-gray-600 mt-2">
              {Math.round(progress)}% complete
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">
              {steps[currentStep]?.text}
            </p>
          </div>

          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  index < currentStep ? 'bg-green-500' : 
                  index === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`} />
                <span className={`text-sm ${
                  index <= currentStep ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsProcessing;
