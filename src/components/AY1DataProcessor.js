import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { ay1Clean } from '../utils/ay1DataProcessor';
import './AY1DataProcessor.css';

const AY1DataProcessor = ({ data, onProcessed }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [processingResult, setProcessingResult] = useState(null);

  const processData = () => {
    const result = ay1Clean(data);
    setProcessingResult(result);
    if (onProcessed) {
      onProcessed(result);
    }
  };

  const getQualityColor = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'fair';
    return 'poor';
  };

  const getLogIcon = (logEntry) => {
    if (logEntry.includes('missing → imputed')) return <Info size={14} />;
    if (logEntry.includes('clipped') || logEntry.includes('negative')) return <AlertTriangle size={14} />;
    return <CheckCircle size={14} />;
  };

  return (
    <div className="ay1-processor">
      <div className="processor-header">
        <div className="header-left">
          <h3>AY-1 Data Processing Engine</h3>
          <p>Automated validation, normalization, and quality assessment</p>
        </div>
        <div className="header-right">
          <button 
            className="btn btn-primary"
            onClick={processData}
            disabled={!data || !data.stages || data.stages.length === 0}
          >
            Process Data
          </button>
        </div>
      </div>

      {processingResult && (
        <div className="processing-results">
          {/* Data Quality Score */}
          <div className="quality-score-section">
            <div className="score-header">
              <h4>Data Quality Assessment</h4>
              <div className={`quality-badge ${getQualityColor(processingResult.ay1.dq)}`}>
                {processingResult.ay1.dq}/100
              </div>
            </div>
            <div className="quality-bar">
              <div 
                className={`quality-fill ${getQualityColor(processingResult.ay1.dq)}`}
                style={{ width: `${processingResult.ay1.dq}%` }}
              ></div>
            </div>
            <p className="quality-description">
              {processingResult.ay1.dq >= 90 && "Excellent data quality with minimal issues"}
              {processingResult.ay1.dq >= 80 && processingResult.ay1.dq < 90 && "Good data quality with minor corrections needed"}
              {processingResult.ay1.dq >= 70 && processingResult.ay1.dq < 80 && "Fair data quality with several corrections applied"}
              {processingResult.ay1.dq < 70 && "Poor data quality requiring significant corrections"}
            </p>
          </div>

          {/* Processing Log */}
          <div className="log-section">
            <div className="log-header" onClick={() => setIsExpanded(!isExpanded)}>
              <h4>Processing Log</h4>
              <span className="log-count">{processingResult.ay1.log.length} operations</span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {isExpanded && (
              <div className="log-entries">
                {processingResult.ay1.log.map((entry, index) => (
                  <div key={index} className="log-entry">
                    <div className="log-icon">
                      {getLogIcon(entry)}
                    </div>
                    <span className="log-text">{entry}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Processed Data Summary */}
          <div className="data-summary">
            <h4>Processed Data Summary</h4>
            <div className="summary-grid">
              {processingResult.cleaned && Object.entries(processingResult.cleaned).map(([stage, metrics]) => (
                <div key={stage} className="stage-summary">
                  <h5>{stage.replace('_', ' ')}</h5>
                  <div className="metrics-list">
                    <div className="metric">
                      <span className="metric-label">Energy:</span>
                      <span className="metric-value">{metrics.energy_kWh_per_t?.toFixed(0)} kWh/t</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">GHG:</span>
                      <span className="metric-value">{metrics.ghg_tCO2e_per_t?.toFixed(1)} tCO₂e/t</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Water:</span>
                      <span className="metric-value">{metrics.water_m3_per_t?.toFixed(1)} m³/t</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Renewables:</span>
                      <span className="metric-value">{metrics.renewable_pct?.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AY1DataProcessor;
