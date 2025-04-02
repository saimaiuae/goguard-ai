
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the available languages
export type Language = 'en' | 'ar';

// Create the context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const enTranslations: Record<string, string> = {
  // Navbar
  'nav.home': 'Home',
  'nav.dashboard': 'Dashboard',
  'nav.features': 'Features',
  'nav.getStarted': 'Get Started',

  // Footer
  'footer.siteLinks': 'Site Links',
  'footer.resources': 'Resources',
  'footer.apiDocs': 'API Documentation',
  'footer.sportsScience': 'Sports Science',
  'footer.caseStudies': 'Case Studies',
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.rights': 'All rights reserved.',
  'footer.protected': 'Protected by AthleteGuard AI Technology',

  // Hero
  'hero.title': 'Protect Athletes with Advanced AI Technology',
  'hero.subtitle': 'Real-time injury prediction and performance analytics',
  'hero.cta': 'Start Free Trial',
  'hero.watchDemo': 'Watch Demo',
  'hero.aiPowered': 'AI-Powered Sports Analytics',
  'hero.mainTitle1': 'Predict & Prevent',
  'hero.mainTitle2': 'Sports Injuries',
  'hero.mainTitle3': 'With AI',
  'hero.description': 'AthleteGuard AI analyzes athlete movements in real-time to identify fatigue patterns and predict potential injury risks, keeping your team performing at their best.',
  'hero.uploadVideo': 'Upload Your Video',
  'hero.exploreFeatures': 'Explore Features',
  'hero.aiProtection': 'AI-powered protection',
  'hero.realTime': 'Real-time tracking',
  'hero.performanceInsights': 'Performance insights',
  'hero.processingVideo': 'Processing Video...',
  'hero.analyzingMovements': 'Analyzing player movements',
  'hero.fatigueIndex': 'Fatigue Index',
  'hero.injuryRisk': 'Injury Risk',
  'hero.medium': 'Medium',
  'hero.sprintCount': 'Sprint Count',
  'hero.fromAvg': '+3 from avg.',
  'hero.playTime': 'Play Time',
  'hero.minutes': 'minutes',
  
  // Features
  'features.title': 'Cutting-Edge Features for Athletic Excellence',
  'features.subtitle': 'Powered by Advanced AI',
  'features.description': 'AthleteGuard AI uses computer vision and machine learning to analyze player movements, detect fatigue patterns, and predict potential injury risks in real-time.',
  
  // Dashboard
  'dashboard.title': 'Dashboard',
  'dashboard.subtitle': 'Upload and analyze sports footage using your Flask model.',
  'dashboard.connected': 'AI System Connected',
  'dashboard.upload': 'Upload',
  'dashboard.analytics': 'Analytics',
  'dashboard.settings': 'Settings',
  
  // Feature Cards
  'feature.aiTracking.title': 'AI-Powered Player Tracking',
  'feature.aiTracking.description': 'Track multiple players simultaneously with advanced computer vision that identifies key body points and analyzes movement patterns.',
  'feature.injuryRisk.title': 'Injury Risk Prediction',
  'feature.injuryRisk.description': 'Proprietary algorithms predict potential injury risks by analyzing movement patterns and comparing them to our extensive database.',
  'feature.fatigue.title': 'Real-Time Fatigue Analysis',
  'feature.fatigue.description': 'Monitor player fatigue levels in real-time to make data-driven decisions about substitutions and prevent overexertion.',
  'feature.analytics.title': 'Performance Data Analytics', 
  'feature.analytics.description': 'Comprehensive analytics dashboard with actionable insights and personalized recommendations for each player.',
  'feature.sprint.title': 'Sprint & Activity Metrics',
  'feature.sprint.description': 'Track sprint count, intensity, and overall activity levels to optimize training regimens and match strategies.',
  'feature.insights.title': 'Detailed Injury Insights',
  'feature.insights.description': 'Get specific insights about which types of injuries each player might be at risk for, with recommendations to mitigate risks.',
  
  // CTA Section
  'cta.title': 'Elevate Your Team\'s Performance While Reducing Injury Risks',
  'cta.subtitle': 'Start analyzing your team\'s performance today. Upload game footage and get instant insights.',
  'cta.upload': 'Upload Your First Video',
  'cta.learnMore': 'Learn More',
  
  // Dashboard Content
  'dashboard.noVideo': 'No Video Analyzed Yet',
  'dashboard.noVideoDesc': 'To view real-time player analysis, please upload a video from the Upload tab.',
  'dashboard.goUpload': 'Go to Upload',
  'dashboard.processing': 'Processing video data from your Flask model...',
  'dashboard.performanceSummary': 'Performance Summary',
  'dashboard.modelAnalysis': 'Your Model Analysis',
  'dashboard.performanceTrends': 'Performance Trends',
  'dashboard.riskFactors': 'Injury Risk Factors',
  'dashboard.recommendations': 'AI Recommendations',
  'dashboard.substitution': 'Consider Substitution at 70-80 Minutes',
  'dashboard.substitutionDesc': 'Performance metrics show significant fatigue after 70 minutes of play, increasing injury risk. Consider a substitution in this window.',
  'dashboard.modifySprint': 'Modify Sprint Training',
  'dashboard.modifySprintDesc': 'Sprint performance decreases by 35% in second half. Recommend focused sprint endurance training to maintain performance longer.',
  'dashboard.recovery': 'Recovery Protocol',
  'dashboard.recoveryDesc': 'Based on fatigue patterns, implement enhanced recovery protocol with focus on lower limb muscle groups.',
  
  // Player Stats
  'stats.minutesPlayed': 'Minutes Played',
  'stats.sprintCount': 'Sprint Count',
  'stats.maxSpeed': 'Max Speed',
  'stats.fatigueIndex': 'Fatigue Index',
  'stats.activityLevel': 'Activity Level',
  'stats.high': 'High',
  
  // Upload Tab
  'dashboard.uploadVideo': 'Upload Video',
  'dashboard.recentlyAnalyzed': 'Recently Analyzed',
  'dashboard.currentSession': 'Team Practice - Current Session',
  'dashboard.practice1': 'Team Practice - Jun 15',
  'dashboard.championship': 'Championship Game',
  'dashboard.training': 'Training Session',
  'dashboard.howItWorks': 'How It Works',
  'dashboard.analyzed': 'Analyzed',
  'dashboard.analyzing': 'Analyzing...',
  
  // Steps
  'dashboard.step1Title': 'Upload Your Video',
  'dashboard.step1Desc': 'Upload footage that will be sent to your Flask AI model for processing.',
  'dashboard.step2Title': 'AI Processes the Video',
  'dashboard.step2Desc': 'Your Flask backend analyzes the video using your trained AI models.',
  'dashboard.step3Title': 'Review ML Insights',
  'dashboard.step3Desc': 'View the analysis results returned by your Flask model in our dashboard.',
  'dashboard.step4Title': 'Take Action Based on Analysis',
  'dashboard.step4Desc': 'Use the ML-driven insights to make informed decisions about player performance.',
  
  // Risk Factors
  'risk.runningForm': 'Running Form',
  'risk.landingMechanics': 'Landing Mechanics',
  'risk.movementRange': 'Movement Range',
  'risk.fatigueResponse': 'Fatigue Response',
  'risk.runningFormDesc': 'Minor asymmetry in stride pattern',
  'risk.landingMechanicsDesc': 'Occasional heavy landings',
  'risk.movementRangeDesc': 'Good overall range of motion',
  'risk.fatigueResponseDesc': 'Form deteriorates when fatigued'
};

// Arabic translations
const arTranslations: Record<string, string> = {
  // Navbar
  'nav.home': 'الرئيسية',
  'nav.dashboard': 'لوحة التحكم',
  'nav.features': 'المميزات',
  'nav.getStarted': 'ابدأ الآن',

  // Footer
  'footer.siteLinks': 'روابط الموقع',
  'footer.resources': 'الموارد',
  'footer.apiDocs': 'توثيق API',
  'footer.sportsScience': 'علوم الرياضة',
  'footer.caseStudies': 'دراسات الحالة',
  'footer.privacyPolicy': 'سياسة الخصوصية',
  'footer.rights': 'جميع الحقوق محفوظة.',
  'footer.protected': 'محمي بتقنية AthleteGuard AI',

  // Hero
  'hero.title': 'حماية الرياضيين بتقنية الذكاء الاصطناعي المتقدمة',
  'hero.subtitle': 'تنبؤ بالإصابات في الوقت الحقيقي وتحليل الأداء',
  'hero.cta': 'ابدأ النسخة التجريبية المجانية',
  'hero.watchDemo': 'شاهد العرض التوضيحي',
  'hero.aiPowered': 'تحليلات رياضية مدعومة بالذكاء الاصطناعي',
  'hero.mainTitle1': 'توقع ومنع',
  'hero.mainTitle2': 'إصابات رياضية',
  'hero.mainTitle3': 'مع الذكاء الاصطناعي',
  'hero.description': 'يقوم AthleteGuard AI بتحليل حركات الرياضيين في الوقت الفعلي لتحديد أنماط التعب والتنبؤ بمخاطر الإصابات المحتملة، مما يحافظ على أداء فريقك بأفضل حالاته.',
  'hero.uploadVideo': 'قم بتحميل الفيديو',
  'hero.exploreFeatures': 'استكشف المميزات',
  'hero.aiProtection': 'حماية بالذكاء الاصطناعي',
  'hero.realTime': 'تتبع في الوقت الحقيقي',
  'hero.performanceInsights': 'رؤى أداء',
  'hero.processingVideo': 'معالجة الفيديو...',
  'hero.analyzingMovements': 'تحليل حركات اللاعب',
  'hero.fatigueIndex': 'مؤشر الإرهاق',
  'hero.injuryRisk': 'خطر الإصابة',
  'hero.medium': 'متوسط',
  'hero.sprintCount': 'عدد السرعات',
  'hero.fromAvg': '+3 من المتوسط',
  'hero.playTime': 'وقت اللعب',
  'hero.minutes': 'دقائق',
  
  // Features
  'features.title': 'ميزات متطورة للتميز الرياضي',
  'features.subtitle': 'مدعوم بالذكاء الاصطناعي المتقدم',
  'features.description': 'يستخدم AthleteGuard AI الرؤية الحاسوبية والتعلم الآلي لتحليل حركات اللاعبين واكتشاف أنماط التعب والتنبؤ بمخاطر الإصابة المحتملة في الوقت الفعلي.',
  
  // Dashboard
  'dashboard.title': 'لوحة التحكم',
  'dashboard.subtitle': 'قم بتحميل وتحليل لقطات رياضية باستخدام نموذج Flask الخاص بك.',
  'dashboard.connected': 'نظام الذكاء الاصطناعي متصل',
  'dashboard.upload': 'تحميل',
  'dashboard.analytics': 'التحليلات',
  'dashboard.settings': 'الإعدادات',
  
  // Feature Cards
  'feature.aiTracking.title': 'تتبع اللاعبين بالذكاء الاصطناعي',
  'feature.aiTracking.description': 'تتبع لاعبين متعددين في وقت واحد باستخدام رؤية الكمبيوتر المتقدمة التي تحدد نقاط الجسم الرئيسية وتحلل أنماط الحركة.',
  'feature.injuryRisk.title': 'التنبؤ بمخاطر الإصابة',
  'feature.injuryRisk.description': 'خوارزميات خاصة تتنبأ بمخاطر الإصابة المحتملة من خلال تحليل أنماط الحركة ومقارنتها بقاعدة بياناتنا الشاملة.',
  'feature.fatigue.title': 'تحليل الإرهاق في الوقت الفعلي',
  'feature.fatigue.description': 'مراقبة مستويات إرهاق اللاعب في الوقت الفعلي لاتخاذ قرارات مستندة إلى البيانات بشأن التبديلات ومنع الإجهاد المفرط.',
  'feature.analytics.title': 'تحليلات بيانات الأداء',
  'feature.analytics.description': 'لوحة معلومات تحليلية شاملة مع رؤى قابلة للتنفيذ وتوصيات مخصصة لكل لاعب.',
  'feature.sprint.title': 'مقاييس السرعة والنشاط',
  'feature.sprint.description': 'تتبع عدد السرعات والكثافة ومستويات النشاط العامة لتحسين أنظمة التدريب واستراتيجيات المباريات.',
  'feature.insights.title': 'رؤى مفصلة عن الإصابات',
  'feature.insights.description': 'احصل على رؤى محددة حول أنواع الإصابات التي قد يكون كل لاعب معرضًا لها، مع توصيات للتخفيف من المخاطر.',
  
  // CTA Section
  'cta.title': 'ارفع مستوى أداء فريقك مع تقليل مخاطر الإصابة',
  'cta.subtitle': 'ابدأ في تحليل أداء فريقك اليوم. قم بتحميل لقطات المباراة واحصل على رؤى فورية.',
  'cta.upload': 'قم بتحميل أول فيديو لك',
  'cta.learnMore': 'اعرف المزيد',
  
  // Dashboard Content
  'dashboard.noVideo': 'لم يتم تحليل أي فيديو حتى الآن',
  'dashboard.noVideoDesc': 'لعرض تحليل اللاعب في الوقت الفعلي، يرجى تحميل فيديو من علامة التبويب تحميل.',
  'dashboard.goUpload': 'انتقل إلى التحميل',
  'dashboard.processing': 'معالجة بيانات الفيديو من نموذج Flask الخاص بك...',
  'dashboard.performanceSummary': 'ملخص الأداء',
  'dashboard.modelAnalysis': 'تحليل النموذج الخاص بك',
  'dashboard.performanceTrends': 'اتجاهات الأداء',
  'dashboard.riskFactors': 'عوامل خطر الإصابة',
  'dashboard.recommendations': 'توصيات الذكاء الاصطناعي',
  'dashboard.substitution': 'النظر في التبديل عند 70-80 دقيقة',
  'dashboard.substitutionDesc': 'تظهر مقاييس الأداء تعبًا كبيرًا بعد 70 دقيقة من اللعب، مما يزيد من خطر الإصابة. فكر في إجراء تبديل في هذه الفترة.',
  'dashboard.modifySprint': 'تعديل تدريب السرعة',
  'dashboard.modifySprintDesc': 'ينخفض أداء السرعة بنسبة 35٪ في النصف الثاني. نوصي بتدريب مركز على تحمل السرعة للحفاظ على الأداء لفترة أطول.',
  'dashboard.recovery': 'بروتوكول التعافي',
  'dashboard.recoveryDesc': 'بناءً على أنماط التعب، قم بتنفيذ بروتوكول تعافي محسن مع التركيز على مجموعات عضلات الأطراف السفلية.',
  
  // Player Stats
  'stats.minutesPlayed': 'دقائق اللعب',
  'stats.sprintCount': 'عدد السرعات',
  'stats.maxSpeed': 'السرعة القصوى',
  'stats.fatigueIndex': 'مؤشر الإرهاق',
  'stats.activityLevel': 'مستوى النشاط',
  'stats.high': 'مرتفع',
  
  // Upload Tab
  'dashboard.uploadVideo': 'تحميل الفيديو',
  'dashboard.recentlyAnalyzed': 'تم تحليله مؤخرًا',
  'dashboard.currentSession': 'تدريب الفريق - الجلسة الحالية',
  'dashboard.practice1': 'تدريب الفريق - ١٥ يونيو',
  'dashboard.championship': 'مباراة البطولة',
  'dashboard.training': 'جلسة تدريب',
  'dashboard.howItWorks': 'كيف يعمل',
  'dashboard.analyzed': 'تم التحليل',
  'dashboard.analyzing': 'جاري التحليل...',
  
  // Steps
  'dashboard.step1Title': 'قم بتحميل الفيديو الخاص بك',
  'dashboard.step1Desc': 'قم بتحميل اللقطات التي سيتم إرسالها إلى نموذج الذكاء الاصطناعي Flask الخاص بك للمعالجة.',
  'dashboard.step2Title': 'يعالج الذكاء الاصطناعي الفيديو',
  'dashboard.step2Desc': 'تقوم الواجهة الخلفية Flask الخاصة بك بتحليل الفيديو باستخدام نماذج الذكاء الاصطناعي المدربة لديك.',
  'dashboard.step3Title': 'مراجعة رؤى التعلم الآلي',
  'dashboard.step3Desc': 'عرض نتائج التحليل التي يعيدها نموذج Flask الخاص بك في لوحة التحكم.',
  'dashboard.step4Title': 'اتخاذ إجراء بناءً على التحليل',
  'dashboard.step4Desc': 'استخدم الرؤى المدعومة بالتعلم الآلي لاتخاذ قرارات مستنيرة بشأن أداء اللاعب.',
  
  // Risk Factors
  'risk.runningForm': 'شكل الجري',
  'risk.landingMechanics': 'ميكانيكا الهبوط',
  'risk.movementRange': 'نطاق الحركة',
  'risk.fatigueResponse': 'استجابة التعب',
  'risk.runningFormDesc': 'عدم تناسق طفيف في نمط الخطوة',
  'risk.landingMechanicsDesc': 'هبوط ثقيل من حين لآخر',
  'risk.movementRangeDesc': 'نطاق حركة جيد بشكل عام',
  'risk.fatigueResponseDesc': 'تدهور الشكل عند التعب'
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with saved preference or default to 'en'
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('preferredLanguage') as Language) || 'en'
  );

  // Effect to update document direction when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = dir;
    document.documentElement.setAttribute('dir', dir);
    
    // Apply special RTL styles if needed
    if (language === 'ar') {
      document.documentElement.classList.add('rtl-lang');
    } else {
      document.documentElement.classList.remove('rtl-lang');
    }
    
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = language === 'en' ? enTranslations : arTranslations;
    return translations[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
