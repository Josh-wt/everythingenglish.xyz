
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { ArrowLeft, Target, Bookmark, X } from 'lucide-react';

interface TopBarProps {
  user: User;
  onSignOut: () => void;
  onShowGoals: () => void;
  onShowGroups: () => void;
  showBackButton: boolean;
  onGoBack: () => void;
}

export const TopBar = ({
  user,
  onSignOut,
  onShowGoals,
  onShowGroups,
  showBackButton,
  onGoBack
}: TopBarProps) => {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={onGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          )}
          <div className="hidden md:block">
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onShowGoals}>
            <Target className="h-4 w-4" />
            Study Goals
          </Button>
          <Button variant="ghost" size="sm" onClick={onShowGroups}>
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            <X className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
