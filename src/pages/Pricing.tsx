import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const Pricing = () => {
  const features = [{
    name: 'Instant AI Feedback',
    free: true,
    unlimited: true
  }, {
    name: 'Basic Grading',
    free: true,
    unlimited: true
  }, {
    name: 'Analytics Dashboard',
    free: false,
    unlimited: true
  }, {
    name: 'Marking History Access',
    free: false,
    unlimited: true
  }, {
    name: 'Personalized Insights',
    free: false,
    unlimited: true
  }, {
    name: 'Progress Tracking',
    free: false,
    unlimited: true
  }, {
    name: 'Follow-up Questions',
    free: false,
    unlimited: true
  }, {
    name: 'Advanced Analytics',
    free: false,
    unlimited: true
  }, {
    name: 'Priority Support',
    free: false,
    unlimited: true
  }, {
    name: 'Custom Marking Schemes',
    free: false,
    unlimited: true
  }];
  return <div className="min-h-screen bg-rose-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4" style={{
          fontFamily: 'Fredoka One, cursive'
        }}>
            Pricing & Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">This page is for an upcoming page in the website. All pages currently on the website will remain free forever</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Free Plan */}
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-800">Free Plan</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Perfect for getting started</CardDescription>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-800">$0</span>
                <span className="text-gray-600 ml-2">forever</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">3 credits total (one-time)</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-8">
                {features.map(feature => <li key={feature.name} className="flex items-center">
                    {feature.free ? <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" /> : <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />}
                    <span className={feature.free ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>)}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/auth">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Unlimited Plan */}
          <Card className="bg-white shadow-lg rounded-lg relative border-2 border-pink-500">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Best Value
              </span>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-800">Unlimited Plan</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Everything you need to excel</CardDescription>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-800">$4.99</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Unlimited essay evaluations</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-8">
                {features.map(feature => <li key={feature.name} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature.name}</span>
                  </li>)}
              </ul>
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white" asChild>
                <Link to="/auth">Upgrade to Unlimited</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8" style={{
          fontFamily: 'Fredoka One, cursive'
        }}>
            Why Choose Unlimited?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            For less than the cost of a single coffee per month, unlock unlimited potential
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">∞</div>
              <h3 className="font-bold text-gray-800 mb-2">Unlimited Essays</h3>
              <p className="text-gray-600">No limits on feedback and grading</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-gray-800 mb-2">All Premium Features</h3>
              <p className="text-gray-600">Advanced analytics and insights</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Priority Support</h3>
              <p className="text-gray-600">Get help when you need it most</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src="https://ik.imagekit.io/lqf8a8nmt/1721195102868.jpeg?updatedAt=1753412135966" alt="Jerry Kurian" className="w-24 h-24 rounded-full object-cover" />
            <div className="text-center md:text-left">
              <h4 className="font-bold text-gray-800 text-lg">Jerry Kurian</h4>
              <p className="text-gray-600">everythingenglishedu@gmail.com</p>
              <p className="text-gray-600 text-sm mt-2">
                Librety Acers, Attibele, Sarjapur<br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Pricing;