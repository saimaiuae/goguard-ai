
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-athlete-darker border-t border-white/5 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-md bg-athlete-blue flex-center overflow-hidden">
                <span className="font-bold text-white">A</span>
                <div className="absolute w-full h-1/3 bottom-0 left-0 bg-athlete-blue-dark/80"></div>
              </div>
              <span className="text-xl font-semibold tracking-tight">
                AthleteGuard<span className="text-athlete-blue">AI</span>
              </span>
            </Link>

            <p className="mt-4 text-muted-foreground max-w-md">
              Advanced AI-powered sports analytics platform that helps coaches and athletes predict and prevent injuries through real-time movement analysis.
            </p>

            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="w-8 h-8 flex-center rounded-full bg-white/5 hover:bg-athlete-blue/10 hover:text-athlete-blue transition"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex-center rounded-full bg-white/5 hover:bg-athlete-blue/10 hover:text-athlete-blue transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex-center rounded-full bg-white/5 hover:bg-athlete-blue/10 hover:text-athlete-blue transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Site Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="#features" className="text-muted-foreground hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  Sports Science
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AthleteGuard AI. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5 text-xs text-white/70">
            <Shield size={12} className="text-athlete-blue" />
            Protected by AthleteGuard AI Technology
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
