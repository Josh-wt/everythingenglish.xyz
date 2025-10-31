
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

interface LevelOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const levelOptions: LevelOption[] = [
  {
    id: 'igcse',
    name: 'IGCSE English',
    description: 'International General Certificate of Secondary Education',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20'
  },
  {
    id: 'a-levels-9093',
    name: 'A-Levels 9093',
    description: 'Cambridge International A-Level English Language',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'border-green-200 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20'
  },
  {
    id: 'a-levels-egp',
    name: 'A-Levels EGP',
    description: 'Edexcel A-Level English Literature & Language',
    icon: <Award className="w-8 h-8" />,
    color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/20'
  }
];

interface LevelSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (level: string) => void;
  currentLevel?: string | null;
}

export const LevelSelectionModal: React.FC<LevelSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentLevel
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>(currentLevel || '');

  const handleSelect = () => {
    if (selectedLevel) {
      onSelect(selectedLevel);
    }
  };

  const handleClose = () => {
    setSelectedLevel(currentLevel || '');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold">
            Choose Your Study Level
          </DialogTitle>
          <p className="text-muted-foreground">
            This will personalize your learning experience and content recommendations
          </p>
        </DialogHeader>

        <div className="grid gap-4 py-6">
          {levelOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                selectedLevel === option.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : option.color
              }`}
              onClick={() => setSelectedLevel(option.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    selectedLevel === option.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {option.description}
                    </CardDescription>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedLevel === option.id
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedLevel === option.id && (
                        <div className="w-full h-full rounded-full bg-primary-foreground scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            You can change this later in your profile settings
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSelect}
              disabled={!selectedLevel}
              className="min-w-24"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
