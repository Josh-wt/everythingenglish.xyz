import { Clock } from "lucide-react";

const Planner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30">
          <Clock className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          Coming Soon
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          We're working on something amazing! Our AI-powered study planner will help you create personalized learning paths tailored to your goals.
        </p>
        
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
          Stay tuned for updates
        </div>
      </div>
    </div>
  );
};

export default Planner;
