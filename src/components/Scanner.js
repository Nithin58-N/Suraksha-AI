import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Scanner.css';

function Scanner({ onResult }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('text');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // ✅ NEW: Auto detect input type
  const detectInputType = (text) => {
    const urlPattern = /(https?:\/\/|www\.)/i;
    const jobKeywords = /(job|salary|apply|hiring|registration fee|work from home|earn)/i;

    if (urlPattern.test(text)) return 'url';
    if (jobKeywords.test(text)) return 'job';
    return 'text';
  };

  // ✅ NEW: Clear results when switching tabs
  useEffect(() => {
    setInput('');
    setFile(null);
    onResult(null); // clear previous result
  }, [activeTab]);

  const handleScan = async () => {
    if (!input.trim() && !file) return;

    setLoading(true);
    try {
      let response;

      // ✅ IMAGE SCAN
      if (activeTab === 'image' && file) {
        const formData = new FormData();
        formData.append('image', file);
        response = await axios.post('/api/scan/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // ✅ AUTO-DETECT TYPE
        const detectedType = detectInputType(input);

        response = await axios.post('/api/scan', {
          text: input,
          type: detectedType   // 🔥 use detected type instead of tab
        });
      }

      onResult(response.data);
    } catch (error) {
      console.error('Scan error:', error);
      onResult({
        riskLevel: 'error',
        message: 'Error analyzing content. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="scanner">
      <div className="tabs">
        <button 
          className={activeTab === 'text' ? 'active' : ''}
          onClick={() => setActiveTab('text')}
        >
          {t('scanText')}
        </button>
        <button 
          className={activeTab === 'url' ? 'active' : ''}
          onClick={() => setActiveTab('url')}
        >
          {t('scanURL')}
        </button>
        <button 
          className={activeTab === 'job' ? 'active' : ''}
          onClick={() => setActiveTab('job')}
        >
          {t('scanJob')}
        </button>
        <button 
          className={activeTab === 'image' ? 'active' : ''}
          onClick={() => setActiveTab('image')}
        >
          {t('scanImage')}
        </button>
      </div>

      <div className="scanner-content">
        {activeTab === 'image' ? (
          <div className="file-upload">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              id="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              {file ? file.name : t('uploadImage')}
            </label>
          </div>
        ) : (
          <>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(`placeholder.${activeTab}`)}
              rows="6"
            />

            {/* ✅ OPTIONAL: show detected type */}
            {input && (
              <p className="detected-type">
                Detected type: <strong>{detectInputType(input)}</strong>
              </p>
            )}
          </>
        )}

        <button 
          className="analyze-btn"
          onClick={handleScan}
          disabled={loading || (!input.trim() && !file)}
        >
          {loading ? t('analyzing') : t('analyze')}
        </button>
      </div>
    </div>
  );
}

export default Scanner;
