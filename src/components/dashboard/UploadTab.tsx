
import React from 'react';
import VideoUploader from '@/components/VideoUploader';
import Step from './Step';
import RecentVideo from './RecentVideo';
import { API_CONFIG } from '@/config/api';
import { useLanguage } from '@/context/LanguageContext';

interface UploadTabProps {
  videoUploaded: boolean;
  processingVideo: boolean;
  predictionResults: any;
  onVideoUploaded: (results: any) => void;
}

const UploadTab = ({ 
  videoUploaded, 
  processingVideo, 
  predictionResults, 
  onVideoUploaded 
}: UploadTabProps) => {
  const { t, language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">{t('dashboard.uploadVideo')}</h2>
          <VideoUploader 
            onVideoUploaded={onVideoUploaded} 
            modelApiUrl={API_CONFIG.modelApiUrl}
          />
        </div>
        
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">{t('dashboard.recentlyAnalyzed')}</h2>
          <div className="space-y-3">
            {videoUploaded && (
              <RecentVideo 
                title={t('dashboard.currentSession')}
                duration={processingVideo ? t('dashboard.processing') : t('dashboard.analyzed')} 
                date={new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : undefined)} 
                players={processingVideo ? t('dashboard.analyzing') : predictionResults?.players?.length.toString() || "0"}
                isNew
              />
            )}
            <RecentVideo 
              title={t('dashboard.practice1')}
              duration="01:32:45" 
              date={language === 'ar' ? '١٥ يونيو، ٢٠٢٣' : 'Jun 15, 2023'} 
              players={12} 
            />
            <RecentVideo 
              title={t('dashboard.championship')} 
              duration="01:48:12" 
              date={language === 'ar' ? '٢٨ مايو، ٢٠٢٣' : 'May 28, 2023'} 
              players={11} 
            />
            <RecentVideo 
              title={t('dashboard.training')} 
              duration="00:45:30" 
              date={language === 'ar' ? '٢٠ مايو، ٢٠٢٣' : 'May 20, 2023'} 
              players={9} 
            />
          </div>
        </div>
      </div>
      
      <div className="glass-panel rounded-lg p-6 h-fit">
        <h2 className="text-xl font-medium mb-6">{t('dashboard.howItWorks')}</h2>
        <div className="space-y-6">
          <Step 
            number={1} 
            title={t('dashboard.step1Title')} 
            description={t('dashboard.step1Desc')} 
          />
          <Step 
            number={2} 
            title={t('dashboard.step2Title')} 
            description={t('dashboard.step2Desc')} 
          />
          <Step 
            number={3} 
            title={t('dashboard.step3Title')} 
            description={t('dashboard.step3Desc')} 
          />
          <Step 
            number={4} 
            title={t('dashboard.step4Title')} 
            description={t('dashboard.step4Desc')} 
          />
        </div>
      </div>
    </div>
  );
};

export default UploadTab;
