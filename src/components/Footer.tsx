
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="bg-athlete-darker border-t border-white/5 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <img src="/lovable-uploads/8237163e-bd4e-40a5-bade-b7c0ae3ca606.png" alt="AthleteGuard AI Logo" className="w-full h-full object-cover" />
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
            <h3 className="font-medium text-lg mb-4">{t('footer.siteLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-white transition">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-white transition">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="#features" className="text-muted-foreground hover:text-white transition">
                  {t('nav.features')}
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
            <h3 className="font-medium text-lg mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  {t('footer.apiDocs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  {t('footer.sportsScience')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  {t('footer.caseStudies')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AthleteGuard AI. {t('footer.rights')}
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5 text-xs text-white/70">
            <Shield size={12} className="text-athlete-blue" />
            {t('footer.protected')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
