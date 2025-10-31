import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, BookOpen, FileText, Target, Users, Star, CheckCircle, ArrowRight, Zap, Award, PenTool, Clock, Menu, X } from 'lucide-react';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

const EverythingEnglishLanding = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const floatingElements = [{
    text: "Detailed Notes",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "8%",
    y: "63%", // Moved down 20% from 43%
    delay: 0,
    mobile: true
  }, {
    text: "Past Papers",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "20%",
    y: "68%", // Moved down 20% from 48%
    delay: 0.2,
    mobile: true
  }, {
    text: "Live Chat",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "5%",
    y: "73%", // Moved down 20% from 53%
    delay: 0.4,
    mobile: true
  }, {
    text: "A* Guidance",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "15%",
    y: "78%", // Moved down 20% from 58%
    delay: 0.6,
    mobile: true
  }, {
    text: "Text Analysis",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "35%",
    y: "65%", // Moved down 20% from 45%
    delay: 0.8,
    mobile: true
  }, {
    text: "Writer's Effect",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "45%",
    y: "78%", // Moved down 20% from 58%
    delay: 1,
    mobile: true
  }, {
    text: "Example Responses",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "55%",
    y: "71%", // Moved down 20% from 51%
    delay: 1.2,
    mobile: true
  }, {
    text: "Feedback",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "65%",
    y: "75%", // Moved down 20% from 55%
    delay: 1.4,
    mobile: true
  }, {
    text: "Paper Guides",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "75%",
    y: "67%", // Moved down 20% from 47%
    delay: 1.6,
    mobile: true
  }, {
    text: "Practice Questions",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "85%",
    y: "73%", // Moved down 20% from 53%
    delay: 1.8,
    mobile: false // Hidden on mobile
  }, {
    text: "IGCSE Support",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "25%",
    y: "75%", // Moved down 20% from 55%
    delay: 2,
    mobile: true
  }, {
    text: "A Level Help",
    color: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300",
    x: "90%",
    y: "69%", // Moved down 20% from 49%
    delay: 2.2,
    mobile: false // Hidden on mobile
  }];

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* CSS for floating animations */}
      <style>
        {`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        `}
      </style>

      {/* Top Fade Grid Background */}
      <div className="absolute inset-0 z-0" style={{
      backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
      backgroundSize: "20px 30px",
      WebkitMaskImage: "radial-gradient(ellipse 70% 120% at 50% 0%, #000 60%, transparent 100%)",
      maskImage: "radial-gradient(ellipse 70% 120% at 50% 0%, #000 60%, transparent 100%)",
      height: "120vh"
    }} />

      {/* Header */}
      <header className="relative z-50 bg-background/80 backdrop-blur-sm">
        
      </header>

      {/* Hero Section with Floating Elements */}
      <section className="relative min-h-[100vh] md:min-h-[120vh] flex items-start justify-center px-4 sm:px-6 z-10 pt-24 md:pt-32 mb-12 md:mb-16 lg:mb-24">
        {/* Small Floating Chat Bubbles with Animation - Conditionally shown based on mobile property */}
        {floatingElements.map((element, index) => (
          <div 
            key={index} 
            className={`absolute px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium ${element.color} shadow-sm
              ${element.mobile ? 'block' : 'hidden sm:block'}
              animate-[float_3s_ease-in-out_infinite]`} 
            style={{
              left: element.x,
              top: element.y,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
              transition: 'transform 0.6s ease-out',
              animationDelay: `${element.delay}s`,
              animation: `float 3s ease-in-out infinite ${element.delay}s`
            }}
          >
            {element.text}
          </div>
        ))}

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto relative z-20 px-4 pt-12 md:pt-20">
          <div className="mb-4 sm:mb-5">
            
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-5 leading-tight">
            The Free Guide to{" "}
            <span className="text-purple-600 relative">
              A* English
              <div className="absolute -right-3 sm:-right-4 lg:-right-6 top-1 sm:top-2 lg:top-3">
                <svg width="21" height="21" viewBox="0 0 32 32" className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600">
                  <path d="M8 16l6 6 10-10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">English made Effortless</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
            <button onClick={() => scrollToSection('how-it-works')} className="text-purple-600 hover:text-purple-600/80 font-medium text-lg sm:text-xl md:text-2xl order-2 sm:order-1 transition-colors">
              How it works
            </button>
            <button onClick={() => navigate('/resources')} className="bg-purple-600 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-lg font-medium hover:bg-purple-600/90 transition-colors text-lg sm:text-xl md:text-2xl order-1 sm:order-2">
              Start Practicing
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 md:py-20 lg:py-28 mb-12 md:mb-16 lg:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Everything You Need to Excel in English
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources designed for IGCSE and A Level success
            </p>
          </div>
          
          <BentoGrid className="max-lg:grid-cols-1 max-lg:auto-rows-[20rem] lg:grid-rows-3 gap-3 sm:gap-4">
            <BentoCard
              name="Essay & Text Analysis"
              className="col-span-1 lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-transparent dark:from-purple-500/30 dark:via-purple-400/20 dark:to-transparent">
                  <div className="absolute top-8 right-8 w-32 h-32 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-8 left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                </div>
              }
              Icon={PenTool}
              description="Master advanced writing techniques and literary analysis with detailed guides and examples"
              href="/resources"
              cta="View Resources"
            />
            <BentoCard
              name="Past Paper Collection"
              className="col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent dark:from-blue-500/30 dark:via-blue-400/20 dark:to-transparent">
                  <div className="absolute top-4 right-4 w-24 h-24 bg-blue-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              }
              Icon={FileText}
              description="500+ past papers from various exam boards with mark schemes and examiner reports"
              href="/practice"
              cta="Browse Papers"
            />
            <BentoCard
              name="Study Guides"
              className="col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-green-400/10 to-transparent dark:from-green-500/30 dark:via-green-400/20 dark:to-transparent">
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-green-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              }
              Icon={BookOpen}
              description="Comprehensive guides covering all syllabus topics with detailed explanations"
              href="/resources"
              cta="Read Guides"
            />
            <BentoCard
              name="AI Essay Marking"
              className="col-span-1 lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-transparent dark:from-amber-500/30 dark:via-amber-400/20 dark:to-transparent">
                  <div className="absolute top-6 right-6 w-28 h-28 bg-amber-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                </div>
              }
              Icon={Award}
              description="Get instant AI-powered feedback on your essays with detailed improvement suggestions"
              href="/ai-marking"
              cta="Try AI Marking"
            />
            <BentoCard
              name="Interactive Practice"
              className="col-span-1 lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-pink-400/10 to-transparent dark:from-pink-500/30 dark:via-pink-400/20 dark:to-transparent">
                  <div className="absolute bottom-8 right-8 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
              }
              Icon={Target}
              description="Track your progress with personalized study plans and practice exercises tailored to your needs"
              href="/planner"
              cta="Start Learning"
            />
          </BentoGrid>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 sm:py-28 bg-muted/30 mb-16 sm:mb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 lg:p-12">
                {/* Desk Illustration */}
                <div className="relative">
                  {/* Desk */}
                  <div className="w-full h-4 bg-amber-200 dark:bg-amber-800/50 rounded-full mb-2"></div>
                  <div className="w-full h-2 bg-amber-300 dark:bg-amber-700/50 rounded-full"></div>
                  
                  {/* Computer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12">
                    <div className="w-24 h-16 bg-gray-800 dark:bg-gray-700 rounded-lg relative">
                      <div className="w-20 h-12 bg-purple-600 rounded-sm absolute top-2 left-2 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="w-6 h-3 bg-gray-600 mx-auto rounded-b-lg"></div>
                    <div className="w-16 h-2 bg-gray-400 mx-auto rounded-full"></div>
                  </div>
                  
                  {/* Books */}
                  <div className="absolute top-0 right-4 -translate-y-8">
                    <div className="w-3 h-8 bg-red-500 rounded-sm transform rotate-12"></div>
                    <div className="w-3 h-8 bg-blue-500 rounded-sm transform -rotate-6 -ml-1"></div>
                    <div className="w-3 h-8 bg-green-500 rounded-sm ml-1"></div>
                  </div>
                  
                  {/* Plant */}
                  <div className="absolute top-0 left-4 -translate-y-6">
                    <div className="w-4 h-4 bg-amber-600 dark:bg-amber-700 rounded-full"></div>
                    <div className="flex justify-center -mt-1">
                      <div className="w-2 h-6 bg-green-500 rounded-full transform -rotate-12"></div>
                      <div className="w-2 h-6 bg-green-500 rounded-full transform rotate-12 -ml-1"></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-200 dark:bg-purple-800/50 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-3 h-3 text-purple-600" />
                </div>
              </div>
            </div>
            
            {/* Right Side - Steps */}
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground">Your journey to English excellence in four simple steps</p>
              </div>
              
              {[{
                number: "1",
                title: "Understand the full Syllabus",
                description: "Get a comprehensive overview of your English syllabus with detailed breakdowns of all components and requirements.",
                link: "/syllabus",
                icon: <BookOpen className="w-5 h-5" />
              }, {
                number: "2",
                title: "Read notes and guides",
                description: "Access our extensive collection of study materials, detailed guides, and expert analysis to build your foundation.",
                link: "/resources",
                icon: <FileText className="w-5 h-5" />
              }, {
                number: "3",
                title: "Practice past papers",
                description: "Work through our collection of past papers from various exam boards to familiarize yourself with question formats.",
                link: "/practice",
                icon: <PenTool className="w-5 h-5" />
              }, {
                number: "4",
                title: "Mark your Essays",
                description: "Get instant AI-powered feedback on your essays with detailed analysis and improvement suggestions.",
                link: "/ai-marking",
                icon: <Award className="w-5 h-5" />
              }].map((step, index) => (
                <div key={index} className="group flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 cursor-pointer" onClick={() => navigate(step.link)}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-semibold text-lg shadow-lg group-hover:scale-110 transition-transform duration-200">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-600 transition-colors">{step.title}</h3>
                      <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {step.icon}
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="relative z-10 py-20 sm:py-28 mb-16 sm:mb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Free Resources Available</h2>
            <p className="text-lg text-muted-foreground mb-8">Everything you need for IGCSE and A Level English success</p>
            <button onClick={() => navigate('/resources')} className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1">
              View all Resources <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              title: "Study Notes & Guides",
              desc: "Comprehensive materials covering all English topics and techniques",
              icon: <BookOpen className="w-6 h-6" />,
              count: "50+",
              gradient: "from-blue-500 to-blue-600"
            }, {
              title: "Example Responses",
              desc: "Real A* exam answers with detailed analysis and commentary",
              icon: <FileText className="w-6 h-6" />,
              count: "100+",
              gradient: "from-green-500 to-green-600"
            }, {
              title: "Past Papers Collection",
              desc: "Extensive collection from multiple exam boards and years",
              icon: <Target className="w-6 h-6" />,
              count: "500+",
              gradient: "from-purple-500 to-purple-600"
            }, {
              title: "Writing Techniques",
              desc: "Advanced methods and strategies for essay excellence",
              icon: <PenTool className="w-6 h-6" />,
              count: "25+",
              gradient: "from-orange-500 to-orange-600"
            }, {
              title: "Analysis Frameworks",
              desc: "Structured approaches to literature and language analysis",
              icon: <Zap className="w-6 h-6" />,
              count: "30+",
              gradient: "from-pink-500 to-pink-600"
            }, {
              title: "Exam Strategies",
              desc: "Time management tips and marking scheme insights",
              icon: <Clock className="w-6 h-6" />,
              count: "15+",
              gradient: "from-teal-500 to-teal-600"
            }].map((resource, index) => (
              <div key={index} className="group bg-card border border-border/50 rounded-xl p-6 hover:border-purple-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer" onClick={() => navigate('/resources')}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${resource.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <div className="text-white">
                      {resource.icon}
                    </div>
                  </div>
                  <span className={`text-sm font-medium text-white bg-gradient-to-r ${resource.gradient} px-3 py-1 rounded-full shadow-sm`}>
                    {resource.count}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.desc}</p>
                <div className="flex items-center text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
            `,
            backgroundSize: "60px 60px"
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white/80 text-sm font-medium">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            Trusted by 10,000+ students
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to achieve your{" "}
            <span className="relative">
              A*?
              <div className="absolute -inset-2 bg-white/20 blur-lg rounded-lg"></div>
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have transformed their English grades with our comprehensive free resources.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/resources')} className="group bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/95 transition-all duration-200 hover:scale-105 shadow-xl">
              <span className="flex items-center gap-2">
                Start Your Journey Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button onClick={() => navigate('/practice')} className="group text-white border-2 border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
              Practice Now
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EverythingEnglishLanding;
