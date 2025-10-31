import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, FileX, ZoomIn, Clock, MapPin, AlertTriangle, Home, RefreshCw, Eye, Target, Zap, Compass, Fingerprint, HelpCircle, Crosshair, Radar, ScanLine, Camera, Flashlight, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NotFound = () => {
  const location = useLocation();
  const [searchProgress, setSearchProgress] = useState(0);
  const [evidenceFound, setEvidenceFound] = useState(false);
  const [caseNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Simulate investigation progress
    const interval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          setEvidenceFound(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const evidence = [
    { item: "Empty coffee cups", location: "Dev desk", time: "3 hours ago" },
    { item: "Mysterious semicolon", location: "Line 42", time: "Yesterday" },
    { item: "Todo comment", location: "Everywhere", time: "6 months ago" },
    { item: "Git commit: 'fix later'", location: "Repository", time: "Last week" }
  ];

  const suspects = [
    { name: "The Missing Link", status: "Still at large" },
    { name: "Broken Router", status: "Under investigation" },
    { name: "Typo McGee", status: "Escaped via autocorrect" },
    { name: "Cache Bandit", status: "Cleared out" }
  ];

  return (
    <div className="min-h-screen bg-background p-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Ultra Enhanced Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Magnifying Glasses */}
          <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}>
            <ZoomIn className="h-8 w-8 text-primary/40 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute top-60 right-16 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
            <ZoomIn className="h-6 w-6 text-primary/30 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute bottom-40 left-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>
            <ZoomIn className="h-5 w-5 text-primary/50 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-bounce" style={{ animationDelay: '3s', animationDuration: '4.5s' }}>
            <ZoomIn className="h-7 w-7 text-primary/35 animate-spin" style={{ animationDuration: '7s' }} />
          </div>
          <div className="absolute bottom-1/4 left-1/2 animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '5.5s' }}>
            <ZoomIn className="h-6 w-6 text-primary/45 animate-spin" style={{ animationDuration: '9s' }} />
          </div>
          
          {/* Floating Question Marks */}
          <div className="absolute top-32 right-32 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
            <HelpCircle className="h-6 w-6 text-destructive/40 animate-pulse" />
          </div>
          <div className="absolute bottom-60 right-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>
            <HelpCircle className="h-5 w-5 text-destructive/30 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute top-1/2 left-20 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.5s' }}>
            <HelpCircle className="h-4 w-4 text-destructive/50 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute top-3/4 right-1/2 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '4.2s' }}>
            <HelpCircle className="h-5 w-5 text-destructive/35 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Floating Search Icons */}
          <div className="absolute top-16 right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            <Search className="h-5 w-5 text-primary/40 animate-spin" style={{ animationDuration: '5s' }} />
          </div>
          <div className="absolute bottom-32 left-16 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
            <Search className="h-6 w-6 text-primary/30 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute top-2/3 right-12 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.8s' }}>
            <Search className="h-4 w-4 text-primary/50 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          
          {/* Floating Eyes (Watching) */}
          <div className="absolute top-24 left-1/3 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '5s' }}>
            <Eye className="h-5 w-5 text-primary/40 animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
          <div className="absolute bottom-24 right-1/4 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>
            <Eye className="h-4 w-4 text-primary/35 animate-pulse" style={{ animationDuration: '1.5s' }} />
          </div>
          <div className="absolute top-1/4 left-3/4 animate-bounce" style={{ animationDelay: '2.8s', animationDuration: '4.5s' }}>
            <Eye className="h-6 w-6 text-primary/30 animate-pulse" style={{ animationDuration: '2.2s' }} />
          </div>
          
          {/* Floating Crosshairs */}
          <div className="absolute top-40 left-1/2 animate-bounce" style={{ animationDelay: '3s', animationDuration: '6s' }}>
            <Crosshair className="h-6 w-6 text-destructive/30 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="absolute bottom-48 left-32 animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}>
            <Crosshair className="h-5 w-5 text-destructive/40 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDelay: '2.3s', animationDuration: '4.8s' }}>
            <Crosshair className="h-4 w-4 text-destructive/45 animate-spin" style={{ animationDuration: '5s' }} />
          </div>
          
          {/* Floating Fingerprints */}
          <div className="absolute top-52 right-12 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>
            <Fingerprint className="h-4 w-4 text-primary/30 animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-52 left-1/3 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }}>
            <Fingerprint className="h-5 w-5 text-primary/40 animate-pulse" style={{ animationDuration: '2.5s' }} />
          </div>
          <div className="absolute top-2/3 left-1/4 animate-bounce" style={{ animationDelay: '1.6s', animationDuration: '4.2s' }}>
            <Fingerprint className="h-3 w-3 text-primary/50 animate-pulse" style={{ animationDuration: '2.8s' }} />
          </div>
          
          {/* Floating Radars */}
          <div className="absolute top-28 right-40 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '5s' }}>
            <Radar className="h-6 w-6 text-primary/40 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-36 right-1/3 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.5s' }}>
            <Radar className="h-5 w-5 text-primary/30 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="absolute top-3/4 left-1/3 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '3.7s' }}>
            <Radar className="h-4 w-4 text-primary/45 animate-spin" style={{ animationDuration: '5.5s' }} />
          </div>
          
          {/* Floating Cameras */}
          <div className="absolute top-1/4 left-12 animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '4s' }}>
            <Camera className="h-5 w-5 text-destructive/35 animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
          <div className="absolute bottom-1/4 right-16 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '3.5s' }}>
            <Camera className="h-4 w-4 text-destructive/40 animate-pulse" style={{ animationDuration: '1.8s' }} />
          </div>
          <div className="absolute top-1/2 left-1/2 animate-bounce" style={{ animationDelay: '2.7s', animationDuration: '4.3s' }}>
            <Camera className="h-6 w-6 text-destructive/25 animate-pulse" style={{ animationDuration: '2.3s' }} />
          </div>
          
          {/* Floating Flashlights */}
          <div className="absolute top-1/3 right-24 animate-bounce" style={{ animationDelay: '2.2s', animationDuration: '5s' }}>
            <Flashlight className="h-6 w-6 text-primary/30 animate-pulse" style={{ animationDuration: '2.5s' }} />
          </div>
          <div className="absolute bottom-1/3 left-24 animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '4s' }}>
            <Flashlight className="h-5 w-5 text-primary/40 animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-1/2 right-1/3 animate-bounce" style={{ animationDelay: '1.9s', animationDuration: '4.7s' }}>
            <Flashlight className="h-4 w-4 text-primary/50 animate-pulse" style={{ animationDuration: '2.7s' }} />
          </div>
          
          {/* Floating Target Icons */}
          <div className="absolute top-14 left-1/4 animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '3.3s' }}>
            <Target className="h-5 w-5 text-destructive/40 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="absolute bottom-16 right-1/2 animate-bounce" style={{ animationDelay: '2.1s', animationDuration: '3.9s' }}>
            <Target className="h-4 w-4 text-destructive/35 animate-spin" style={{ animationDuration: '3.5s' }} />
          </div>
          
          {/* Floating Compass Icons */}
          <div className="absolute top-36 left-2/3 animate-bounce" style={{ animationDelay: '1.4s', animationDuration: '4.6s' }}>
            <Compass className="h-6 w-6 text-primary/35 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute bottom-44 left-1/4 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '5.2s' }}>
            <Compass className="h-5 w-5 text-primary/40 animate-spin" style={{ animationDuration: '4.5s' }} />
          </div>
          
          {/* Floating Archive Icons */}
          <div className="absolute top-2/3 right-1/4 animate-bounce" style={{ animationDelay: '2.6s', animationDuration: '4.1s' }}>
            <Archive className="h-4 w-4 text-destructive/30 animate-pulse" style={{ animationDuration: '2.1s' }} />
          </div>
          <div className="absolute bottom-2/3 left-1/2 animate-bounce" style={{ animationDelay: '1.1s', animationDuration: '3.4s' }}>
            <Archive className="h-5 w-5 text-destructive/40 animate-pulse" style={{ animationDuration: '2.6s' }} />
          </div>
          
          {/* Enhanced Floating Small Particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute top-60 left-60 w-2 h-2 bg-destructive/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-60 right-60 w-1 h-1 bg-destructive/40 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-80 left-80 w-1.5 h-1.5 bg-primary/25 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-80 right-80 w-2 h-2 bg-destructive/25 rounded-full animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '4.5s' }}></div>
          <div className="absolute top-72 left-24 w-1 h-1 bg-primary/35 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.8s' }}></div>
          <div className="absolute bottom-72 right-24 w-1.5 h-1.5 bg-destructive/35 rounded-full animate-bounce" style={{ animationDelay: '1.3s', animationDuration: '3.8s' }}></div>
          <div className="absolute top-48 left-48 w-2 h-2 bg-primary/45 rounded-full animate-bounce" style={{ animationDelay: '2.3s', animationDuration: '4.2s' }}></div>
          <div className="absolute bottom-48 right-48 w-1 h-1 bg-destructive/45 rounded-full animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.7s' }}></div>
          
          {/* Enhanced Scan Lines */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-destructive/50 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-destructive/30 to-transparent animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
          
          {/* Diagonal Scan Lines */}
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-12 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-destructive/20 to-transparent -rotate-12 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}></div>
        </div>

        {/* Header with Enhanced Animations */}
        <div className="text-center mb-8 relative">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4 hover-lift relative">
              <div className="bg-destructive/10 p-3 rounded-full animate-pulse relative z-10">
                <AlertTriangle className="h-8 w-8 text-destructive animate-bounce" />
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 bg-destructive/20 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-5xl font-bold gradient-text bounce-in relative">
                404 Investigation Bureau
                {/* Floating letters effect */}
                <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <ZoomIn className="h-4 w-4 text-primary/50 animate-spin" />
                </div>
                <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '1s' }}>
                  <Search className="h-3 w-3 text-destructive/50 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </h1>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2 mb-2 animate-pulse relative">
              <div className="absolute inset-0 bg-destructive/30 animate-ping rounded"></div>
              CASE #{caseNumber} - PAGE NOT FOUND
            </Badge>
            <p className="text-muted-foreground text-lg animate-fade-in relative" style={{ animationDelay: '0.5s' }}>
              🚨 URGENT: Digital asset has completely vanished from existence! 🚨
              {/* Floating emergency icons */}
              <span className="absolute -top-1 left-4 animate-bounce" style={{ animationDelay: '0.2s' }}>
                <AlertTriangle className="h-3 w-3 text-destructive/60 animate-pulse" />
              </span>
              <span className="absolute -top-1 right-4 animate-bounce" style={{ animationDelay: '0.8s' }}>
                <AlertTriangle className="h-3 w-3 text-destructive/60 animate-pulse" style={{ animationDelay: '1s' }} />
              </span>
            </p>
          </div>
        </div>

        {/* Big 404 Display with Enhanced Animations */}
        <Card className="mb-8 glass-card border-destructive/50 hover-lift relative">
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 via-transparent to-primary/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <CardContent className="pt-6 relative z-10">
            <div className="text-center space-y-4">
              <div className="text-8xl font-black text-destructive animate-pulse mb-4 relative">
                <span className="inline-block animate-bounce">4</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>0</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>4</span>
                {/* Floating search beams around 404 */}
                <div className="absolute -top-4 -left-4 animate-spin" style={{ animationDuration: '8s' }}>
                  <Search className="h-6 w-6 text-primary/30" />
                </div>
                <div className="absolute -top-4 -right-4 animate-spin" style={{ animationDuration: '6s', animationDelay: '2s' }}>
                  <ZoomIn className="h-6 w-6 text-destructive/30" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <Target className="h-5 w-5 text-primary/40 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-destructive animate-fade-in relative">
                ERROR: PAGE DOES NOT EXIST 
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-destructive animate-pulse"></div>
              </h2>
              <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
                The page you're looking for has never been <span className="font-bold text-destructive animate-pulse">and never will be</span> real
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-md mx-auto animate-fade-in relative" style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-0 bg-destructive/5 animate-ping rounded-lg"></div>
                <p className="text-sm text-destructive font-medium relative z-10">
                  🔍 Target URL: <code className="bg-destructive/20 px-2 py-1 rounded text-xs animate-pulse">{location.pathname}</code>
                </p>
                <p className="text-xs text-muted-foreground mt-2 relative z-10">
                  Status: <span className="text-destructive font-bold animate-bounce">SUSPECT STILL AT LARGE</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Progress with Enhanced Animations */}
        <Card className="mb-8 glass-card animate-fade-in relative" style={{ animationDelay: '0.8s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-destructive/5 animate-pulse rounded-lg" style={{ animationDuration: '3s' }}></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 animate-spin" />
              Emergency Search Protocol Activated
              <div className="ml-auto">
                <Radar className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '2s' }} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="bg-muted rounded-full h-6 overflow-hidden relative">
                <div 
                  className="bg-gradient-to-r from-destructive to-primary h-full transition-all duration-75 ease-out relative"
                  style={{ width: `${searchProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-ping"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground animate-pulse">
                {searchProgress < 25 ? "🔍 Scanning all known servers..." : 
                 searchProgress < 50 ? "🌐 Checking backup dimensions..." :
                 searchProgress < 75 ? "🚨 Deploying emergency protocols..." : 
                 searchProgress < 100 ? "🔬 Analyzing quantum possibilities..." :
                 "❌ SEARCH FAILED: Page confirmed to not exist anywhere in the multiverse. It's been 5 years, move on."}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Evidence Board with Enhanced Animations */}
          <Card className="glass-card hover-lift animate-fade-in relative" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent animate-pulse rounded-lg" style={{ animationDuration: '5s' }}></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                <ZoomIn className="h-5 w-5 animate-pulse" />
                Evidence of Non-Existence
                <div className="ml-auto flex gap-1">
                  <Camera className="h-3 w-3 text-primary animate-pulse" />
                  <Fingerprint className="h-3 w-3 text-destructive animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {evidenceFound ? (
                <div className="space-y-3">
                  {evidence.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3 hover-lift animate-fade-in relative" style={{ animationDelay: `${index * 0.2 + 1.2}s` }}>
                      <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-lg" style={{ animationDelay: `${index * 0.5}s` }}></div>
                      <div className="flex justify-between items-start relative z-10">
                        <span className="font-medium animate-pulse">{item.item}</span>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground relative z-10">
                        <MapPin className="h-3 w-3 animate-bounce" />
                        {item.location}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 space-y-2">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  <div className="flex gap-2">
                    <Search className="h-4 w-4 animate-bounce text-muted-foreground" />
                    <ZoomIn className="h-4 w-4 animate-bounce text-muted-foreground" style={{ animationDelay: '0.2s' }} />
                    <Eye className="h-4 w-4 animate-bounce text-muted-foreground" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <p className="text-sm text-muted-foreground animate-pulse">Gathering evidence...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Suspects with Enhanced Animations */}
          <Card className="glass-card hover-lift animate-fade-in relative" style={{ animationDelay: '1.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-bl from-destructive/5 to-transparent animate-pulse rounded-lg" style={{ animationDuration: '4s' }}></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                <FileX className="h-5 w-5 animate-bounce" />
                Prime Suspects
                <div className="ml-auto">
                  <Target className="h-4 w-4 text-destructive animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                {suspects.map((suspect, index) => (
                  <div key={index} className="border rounded-lg p-3 hover-lift animate-fade-in relative" style={{ animationDelay: `${index * 0.15 + 1.5}s` }}>
                    <div className="absolute inset-0 bg-destructive/5 animate-pulse rounded-lg" style={{ animationDelay: `${index * 0.7}s` }}></div>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="font-medium">{suspect.name}</span>
                      <Badge variant="outline" className="text-xs animate-pulse">
                        {suspect.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Status with Ultra Enhanced Animations */}
        <Card className="glass-card glow-effect mb-8 border-destructive/30 animate-fade-in relative" style={{ animationDelay: '1.8s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-primary/5 to-destructive/10 animate-pulse rounded-lg" style={{ animationDuration: '6s' }}></div>
          <CardContent className="pt-6 relative z-10">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-destructive/20 text-destructive px-6 py-3 rounded-full animate-bounce relative">
                <div className="absolute inset-0 bg-destructive/10 animate-ping rounded-full"></div>
                <Clock className="h-5 w-5 animate-spin relative z-10" />
                <span className="relative z-10">CASE STATUS: UNSOLVED - PAGE DEFINITELY DOESN'T EXIST</span>
              </div>
              <h2 className="text-3xl font-bold animate-pulse relative">
                This page never existed!
                <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '4s' }}>
                  <HelpCircle className="h-6 w-6 text-destructive/50" />
                </div>
              </h2>
              <div className="bg-card border-2 border-destructive/20 rounded-lg p-6 max-w-2xl mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-primary/5 animate-pulse rounded-lg" style={{ animationDuration: '3s' }}></div>
                <p className="text-lg text-muted-foreground mb-4 relative z-10">
                  Our investigation has concluded that the URL <code className="bg-destructive/20 text-destructive px-3 py-1 rounded text-base font-mono animate-pulse">{location.pathname}</code> leads to <span className="font-bold text-destructive">absolutely nothing</span>.
                </p>
                <p className="text-muted-foreground mb-4 relative z-10">
                  This isn't just a missing page - it's a page that <span className="font-bold">never was</span>, never <span className="font-bold">will be</span>, and exists only in the realm of <span className="italic">404 possibilities</span>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
                  <div className="bg-muted/50 p-3 rounded-lg animate-pulse relative">
                    <div className="absolute inset-0 bg-primary/10 animate-ping rounded-lg"></div>
                    <p className="text-sm font-medium relative z-10">🕵️ Investigation Progress</p>
                    <p className="text-xs text-muted-foreground relative z-10">100% Complete</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg animate-pulse relative" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 bg-destructive/10 animate-ping rounded-lg"></div>
                    <p className="text-sm font-medium relative z-10">🎯 Page Existence</p>
                    <p className="text-xs text-destructive font-bold relative z-10">CONFIRMED: NONE</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg animate-pulse relative" style={{ animationDelay: '0.4s' }}>
                    <div className="absolute inset-0 bg-primary/10 animate-ping rounded-lg"></div>
                    <p className="text-sm font-medium relative z-10">🔮 Probability of Recovery</p>
                    <p className="text-xs text-muted-foreground relative z-10">0.00%</p>
                  </div>
                </div>
              </div>
              <p className="text-lg text-muted-foreground italic animate-bounce relative">
                💡 Detective Tip: This page is more lost than socks in a washing machine!
                <span className="absolute -right-4 -top-2 animate-spin" style={{ animationDuration: '5s' }}>
                  <Search className="h-4 w-4 text-primary/40" />
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons with Enhanced Animations */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '2s' }}>
          <Button asChild size="lg" className="glow-effect hover-lift animate-bounce relative">
            <Link to="/">
              <div className="absolute inset-0 bg-primary/20 animate-ping rounded"></div>
              <Home className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10">Escape to Home Base</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover-lift animate-bounce relative" style={{ animationDelay: '0.1s' }}>
            <Link to="/practice">
              <Search className="h-4 w-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              Find Real Pages to Practice
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover-lift animate-bounce relative" style={{ animationDelay: '0.2s' }}>
            <Link to="/resources">
              <FileX className="h-4 w-4 mr-2 animate-pulse" />
              Browse Existing Resources
            </Link>
          </Button>
        </div>

        {/* Footer message with Enhanced Animation */}
        <div className="text-center mt-12 animate-fade-in relative" style={{ animationDelay: '2.5s' }}>
          <p className="text-sm text-muted-foreground italic relative">
            🚨 Nothing bad is actually happening, it's all fun and games :) 🚨
            <span className="absolute -top-3 left-1/4 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <AlertTriangle className="h-3 w-3 text-destructive/40 animate-pulse" />
            </span>
            <span className="absolute -top-3 right-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
              <AlertTriangle className="h-3 w-3 text-destructive/40 animate-pulse" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
