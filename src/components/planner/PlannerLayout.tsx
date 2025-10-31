import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  BookOpen, 
  Brain,
  Sparkles,
  Calendar
} from 'lucide-react';

interface PlannerLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  headerCTA?: React.ReactNode;
}

export const PlannerLayout: React.FC<PlannerLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  onBack,
  className = '',
  headerCTA
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-muted/20 ${className}`}>
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-green-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      {(title || showBackButton || headerCTA) && (
        <div className="relative z-10 border-b bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {showBackButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="flex items-center gap-2 hover:bg-muted/50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
                
                {title && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {title}
                      </h1>
                      {subtitle && (
                        <p className="text-muted-foreground">{subtitle}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {headerCTA && (
                <div className="flex-shrink-0">
                  {headerCTA}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface PlannerStatsProps {
  stats: {
    timeCommitment?: string;
    focusArea?: string;
    progress?: number;
    timeline?: string;
  };
}

export const PlannerStats: React.FC<PlannerStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.timeCommitment && (
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Clock className="h-4 w-4" />
              Time Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {stats.timeCommitment}
            </p>
          </CardContent>
        </Card>
      )}

      {stats.focusArea && (
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-300">
              <Target className="h-4 w-4" />
              Focus Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-green-900 dark:text-green-100">
              {stats.focusArea}
            </p>
          </CardContent>
        </Card>
      )}

      {stats.progress !== undefined && (
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Sparkles className="h-4 w-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
              {Math.round(stats.progress)}%
            </p>
          </CardContent>
        </Card>
      )}

      {stats.timeline && (
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Calendar className="h-4 w-4" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-orange-900 dark:text-orange-100">
              {stats.timeline}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};