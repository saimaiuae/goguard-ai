
import { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Monitor, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: Particle[] = [];
    const particleCount = 100;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        color: `rgba(0, 163, 255, ${Math.random() * 0.3})`,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      });
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(
            Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 163, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #050505 0%, #0A0A0A 100%)' }}
      />
      <div className="absolute inset-0 z-10 bg-dot-pattern opacity-20"></div>
      
      {/* Blue gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-athlete-blue/5 to-transparent z-10"></div>

      <div className="container relative z-20 mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-6 bg-white/5 py-2 px-3 rounded-full w-fit animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-2 w-2 bg-athlete-blue rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/80">AI-Powered Sports Analytics</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Predict & Prevent<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-athlete-blue to-athlete-cyan text-glow">
                Sports Injuries
              </span>
              <br />With AI
            </h1>
            
            <p className="text-lg text-white/70 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              AthleteGuard AI analyzes athlete movements in real-time to identify fatigue patterns and predict potential injury risks, keeping your team performing at their best.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Button asChild size="lg" className="bg-athlete-blue hover:bg-athlete-blue-dark text-white gap-2 rounded-md">
                <Link to="/dashboard">
                  Upload Your Video 
                  <ArrowRight size={16} />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="gap-2 rounded-md">
                <Link to="#features">
                  Explore Features
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-athlete-blue" />
                <span className="text-sm text-white/70">AI-powered protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor size={18} className="text-athlete-blue" />
                <span className="text-sm text-white/70">Real-time tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-athlete-blue" />
                <span className="text-sm text-white/70">Performance insights</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg lg:max-w-md xl:max-w-lg animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-athlete-blue/20 rounded-lg blur-md animate-pulse-glow"></div>
              <div className="relative glass-panel rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-6 flex items-center gap-1.5 px-3 bg-black/30">
                  <div className="h-2 w-2 rounded-full bg-athlete-red"></div>
                  <div className="h-2 w-2 rounded-full bg-athlete-orange"></div>
                  <div className="h-2 w-2 rounded-full bg-athlete-blue"></div>
                </div>
                
                <div className="pt-8 pb-4 px-4">
                  <div className="aspect-video bg-athlete-darker rounded-md overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-6 text-center">
                        <div className="w-16 h-16 border-4 border-t-athlete-blue border-r-athlete-blue/30 border-b-athlete-blue/10 border-l-athlete-blue/50 rounded-full animate-spin mx-auto mb-4"></div>
                        <div className="font-medium text-white">Processing Video...</div>
                        <div className="text-xs text-white/50 mt-1">Analyzing player movements</div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border border-white/10"></div>
                      ))}
                    </div>
                    
                    {/* Simulated detection boxes */}
                    <div className="absolute left-[20%] top-[30%] h-[40%] w-[15%] border-2 border-athlete-blue rounded-sm"></div>
                    <div className="absolute left-[60%] top-[25%] h-[45%] w-[15%] border-2 border-athlete-blue rounded-sm"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* Stat Cards */}
                    <div className="neo-panel p-3 flex flex-col">
                      <span className="text-xs text-white/50 mb-1">Fatigue Index</span>
                      <div className="text-lg font-semibold text-white mb-1">78<span className="text-xs font-normal text-white/50">/100</span></div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-athlete-blue rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div className="neo-panel p-3 flex flex-col">
                      <span className="text-xs text-white/50 mb-1">Injury Risk</span>
                      <div className="text-lg font-semibold text-athlete-red mb-1">Medium</div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-athlete-orange rounded-full" style={{ width: '58%' }}></div>
                      </div>
                    </div>
                    
                    <div className="neo-panel p-3 flex flex-col">
                      <span className="text-xs text-white/50 mb-1">Sprint Count</span>
                      <div className="text-lg font-semibold text-white">12</div>
                      <span className="text-xs text-athlete-blue mt-1">+3 from avg.</span>
                    </div>
                    
                    <div className="neo-panel p-3 flex flex-col">
                      <span className="text-xs text-white/50 mb-1">Play Time</span>
                      <div className="text-lg font-semibold text-white">24:18</div>
                      <span className="text-xs text-white/50 mt-1">minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

export default HeroSection;
