import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Rocket, Star } from 'lucide-react';

interface PlannerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlannerAuthModal: React.FC<PlannerAuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth?redirectTo=/planner');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center space-y-4">
          {/* Animated Icons */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 animate-spin">
              <Brain className="h-8 w-8 text-primary absolute top-0 left-1/2 transform -translate-x-1/2" />
              <Sparkles className="h-6 w-6 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2" />
              <Rocket className="h-7 w-7 text-purple-500 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
              <Star className="h-5 w-5 text-yellow-500 absolute top-1/2 left-0 transform -translate-y-1/2" />
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Unlock Your AI Study Plan
          </DialogTitle>
          
          <DialogDescription className="text-base space-y-3">
            <p>
              Start your personalized IGCSE English journey with our AI-powered assessment.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                5-minute assessment
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                AI-generated plan
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Completely free
              </div>
              <div className="flex items-center gap-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Instant results
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          <Button 
            onClick={handleSignIn} 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-lg py-6 font-semibold"
          >
            Create Account & Start Assessment
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSignIn}
            className="w-full border-2 hover:bg-muted/50"
          >
            Sign In to Existing Account
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Join thousands of students already improving their English skills
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};