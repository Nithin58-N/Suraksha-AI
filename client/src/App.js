import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Scanner from './components/Scanner';
import Result from './components/Result';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [result, setResult] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <div className="language-selector">
          <button 
            onClick={() => changeLanguage('en')}
            className={i18n.language === 'en' ? 'active' : ''}
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('kn')}
            className={i18n.language === 'kn' ? 'active' : ''}
          >
            ಕನ್ನಡ
          </button>
        </div>
      </header>

      <main className="main">
        <Scanner onResult={setResult} />
        {result && <Result data={result} />}
      </main>

      <footer className="footer">
        <p>© 2024 SurakshaAI - Protecting Rural India from Cyber Threats</p>
      </footer>
    </div>
  );
}

export default App;
