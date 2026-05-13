import { useEffect } from 'react';
import i18n from '../i18n';
import axios from 'axios';

const countryToLanguage = {
  'GB': 'en', // Great Britain
  'NG': 'en', // Nigeria
  'JP': 'ja', // Japan
  'CN': 'zh', // China
  'ES': 'es', // Spain
  'MX': 'es', // Mexico
  'CO': 'es', // Colombia
  'AR': 'es', // Argentina
  // Add more mappings as needed
};

export const useLanguageDetection = () => {
  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // Only detect if no language is stored in localStorage
        if (!localStorage.getItem('i18nextLng')) {
          const response = await axios.get('https://ipapi.co/json/');
          const countryCode = response.data.country_code;
          const language = countryToLanguage[countryCode] || 'en';
          
          i18n.changeLanguage(language);
        }
      } catch (error) {
        console.error('Error detecting location:', error);
      }
    };

    detectLanguage();
  }, []);
};
