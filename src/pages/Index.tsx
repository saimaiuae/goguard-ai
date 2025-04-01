
import { useEffect } from 'react';
import { ArrowRight, ActivitySquare, Shield, MonitorSmartphone, Database, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4">
              <span className="text-athlete-blue text-sm font-medium">Powered by Advanced AI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cutting-Edge Features for Athletic Excellence
            </h2>
            <p className="text-muted-foreground text-lg">
              AthleteGuard AI uses computer vision and machine learning to analyze player movements,
              detect fatigue patterns, and predict potential injury risks in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="AI-Powered Player Tracking"
              description="Track multiple players simultaneously with advanced computer vision that identifies key body points and analyzes movement patterns."
              icon={ActivitySquare}
              color="bg-athlete-blue"
              delay={100}
            />
            <FeatureCard
              title="Injury Risk Prediction"
              description="Proprietary algorithms predict potential injury risks by analyzing movement patterns and comparing them to our extensive database."
              icon={Shield}
              color="bg-athlete-purple"
              delay={200}
            />
            <FeatureCard
              title="Real-Time Fatigue Analysis"
              description="Monitor player fatigue levels in real-time to make data-driven decisions about substitutions and prevent overexertion."
              icon={MonitorSmartphone}
              color="bg-athlete-cyan"
              delay={300}
            />
            <FeatureCard
              title="Performance Data Analytics"
              description="Comprehensive analytics dashboard with actionable insights and personalized recommendations for each player."
              icon={Database}
              color="bg-athlete-orange"
              delay={400}
            />
            <FeatureCard
              title="Sprint & Activity Metrics"
              description="Track sprint count, intensity, and overall activity levels to optimize training regimens and match strategies."
              icon={ArrowRight}
              color="bg-athlete-red"
              delay={500}
            />
            <FeatureCard
              title="Detailed Injury Insights"
              description="Get specific insights about which types of injuries each player might be at risk for, with recommendations to mitigate risks."
              icon={Info}
              color="bg-athlete-blue-dark"
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative bg-athlete-darker">
        <div className="absolute inset-0 opacity-20 bg-dot-pattern pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-athlete-blue/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="glass-panel rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-athlete-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-athlete-purple/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Elevate Your Team's Performance<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-athlete-blue to-athlete-cyan">
                  While Reducing Injury Risks
                </span>
              </h2>
              
              <p className="text-lg text-center text-muted-foreground mb-8">
                Start analyzing your team's performance today. Upload game footage and get instant insights.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-athlete-blue hover:bg-athlete-blue-dark text-white">
                  <Link to="/dashboard" className="gap-2">
                    Upload Your First Video
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <a href="#" className="gap-2">
                    <Info size={16} />
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
