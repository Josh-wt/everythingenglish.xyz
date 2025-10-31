import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { validateRedirectPath } from '@/utils/redirectValidation';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (session) {
        // Get the intended destination from URL params using 'next'
        const urlParams = new URLSearchParams(window.location.search);
        const nextParam = urlParams.get('next');
        const redirectTo = validateRedirectPath(nextParam, '/practice');
        navigate(redirectTo);
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        // Get the intended destination from URL params using 'next'
        const urlParams = new URLSearchParams(window.location.search);
        const nextParam = urlParams.get('next');
        const redirectTo = validateRedirectPath(nextParam, '/practice');
        navigate(redirectTo);
      } else {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${validateRedirectPath(new URLSearchParams(window.location.search).get('next'), '/practice')}`
          }
        });
        if (error) throw error;
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account."
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${validateRedirectPath(new URLSearchParams(window.location.search).get('next'), '/practice')}`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDiscordSignIn = async () => {
    try {
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}${validateRedirectPath(new URLSearchParams(window.location.search).get('next'), '/practice')}`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-lg shadow-2xl bg-gradient-to-br from-card to-card/95 border-primary/20">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="m2 17 10 5 10-5" />
              <path d="m2 12 10 5 10-5" />
            </svg>
          </div>
          <CardTitle className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent text-3xl">
            {isLogin ? 'Welcome Back' : 'Start Your Journey'}
          </CardTitle>
          <CardDescription className="text-lg">
            {isLogin ? 'Sign in to continue your study progress and unlock advanced features' : 'Join thousands of students mastering English with our AI-powered platform'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          {/* Discord - Primary/Preferred Option */}
          <div className="relative">
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
              Recommended
            </div>
            <button className="button x w-full relative overflow-hidden group" onClick={handleDiscordSignIn} style={{
            maxWidth: '100%',
            display: 'flex',
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            fontWeight: '700',
            textAlign: 'center',
            verticalAlign: 'middle',
            alignItems: 'center',
            borderRadius: '0.75rem',
            border: '2px solid rgba(86, 98, 246, 0.3)',
            gap: '1rem',
            color: '#ffffff',
            backgroundColor: '#5662f6',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(86, 98, 246, 0.3)'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(86, 98, 246, 0.4)';
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(86, 98, 246, 0.3)';
          }}>
              <svg style={{
              color: 'white'
            }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" fill="white" />
              </svg>
              <span className="text-lg">Continue with Discord</span>
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-muted-foreground/20"></div>
            <span className="px-4 text-muted-foreground text-sm font-medium">or continue with</span>
            <div className="flex-1 border-t border-muted-foreground/20"></div>
          </div>
          
          <button className="signin w-full" onClick={handleGoogleSignIn} style={{
          display: 'flex',
          padding: '0.875rem 1.5rem',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          fontWeight: '600',
          textAlign: 'center',
          fontFamily: '"Montserrat", sans-serif',
          verticalAlign: 'middle',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.75rem',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          gap: '0.875rem',
          color: '#e2e8f0',
          backgroundColor: '#1e293b',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }} onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.backgroundColor = '#334155';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        }} onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.backgroundColor = '#1e293b';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}>
            <svg viewBox="0 0 256 262" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" style={{
            height: '28px',
            width: 'auto'
          }}>
              <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
              <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
              <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
              <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Fast, secure, and trusted by thousands of students worldwide
            </p>
          </div>
        </CardContent>
      </Card>
    </div>;
};

export default Login;