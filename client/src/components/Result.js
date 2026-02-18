import React from 'react';
import { useTranslation } from 'react-i18next';
import './Result.css';

function Result({ data }) {
  const { t } = useTranslation();

  const getRiskColor = (level) => {
    switch (level) {
      case 'safe': return '#4caf50';
      case 'suspicious': return '#ff9800';
      case 'dangerous': return '#f44336';
      default: return '#666';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'safe': return '✓';
      case 'suspicious': return '⚠';
      case 'dangerous': return '✕';
      default: return '?';
    }
  };

  return (
    <div className="result">
      <div 
        className="risk-badge"
        style={{ backgroundColor: getRiskColor(data.riskLevel) }}
      >
        <span className="risk-icon">{getRiskIcon(data.riskLevel)}</span>
        <span className="risk-text">
          {t(`risk.${data.riskLevel}`)}
        </span>
      </div>

      {data.score !== undefined && (
        <div className="risk-score">
          <div className="score-label">Risk Score</div>
          <div className="score-value">{data.score}/100</div>
        </div>
      )}

      {data.threats && data.threats.length > 0 && (
        <div className="threats">
          <h3>Detected Threats:</h3>
          <ul>
            {data.threats.map((threat, index) => (
              <li key={index}>{threat}</li>
            ))}
          </ul>
        </div>
      )}

      {data.recommendations && data.recommendations.length > 0 && (
        <div className="recommendations">
          <h3>{t('recommendations')}</h3>
          <ul>
            {data.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {data.extractedText && (
        <div className="extracted-text">
          <h3>Extracted Text:</h3>
          <p>{data.extractedText}</p>
        </div>
      )}
    </div>
  );
}

export default Result;
