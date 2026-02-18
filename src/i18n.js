import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "SurakshaAI - Cyber Safety Assistant",
      subtitle: "Protect yourself from scams and phishing",
      scanText: "Scan Text/Message",
      scanURL: "Scan URL",
      scanJob: "Scan Job Post",
      scanImage: "Scan Screenshot",
      placeholder: {
        text: "Paste suspicious message here...",
        url: "Enter URL to check...",
        job: "Paste job posting details..."
      },
      analyze: "Analyze",
      uploading: "Uploading...",
      analyzing: "Analyzing...",
      uploadImage: "Upload Screenshot",
      risk: {
        safe: "Safe",
        suspicious: "Suspicious",
        dangerous: "Dangerous"
      },
      recommendations: "Safety Recommendations",
      language: "Language"
    }
  },
  kn: {
    translation: {
      title: "ಸುರಕ್ಷಾ AI - ಸೈಬರ್ ಸುರಕ್ಷತಾ ಸಹಾಯಕ",
      subtitle: "ವಂಚನೆ ಮತ್ತು ಫಿಶಿಂಗ್‌ನಿಂದ ನಿಮ್ಮನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಿ",
      scanText: "ಪಠ್ಯ/ಸಂದೇಶವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanURL: "URL ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanJob: "ಉದ್ಯೋಗ ಪೋಸ್ಟ್ ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanImage: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      placeholder: {
        text: "ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...",
        url: "ಪರಿಶೀಲಿಸಲು URL ನಮೂದಿಸಿ...",
        job: "ಉದ್ಯೋಗ ಪೋಸ್ಟಿಂಗ್ ವಿವರಗಳನ್ನು ಅಂಟಿಸಿ..."
      },
      analyze: "ವಿಶ್ಲೇಷಿಸಿ",
      uploading: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      uploadImage: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      risk: {
        safe: "ಸುರಕ್ಷಿತ",
        suspicious: "ಅನುಮಾನಾಸ್ಪದ",
        dangerous: "ಅಪಾಯಕಾರಿ"
      },
      recommendations: "ಸುರಕ್ಷತಾ ಶಿಫಾರಸುಗಳು",
      language: "ಭಾಷೆ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
