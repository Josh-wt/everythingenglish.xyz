
import React from 'react';
import { Target, Bookmark, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileResourcesSubmenuProps {
  onStudyGoalsClick: () => void;
  onSavedResourcesClick: () => void;
  user: any;
}

export const MobileResourcesSubmenu = ({ onStudyGoalsClick, onSavedResourcesClick, user }: MobileResourcesSubmenuProps) => {
  if (!user) return null;

  return (
    <div className="md:hidden bg-card border-b border-border p-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onStudyGoalsClick}
          className="flex items-center gap-2 text-xs px-3 py-2"
        >
          <Target className="w-4 h-4" />
          Study Goals
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSavedResourcesClick}
          className="flex items-center gap-2 text-xs px-3 py-2"
        >
          <Bookmark className="w-4 h-4" />
          Saved Resources
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 text-xs px-3 py-2"
        >
          <Flame className="w-4 h-4" />
          Streak: 0
        </Button>
      </div>
    </div>
  );
};
