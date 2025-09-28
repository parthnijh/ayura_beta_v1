import React, { useState } from 'react';
import { Play, Download, Settings, BarChart3, Target } from 'lucide-react';
import AY1DataProcessor from '../components/AY1DataProcessor';
import AY2ScoringEngine from '../components/AY2ScoringEngine';
import './AYDemo.css';

const AYDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sampleData, setSampleData] = useState({
    region: "India",
    stages: ["Refining", "Smelting_Primary"],
    Refining: {
      energy_kWh_per_t: 4200,
      ghg_tCO2e_per_t: 1.4,
      water_m3_per_t: 12.5,
      renewable_pct: 18
    },
    Smelting_Primary: {
      energy_kWh_per_t: 14500,
      ghg_tCO2e_per_t: 12.8,
      water_m3_per_t: 50,
      renewable_pct: 25
    }
  });
  const [stageVolumes, setStageVolumes] = useState({
    Refining: 150000,
    Smelting_Primary: 300000
  });
  const [processedData, setProcessedData] = useState(null);
  const [showScenarioControls, setShowScenarioControls] = useState(false);
  const [scenarioSettings, setScenarioSettings] = useState({
    gridIntensity: 0.5,
    renewablesBoost: 0
  });

  const steps = [
    { id: 1, title: "Data Input", description: "Upload or enter production data" },
    { id: 2, title: "AY-1 Processing", description: "Data validation & cleaning" },
    { id: 3, title: "AY-2 Scoring", description: "Circularity assessment" },
    { id: 4, title: "AY-3 Recommendations", description: "Improvement suggestions" }
  ];

  const handleDataProcessed = (result) => {
    setProcessedData(result.cleaned);
    setCurrentStep(3);
  };

  const handleScenarioChange = (setting, value) => {
    setScenarioSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const loadSampleData = () => {
    setSampleData({
      region: "India",
      stages: ["Refining", "Smelting_Primary"],
      Refining: {
        energy_kWh_per_t: 4200,
        ghg_tCO2e_per_t: 1.4,
        water_m3_per_t: 12.5,
        renewable_pct: 18
      },
      Smelting_Primary: {
        energy_kWh_per_t: 14500,
        ghg_tCO2e_per_t: 12.8,
        water_m3_per_t: 50,
        renewable_pct: 25
      }
    });
    setStageVolumes({
      Refining: 150000,
      Smelting_Primary: 300000
    });
    setProcessedData(null);
    setCurrentStep(1);
  };

  return (
    <div className="ay-demo">
      <div className="demo-header">
        <div className="header-content">
          <div className="header-left">
            <h1>AY Circularity Assessment System</h1>
            <p>AI-powered data processing, scoring, and recommendations for aluminium sustainability</p>
          </div>
          <div className="header-right">
            <button className="btn btn-secondary" onClick={loadSampleData}>
              <Download size={16} />
              Load Sample Data
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            onClick={() => setCurrentStep(step.id)}
          >
            <div className="step-number">
              {currentStep > step.id ? <Target size={16} /> : step.id}
            </div>
            <div className="step-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Content */}
      <div className="demo-content">
        {/* Step 1: Data Input */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="step-header">
              <h2>Data Input & Configuration</h2>
              <p>Enter your production data or use the sample data to explore the system</p>
            </div>

            <div className="data-input-section">
              <div className="input-card">
                <h3>Production Stages</h3>
                <div className="stages-list">
                  {sampleData.stages.map((stage, index) => (
                    <div key={stage} className="stage-item">
                      <div className="stage-name">{stage.replace('_', ' ')}</div>
                      <div className="stage-volume">
                        <label>Volume (tonnes/year):</label>
                        <input
                          type="number"
                          value={stageVolumes[stage] || ''}
                          onChange={(e) => setStageVolumes(prev => ({
                            ...prev,
                            [stage]: parseInt(e.target.value) || 0
                          }))}
                          placeholder="Enter volume"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-card">
                <h3>Production Metrics</h3>
                <div className="metrics-grid">
                  {sampleData.stages.map(stage => (
                    <div key={stage} className="stage-metrics">
                      <h4>{stage.replace('_', ' ')}</h4>
                      <div className="metrics-form">
                        <div className="form-group">
                          <label>Energy Intensity (kWh/t):</label>
                          <input
                            type="number"
                            value={sampleData[stage]?.energy_kWh_per_t || ''}
                            onChange={(e) => setSampleData(prev => ({
                              ...prev,
                              [stage]: {
                                ...prev[stage],
                                energy_kWh_per_t: parseFloat(e.target.value) || 0
                              }
                            }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>GHG Emissions (tCO₂e/t):</label>
                          <input
                            type="number"
                            step="0.1"
                            value={sampleData[stage]?.ghg_tCO2e_per_t || ''}
                            onChange={(e) => setSampleData(prev => ({
                              ...prev,
                              [stage]: {
                                ...prev[stage],
                                ghg_tCO2e_per_t: parseFloat(e.target.value) || 0
                              }
                            }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>Water Usage (m³/t):</label>
                          <input
                            type="number"
                            step="0.1"
                            value={sampleData[stage]?.water_m3_per_t || ''}
                            onChange={(e) => setSampleData(prev => ({
                              ...prev,
                              [stage]: {
                                ...prev[stage],
                                water_m3_per_t: parseFloat(e.target.value) || 0
                              }
                            }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>Renewable Energy (%):</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={sampleData[stage]?.renewable_pct || ''}
                            onChange={(e) => setSampleData(prev => ({
                              ...prev,
                              [stage]: {
                                ...prev[stage],
                                renewable_pct: parseFloat(e.target.value) || 0
                              }
                            }))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentStep(2)}
              >
                <Play size={16} />
                Process Data
              </button>
            </div>
          </div>
        )}

        {/* Step 2: AY-1 Processing */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-header">
              <h2>AY-1 Data Processing</h2>
              <p>Automated validation, normalization, and quality assessment</p>
            </div>
            <AY1DataProcessor 
              data={sampleData} 
              onProcessed={handleDataProcessed}
            />
          </div>
        )}

        {/* Step 3: AY-2 Scoring */}
        {currentStep === 3 && (
          <div className="step-content">
            <div className="step-header">
              <h2>AY-2 Circularity Scoring</h2>
              <p>AI-powered sustainability assessment and analysis</p>
            </div>
            <AY2ScoringEngine 
              cleanedData={processedData} 
              stageVolumes={stageVolumes}
            />
            
            <div className="scenario-controls">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowScenarioControls(!showScenarioControls)}
              >
                <Settings size={16} />
                Scenario Analysis
              </button>
              
              {showScenarioControls && (
                <div className="scenario-panel">
                  <h4>Scenario Transformations</h4>
                  <div className="scenario-inputs">
                    <div className="form-group">
                      <label>Grid Intensity (gCO₂/kWh):</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={scenarioSettings.gridIntensity}
                        onChange={(e) => handleScenarioChange('gridIntensity', parseFloat(e.target.value))}
                      />
                      <span>{scenarioSettings.gridIntensity}</span>
                    </div>
                    <div className="form-group">
                      <label>Renewables Boost (%):</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={scenarioSettings.renewablesBoost}
                        onChange={(e) => handleScenarioChange('renewablesBoost', parseInt(e.target.value))}
                      />
                      <span>+{scenarioSettings.renewablesBoost}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Recommendations */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="step-header">
              <h2>AY-3 Recommendations</h2>
              <p>Actionable insights for improving circularity performance</p>
            </div>
            <div className="recommendations-summary">
              <div className="summary-card">
                <BarChart3 size={48} color="var(--primary-color)" />
                <h3>Ready for Implementation</h3>
                <p>Your circularity assessment is complete. Review the recommendations above to identify the most impactful improvements for your operations.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AYDemo;
