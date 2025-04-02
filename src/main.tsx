
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check for any saved language preference
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
document.documentElement.lang = savedLanguage;

// Apply RTL direction if Arabic is selected
const dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
document.body.dir = dir;
document.documentElement.setAttribute('dir', dir);
document.documentElement.style.textAlign = savedLanguage === 'ar' ? 'right' : 'left';

// Apply special RTL styles if needed
if (savedLanguage === 'ar') {
  document.documentElement.classList.add('rtl-lang');
} else {
  document.documentElement.classList.remove('rtl-lang');
}

createRoot(document.getElementById("root")!).render(<App />);
