
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

import Index from '@/pages/Index';
import LandingPage from '@/pages/LandingPage';
import Auth from '@/pages/Auth';
import Login from '@/pages/Login';
import AuthResources from '@/pages/AuthResources';
import Planner from '@/pages/Planner';
import Syllabus from '@/pages/Syllabus';
import Resources from '@/pages/Resources';
import Practice from '@/pages/Practice';
import Pricing from '@/pages/Pricing';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Refund from '@/pages/Refund';
import NotFound from '@/pages/NotFound';
import AIMarking from '@/pages/AIMarking';
import Vocabulary from '@/pages/Vocabulary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/hooks/use-auth';

import Profile from '@/pages/Profile';
import { RouteGuard } from '@/components/profile/RouteGuard';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Router>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/auth-resources" element={<AuthResources />} />
                  <Route 
                    path="/profile" 
                    element={
                      <RouteGuard>
                        <Profile />
                      </RouteGuard>
                    } 
                  />
                  <Route path="/planner" element={<Planner />} />
                  <Route path="/syllabus" element={<Syllabus />} />
                  <Route path="/resources/*" element={<Resources />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/vocabulary" element={<Vocabulary />} />
                  <Route path="/ai-marking" element={<AIMarking />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/refund" element={<Refund />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
