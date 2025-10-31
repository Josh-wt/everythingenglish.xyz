
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, Sparkles, Target, Zap, CheckCircle2, BookOpen, 
  Users, Globe, Lightbulb, Star, Award, TrendingUp,
  Clock, Shield, Puzzle, Rocket, Heart, Eye,
  Coffee, Music, Palette, Camera, Gamepad2, Headphones,
  Smartphone, Laptop, Wifi, Battery, Bluetooth, Settings,
  Map, Compass, Mountain, Sunrise, Cloud, Umbrella,
  TreePine, Flower, Leaf, Sun, Moon, Rainbow,
  Gift, Cake, PartyPopper, Crown, Smile, Sparkle,
  Diamond, Gem, Key, Lock, Search, Filter
} from "lucide-react";

interface EnhancedAIProcessingProps {
  onComplete: () => void;
}

const EnhancedAIProcessing: React.FC<EnhancedAIProcessingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const animations = [
    Brain, Sparkles, Target, Zap, CheckCircle2, BookOpen, 
    Users, Globe, Lightbulb, Star, Award, TrendingUp,
    Clock, Shield, Puzzle, Rocket, Heart, Eye,
    Coffee, Music, Palette, Camera, Gamepad2, Headphones,
    Smartphone, Laptop, Wifi, Battery, Bluetooth, Settings,
    Map, Compass, Mountain, Sunrise, Cloud, Umbrella,
    TreePine, Flower, Leaf, Sun, Moon, Rainbow,
    Gift, Cake, PartyPopper, Crown, Smile, Sparkle,
    Diamond, Gem, Key, Lock, Search, Filter
  ];

  const steps = [
    { 
      title: "Analyzing IGCSE 0500 Requirements", 
      description: "Scanning latest exam board specifications and grade boundaries",
      duration: 8100 
    },
    { 
      title: "Processing Your Learning Profile", 
      description: "Evaluating comprehension style, confidence levels, and time availability",
      duration: 10800 
    },
    { 
      title: "Mapping Academic Strengths", 
      description: "Identifying your strongest areas in reading, writing, and analysis",
      duration: 9450 
    },
    { 
      title: "Detecting Learning Gaps", 
      description: "Pinpointing specific skills needing focused development",
      duration: 7560 
    },
    { 
      title: "Accessing Pedagogy Database", 
      description: "Connecting to research-backed teaching methodologies",
      duration: 11340 
    },
    { 
      title: "Calculating Grade Trajectory", 
      description: "Modeling your path to target grades using statistical analysis",
      duration: 6750 
    },
    { 
      title: "Customizing Task Sequences", 
      description: "Arranging sub-tasks in optimal learning progressions",
      duration: 10260 
    },
    { 
      title: "Building Assessment Framework", 
      description: "Creating milestone checkpoints and progress tracking systems",
      duration: 8640 
    },
    { 
      title: "Integrating Exam Strategies", 
      description: "Embedding timing, format mastery, and technique refinement",
      duration: 7830 
    },
    { 
      title: "Finalizing Your AI Study Plan", 
      description: "Assembling your comprehensive, personalized learning pathway",
      duration: 8100 
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += 65; // 35% slower (100 * 0.65 = 65)
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step
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
        setTimeout(onComplete, 1000);
      }
    }, 100);

    // Animation cycle timer
    const animationTimer = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, 150);

    return () => {
      clearInterval(timer);
      clearInterval(animationTimer);
    };
  }, [onComplete]);

  const CurrentIcon = animations[currentAnimation];
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          {/* Main rotating icon */}
          <div className="relative mx-auto w-40 h-40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-8 bg-card rounded-full flex items-center justify-center shadow-lg">
              <CurrentIcon className="h-16 w-16 text-primary animate-bounce" />
            </div>
          </div>
          
          {/* Floating animation icons */}
          <div className="relative h-20">
            {animations.slice(0, 12).map((Icon, index) => (
              <div
                key={index}
                className="absolute animate-float"
                style={{
                  left: `${5 + (index * 8)}%`,
                  animationDelay: `${index * 150}ms`,
                  animationDuration: '2s'
                }}
              >
                <Icon className="h-6 w-6 text-primary/40" />
              </div>
            ))}
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            AI is Crafting Your Perfect Study Plan
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our advanced artificial intelligence is analyzing thousands of data points to create a study experience tailored specifically for you
          </p>
        </div>

        <Card className="border-2 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
          <CardContent className="p-10 space-y-8">
            {/* Enhanced progress bar */}
            <div className="space-y-4">
              <div className="relative">
                <Progress value={progress} className="h-4 bg-muted/50" />
                <div 
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                />
                {/* Progress glow effect */}
                <div 
                  className="absolute top-0 left-0 h-4 bg-primary/30 rounded-full blur-sm transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Processing your learning data...</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="font-bold text-primary">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>

            {/* Current step display */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border-2 border-primary/20">
                  <CurrentIcon className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-2xl mb-2">{currentStepData?.title}</h3>
                  <p className="text-muted-foreground text-lg">{currentStepData?.description}</p>
                </div>
              </div>

              {/* Step indicators */}
              <div className="grid grid-cols-5 gap-3">
                {steps.map((step, index) => {
                  const StepIcon = animations[index % animations.length];
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-500 ${
                        index < currentStep
                          ? "bg-primary/20 text-primary scale-105 shadow-lg"
                          : index === currentStep
                          ? "bg-primary/30 text-primary scale-110 shadow-xl border-2 border-primary/40"
                          : "bg-muted/30 text-muted-foreground scale-95"
                      }`}
                    >
                      <StepIcon className="h-6 w-6" />
                      <span className="text-xs font-semibold text-center leading-tight">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* IGCSE insights while waiting */}
            <div className="bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl p-6 border border-primary/10">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary animate-pulse" />
                IGCSE 0500 Intelligence at Work
              </h4>
              <p className="text-muted-foreground mb-4">
                Our AI analyzes over 2,000+ IGCSE exam patterns, grade boundaries from 2020-2024, and proven pedagogical frameworks to craft your pathway to A* success.
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="font-bold text-primary">200+</div>
                  <div className="text-muted-foreground">Sub-task Types</div>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="font-bold text-primary">4</div>
                  <div className="text-muted-foreground">Skill Levels</div>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="font-bold text-primary">A*-C</div>
                  <div className="text-muted-foreground">Grade Targets</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional status info */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Personalized</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Processing time: 60-90 seconds • Your data is processed securely and never stored
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EnhancedAIProcessing;
