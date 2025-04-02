
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 max-w-md animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex-center">
            <FileQuestion size={32} className="text-athlete-blue" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for can't be found.
          </p>
          
          <Button asChild className="bg-athlete-blue hover:bg-athlete-blue-dark text-white gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
