
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { LevelSelectionModal } from './LevelSelectionModal';
import { toast } from '@/hooks/use-toast';

interface RouteGuardProps {
  children: React.ReactNode;
  requiresLevel?: boolean;
}

export const RouteGuard = ({ children, requiresLevel = false }: RouteGuardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLevel, setUserLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLevel = async () => {
      try {
        // Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setLoading(false);
          return;
        }

        if (!session?.user) {
          // No user, redirect to auth page
          navigate('/auth');
          return;
        }

        setUser(session.user);

        // If level is required, check for user level
        if (requiresLevel) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('study_level')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            // If there's an error fetching profile, show level selection modal
            setShowLevelModal(true);
          } else if (!profile?.study_level) {
            // No level set, show modal to select level
            setShowLevelModal(true);
          } else {
            // Level exists, set it
            setUserLevel(profile.study_level);
          }
        }
      } catch (error) {
        console.error('Error in RouteGuard:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLevel();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/auth');
        } else if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          // Re-check level if required
          if (requiresLevel) {
            checkAuthAndLevel();
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, requiresLevel]);

  const handleLevelSelected = async (level: string) => {
    if (!user) return;

    try {
      // Save the selected level to the database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          study_level: level,
          email: user.email,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving study level:', error);
        toast({
          title: "Error saving study level",
          description: "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setUserLevel(level);
      setShowLevelModal(false);
      
      toast({
        title: "Study level saved",
        description: `Your study level has been set to ${level}`,
      });
    } catch (error) {
      console.error('Error in handleLevelSelected:', error);
      toast({
        title: "Error saving study level",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Show loading spinner while checking auth/level
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show level selection modal if required and not set
  if (requiresLevel && showLevelModal) {
    return (
      <LevelSelectionModal
        isOpen={showLevelModal}
        onClose={() => {
          // If user closes modal without selecting level, redirect to home
          navigate('/');
        }}
        onSelect={handleLevelSelected}
        currentLevel={userLevel}
      />
    );
  }

  // If level is required but not set and modal is closed, redirect to home
  if (requiresLevel && !userLevel && !showLevelModal) {
    navigate('/');
    return null;
  }

  // If user is authenticated (and has level if required), render children
  if (user && (!requiresLevel || userLevel)) {
    return <>{children}</>;
  }

  // Fallback: redirect to auth
  navigate('/auth');
  return null;
};
