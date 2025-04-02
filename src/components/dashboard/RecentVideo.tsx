
import React from 'react';
import { FileVideo, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RecentVideoProps {
  title: string;
  duration: string;
  date: string;
  players: number | string;
  isNew?: boolean;
}

const RecentVideo = ({ title, duration, date, players, isNew }: RecentVideoProps) => {
  const { language } = useLanguage();
  
  return (
    <div className={`neo-panel p-4 rounded-lg flex gap-4 ${isNew ? 'border border-athlete-blue/30' : ''}`}>
      <div className={`w-12 h-12 bg-athlete-blue/20 rounded-md flex-center flex-shrink-0 ${language === 'ar' ? 'order-last' : 'order-first'}`}>
        <FileVideo size={20} className="text-athlete-blue" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium truncate">{title}</h3>
          {isNew && (
            <span className="px-1.5 py-0.5 bg-athlete-blue text-white text-xs rounded-full">
              {language === 'ar' ? 'جديد' : 'New'}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {duration}
          </div>
          <div>{date}</div>
          <div className="flex items-center gap-1">
            <Users size={12} />
            {players}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentVideo;
