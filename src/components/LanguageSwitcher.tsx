
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    
    // Show toast notification
    toast.success(
      newLanguage === 'en' ? 'Switched to English' : 'تم التبديل إلى العربية',
      {
        description: newLanguage === 'en' 
          ? 'The interface language has been changed to English' 
          : 'تم تغيير لغة الواجهة إلى العربية'
      }
    );
  };

  // Show initial language toast when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    // Only show toast if there's a saved preference
    if (savedLanguage) {
      toast.info(
        savedLanguage === 'en' ? 'Interface language: English' : 'لغة الواجهة: العربية',
        { duration: 2000 }
      );
    }
  }, []);

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-1.5"
    >
      <Globe size={14} />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
