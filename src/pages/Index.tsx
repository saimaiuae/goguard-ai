import { useEffect, useMemo } from 'react';
import { ArrowRight, ActivitySquare, Shield, MonitorSmartphone, Database, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isRTL = language === 'ar';

  const ctaTitle = useMemo(() => {
    const titleParts = t('cta.title').split('While');
    return titleParts.length > 1 ? (
      <>
        {titleParts[0]}
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-athlete-blue to-athlete-cyan">
          {titleParts[1]}
        </span>
      </>
    ) : (
      t('cta.title')
    );
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4">
              <span className="text-athlete-blue text-sm font-medium">{t('features.subtitle')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title={t('feature.aiTracking.title')} description={t('feature.aiTracking.description')} icon={ActivitySquare} color="bg-athlete-blue" delay={100} />
            <FeatureCard title={t('feature.injuryRisk.title')} description={t('feature.injuryRisk.description')} icon={Shield} color="bg-athlete-purple" delay={200} />
            <FeatureCard title={t('feature.fatigue.title')} description={t('feature.fatigue.description')} icon={MonitorSmartphone} color="bg-athlete-cyan" delay={300} />
            <FeatureCard title={t('feature.analytics.title')} description={t('feature.analytics.description')} icon={Database} color="bg-athlete-orange" delay={400} />
            <FeatureCard title={t('feature.sprint.title')} description={t('feature.sprint.description')} icon={ArrowRight} color="bg-athlete-red" delay={500} />
            <FeatureCard title={t('feature.insights.title')} description={t('feature.insights.description')} icon={Info} color="bg-athlete-blue-dark" delay={600} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-athlete-darker">
        <div className="absolute inset-0 opacity-20 bg-dot-pattern pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-athlete-blue/10 to-transparent"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="glass-panel rounded-lg p-8 md:p-12 max-w-4xl mx-auto text-center">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-athlete-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-athlete-purple/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {ctaTitle}
              </h2>

              <p className="text-lg text-muted-foreground mb-8">{t('cta.subtitle')}</p>

              <div className={`flex flex-col sm:flex-row justify-center gap-4 ${isRTL ? 'rtl:flex-row-reverse' : ''}`}>
                <Button asChild size="lg" className="bg-athlete-blue hover:bg-athlete-blue-dark text-white">
                  <Link to="/dashboard" className="gap-2 flex items-center">
                    {t('cta.upload')}
                    <ArrowRight size={16} className={isRTL ? 'transform rotate-180' : ''} />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href="#" className="gap-2 flex items-center">
                    <Info size={16} />
                    {t('cta.learnMore')}
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
