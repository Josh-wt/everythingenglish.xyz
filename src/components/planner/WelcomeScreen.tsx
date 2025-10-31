
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Target, Users } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Your Personalized English Study Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive diagnostic assessment to receive a detailed, 
            customized study plan designed specifically for your IGCSE English success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto" />
              <CardTitle className="text-lg">Comprehensive Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                8 carefully designed questions that analyze your reading, writing, and analytical skills
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-green-600 mx-auto" />
              <CardTitle className="text-lg">Personalized Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Custom study schedules with detailed daily tasks based on your unique needs and timeline
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-orange-600 mx-auto" />
              <CardTitle className="text-lg">Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Plans adapt to your available study time, from 30 minutes to 2+ hours daily
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mx-auto" />
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your improvement with task completion tracking and milestone celebrations
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center">What to Expect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold">Answer 8 Questions</h3>
                <p className="text-sm text-gray-600">About 5 minutes to complete</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold">Get Your Plan</h3>
                <p className="text-sm text-gray-600">Instant personalized study schedule</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold">Start Studying</h3>
                <p className="text-sm text-gray-600">Follow your custom roadmap to success</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={onStart} size="lg" className="text-lg px-8 py-4">
            Start My Assessment
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Takes about 5 minutes • Completely free • Instant results
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
