import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Target, Award, Lightbulb } from 'lucide-react';
import { ay2Score, generateRecommendations } from '../utils/ay2ScoringEngine';
import './AY2ScoringEngine.css';

const AY2ScoringEngine = ({ cleanedData, stageVolumes = null }) => {
  const [scoringResult, setScoringResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    if (cleanedData) {
      const result = ay2Score(cleanedData, stageVolumes);
      setScoringResult(result);
      
      const recs = generateRecommendations(cleanedData, result.overall, stageVolumes);
      setRecommendations(recs);
    }
  }, [cleanedData, stageVolumes]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 60) return 'fair';
    if (score >= 50) return 'poor';
    return 'critical';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 50) return 'Poor';
    return 'Critical';
  };

  if (!scoringResult) {
    return (
      <div className="ay2-scoring">
        <div className="scoring-placeholder">
          <BarChart3 size={48} color="var(--gray-400)" />
          <h3>AY-2 Scoring Engine</h3>
          <p>Process data through AY-1 to generate circularity scores</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ay2-scoring">
      <div className="scoring-header">
        <div className="header-left">
          <h3>AY-2 Circularity Scoring Engine</h3>
          <p>AI-powered sustainability assessment across all production stages</p>
        </div>
        <div className="header-right">
          <div className="ml-note">
            <Lightbulb size={16} />
            <span>Future: XGBoost + SHAP, Autoencoder anomaly detection</span>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="overall-score-section">
        <div className="score-display">
          <div className="score-circle">
            <div className={`score-value ${getScoreColor(scoringResult.overall)}`}>
              {scoringResult.overall}
            </div>
            <div className="score-label">Overall Score</div>
          </div>
          <div className="score-details">
            <h4>{getScoreLabel(scoringResult.overall)} Performance</h4>
            <p>Based on emissions, energy efficiency, water usage, and renewable energy adoption across all production stages.</p>
            <div className="score-breakdown">
              <div className="breakdown-item">
                <span className="breakdown-label">Emissions</span>
                <div className="breakdown-bar">
                  <div className="breakdown-fill emissions"></div>
                </div>
                <span className="breakdown-value">40%</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Energy</span>
                <div className="breakdown-bar">
                  <div className="breakdown-fill energy"></div>
                </div>
                <span className="breakdown-value">40%</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Water</span>
                <div className="breakdown-bar">
                  <div className="breakdown-fill water"></div>
                </div>
                <span className="breakdown-value">10%</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Renewables</span>
                <div className="breakdown-bar">
                  <div className="breakdown-fill renewables"></div>
                </div>
                <span className="breakdown-value">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Details */}
      <div className="stage-details-section">
        <h4>Stage-by-Stage Analysis</h4>
        <div className="stages-grid">
          {Object.entries(scoringResult.detail).map(([stage, details]) => (
            <div key={stage} className="stage-card">
              <div className="stage-header">
                <h5>{stage.replace('_', ' ')}</h5>
                <div className={`stage-score ${getScoreColor(details.score)}`}>
                  {details.score}
                </div>
              </div>
              <div className="stage-weight">
                Weight: {(details.weight * 100).toFixed(1)}%
              </div>
              <div className="stage-breakdown">
                <div className="breakdown-grid">
                  <div className="breakdown-metric">
                    <span className="metric-label">Energy</span>
                    <span className="metric-value">{details.breakdown.E}</span>
                  </div>
                  <div className="breakdown-metric">
                    <span className="metric-label">GHG</span>
                    <span className="metric-value">{details.breakdown.G}</span>
                  </div>
                  <div className="breakdown-metric">
                    <span className="metric-label">Water</span>
                    <span className="metric-value">{details.breakdown.W}</span>
                  </div>
                  <div className="breakdown-metric">
                    <span className="metric-label">Renewables</span>
                    <span className="metric-value">{details.breakdown.R}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <div className="recommendations-header">
          <h4>AY-3 Improvement Recommendations</h4>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowRecommendations(!showRecommendations)}
          >
            {showRecommendations ? 'Hide' : 'Show'} Recommendations
          </button>
        </div>
        
        {showRecommendations && recommendations && (
          <div className="recommendations-grid">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-header">
                  <div className="recommendation-rank">#{index + 1}</div>
                  <div className="recommendation-impact">
                    <TrendingUp size={16} />
                    <span>+{rec.delta} points</span>
                  </div>
                </div>
                <h5>{rec.action}</h5>
                <div className="recommendation-score">
                  <span className="current-score">{scoringResult.overall}</span>
                  <span className="arrow">→</span>
                  <span className="new-score">{rec.new_score}</span>
                </div>
                <div className="recommendation-description">
                  This intervention would improve your overall circularity score by {rec.delta} points.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AY2ScoringEngine;
