
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Target, Users, Lock, Sparkles, Star, Zap, Brain, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useUserProfile } from '@/hooks/useUserProfile';
import { LevelSelectionModal } from '@/components/profile/LevelSelectionModal';
import { PlannerLayout } from './PlannerLayout';
import { PlannerAuthModal } from './PlannerAuthModal';

interface AuthenticatedWelcomeScreenProps {
  onStart: () => void;
}

const AuthenticatedWelcomeScreen: React.FC<AuthenticatedWelcomeScreenProps> = ({ onStart }) => {
  const { user, profile, loading, needsLevelSelection, updateProfile } = useUserProfile();
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (needsLevelSelection) {
      setShowLevelModal(true);
      return;
    }

    onStart();
  };

  const handleLevelSelect = async (level: string) => {
    const success = await updateProfile({ study_level: level });
    if (success) {
      setShowLevelModal(false);
      onStart();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PlannerLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-16">
        {/* Hero Section with Top CTA */}
        <div className="text-center space-y-8 py-20">
          <div className="text-center space-y-6 mb-12">
            <Button 
              onClick={handleStartAssessment} 
              size="lg" 
              className="text-xl px-16 py-8 font-bold hover:scale-105 transition-all duration-200 bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl shadow-primary/25"
            >
              {user ? (needsLevelSelection ? "Start My AI Plan →" : "Start My AI Plan →") : "Start My AI Plan →"}
            </Button>
            
            <p className="text-lg text-muted-foreground">
              {user ? (
                needsLevelSelection ? (
                  "Set your level • Get personalized plan • 5 minutes"
                ) : (
                  "AI-powered assessment • Personalized plan • 5 minutes"
                )
              ) : (
                "Sign in • AI assessment • Personalized plan • 5 minutes"
              )}
            </p>
          </div>
          {/* Floating Icons */}
          <div className="relative">
            <div className="absolute -top-8 left-1/4 animate-bounce" style={{ animationDelay: '0s' }}>
              <Brain className="h-8 w-8 text-primary/30" />
            </div>
            <div className="absolute -top-4 right-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
              <Rocket className="h-6 w-6 text-blue-500/30" />
            </div>
            <div className="absolute top-8 left-1/6 animate-bounce" style={{ animationDelay: '2s' }}>
              <Star className="h-7 w-7 text-yellow-500/30" />
            </div>
            <div className="absolute top-4 right-1/6 animate-bounce" style={{ animationDelay: '3s' }}>
              <Zap className="h-5 w-5 text-purple-500/30" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-semibold shadow-lg">
            <Sparkles className="h-5 w-5 animate-pulse" />
            AI-Powered Study Planning
            <Sparkles className="h-5 w-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Your Personalized
            <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              English Study Journey
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Take our intelligent diagnostic assessment to receive a completely customized study plan 
            designed specifically for your <span className="font-semibold text-primary">IGCSE English success</span> using 
            advanced AI technology.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 rounded-full font-medium">
              <Target className="h-4 w-4" />
              Personalized
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              <Clock className="h-4 w-4" />
              5 Minutes
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 rounded-full font-medium">
              <Brain className="h-4 w-4" />
              AI-Generated
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-bold">Smart Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                8 intelligently designed questions that analyze your reading, writing, and analytical skills with precision
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg font-bold">AI-Generated Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Custom study schedules created by AI with detailed daily tasks based on your unique learning profile
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg font-bold">Adaptive Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Plans that adapt to your available study time and learning pace, from 30 minutes to 2+ hours daily
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg font-bold">Progress Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                AI monitors your improvement and automatically adjusts your plan for optimal learning outcomes
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-card via-card to-muted/5 backdrop-blur border-2">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Take Assessment</h3>
                <p className="text-muted-foreground">Complete 8 diagnostic questions in about 5 minutes</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">AI Generates Plan</h3>
                <p className="text-muted-foreground">Our AI creates your personalized study roadmap instantly</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Start Learning</h3>
                <p className="text-muted-foreground">Follow your custom roadmap with adaptive guidance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          {!user && (
            <div className="flex items-center justify-center gap-2 text-orange-600 bg-orange-50 dark:bg-orange-950/20 px-4 py-2 rounded-lg mb-4">
              <Lock className="h-5 w-5" />
              <span className="font-medium">Authentication required to start assessment</span>
            </div>
          )}
        
          {user && needsLevelSelection && (
            <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-4 py-2 rounded-lg mb-4">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Please select your study level to continue</span>
            </div>
          )}

        </div>
      </div>

      {/* Modals */}
      <LevelSelectionModal
        isOpen={showLevelModal}
        onClose={() => setShowLevelModal(false)}
        onSelect={handleLevelSelect}
        currentLevel={profile?.study_level}
      />
      
      <PlannerAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </PlannerLayout>
  );
};

export default AuthenticatedWelcomeScreen;
