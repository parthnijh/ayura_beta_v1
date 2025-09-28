import React, { useState } from 'react';
import { Save, Upload, CheckCircle, AlertCircle, Calculator, BarChart3 } from 'lucide-react';
import AY1DataProcessor from '../components/AY1DataProcessor';
import AY2ScoringEngine from '../components/AY2ScoringEngine';
import './DataInput.css';

const DataInput = () => {
  const [currentStage, setCurrentStage] = useState('mining');
  const [formData, setFormData] = useState({
    mining: {
      production: '',
      carbonIntensity: '',
      energyConsumption: '',
      waterUsage: '',
      wasteGenerated: '',
      recycledInput: ''
    },
    refining: {
      production: '',
      carbonIntensity: '',
      energyConsumption: '',
      waterUsage: '',
      wasteGenerated: '',
      recycledInput: ''
    },
    smelting: {
      production: '',
      carbonIntensity: '',
      energyConsumption: '',
      waterUsage: '',
      wasteGenerated: '',
      recycledInput: ''
    },
    casting: {
      production: '',
      carbonIntensity: '',
      energyConsumption: '',
      waterUsage: '',
      wasteGenerated: '',
      recycledInput: ''
    },
    fabrication: {
      production: '',
      carbonIntensity: '',
      energyConsumption: '',
      waterUsage: '',
      wasteGenerated: '',
      recycledInput: ''
    },
    recycling: {
      production: '',
      carbonIntensity: '',
      energyConsumption: '',
      waterUsage: '',
      wasteGenerated: '',
      recycledInput: ''
    }
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showAYSystem, setShowAYSystem] = useState(false);
  const [processedData, setProcessedData] = useState(null);

  const stages = [
    { id: 'mining', name: 'Mining', icon: '⛏️', description: 'Bauxite extraction and processing' },
    { id: 'refining', name: 'Refining', icon: '🏭', description: 'Alumina production from bauxite' },
    { id: 'smelting', name: 'Smelting', icon: '🔥', description: 'Primary aluminium production' },
    { id: 'casting', name: 'Casting', icon: '🏗️', description: 'Aluminium ingot and billet production' },
    { id: 'fabrication', name: 'Fabrication', icon: '⚙️', description: 'Product manufacturing and shaping' },
    { id: 'recycling', name: 'Recycling', icon: '♻️', description: 'Scrap processing and reuse' }
  ];

  const fields = [
    { id: 'production', label: 'Production (tonnes)', unit: 'tonnes', required: true },
    { id: 'carbonIntensity', label: 'Carbon Intensity', unit: 'kg CO₂/tonne', required: true },
    { id: 'energyConsumption', label: 'Energy Consumption', unit: 'kWh/tonne', required: true },
    { id: 'waterUsage', label: 'Water Usage', unit: 'litres/tonne', required: true },
    { id: 'wasteGenerated', label: 'Waste Generated', unit: 'kg/tonne', required: true },
    { id: 'recycledInput', label: 'Recycled Input', unit: '%', required: false }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [currentStage]: {
        ...prev[currentStage],
        [field]: value
      }
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const currentData = formData[currentStage];

    fields.forEach(field => {
      if (field.required && (!currentData[field.id] || currentData[field.id] === '')) {
        errors[field.id] = `${field.label} is required`;
      } else if (currentData[field.id] && isNaN(parseFloat(currentData[field.id]))) {
        errors[field.id] = `${field.label} must be a valid number`;
      } else if (currentData[field.id] && parseFloat(currentData[field.id]) < 0) {
        errors[field.id] = `${field.label} cannot be negative`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      console.log('Form submitted:', formData[currentStage]);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEstimatedScore = () => {
    const data = formData[currentStage];
    if (!data.production || !data.carbonIntensity || !data.energyConsumption) {
      return null;
    }

    // Simple scoring algorithm (in real app, this would be more complex)
    const carbonScore = Math.max(0, 100 - (parseFloat(data.carbonIntensity) * 10));
    const energyScore = Math.max(0, 100 - (parseFloat(data.energyConsumption) / 10));
    const waterScore = Math.max(0, 100 - (parseFloat(data.waterUsage) / 20));
    const wasteScore = Math.max(0, 100 - (parseFloat(data.wasteGenerated) * 5));
    const recyclingScore = parseFloat(data.recycledInput) || 0;

    const totalScore = (carbonScore * 0.3 + energyScore * 0.25 + waterScore * 0.2 + wasteScore * 0.15 + recyclingScore * 0.1);
    return Math.round(totalScore);
  };

  const estimatedScore = calculateEstimatedScore();

  // Convert form data to AY system format
  const convertToAYFormat = () => {
    const selectedStages = [];
    const ayData = { region: "India", stages: selectedStages };
    const volumes = {};

    stages.forEach(stage => {
      const data = formData[stage.id];
      if (data.production && data.carbonIntensity && data.energyConsumption) {
        const stageName = stage.id === 'smelting' ? 'Smelting_Primary' : 
                         stage.id.charAt(0).toUpperCase() + stage.id.slice(1);
        
        selectedStages.push(stageName);
        volumes[stageName] = parseFloat(data.production) || 0;
        
        ayData[stageName] = {
          energy_kWh_per_t: parseFloat(data.energyConsumption) || 0,
          ghg_tCO2e_per_t: parseFloat(data.carbonIntensity) / 1000 || 0, // Convert kg to tonnes
          water_m3_per_t: (parseFloat(data.waterUsage) || 0) / 1000, // Convert litres to m³
          renewable_pct: parseFloat(data.recycledInput) || 0
        };
      }
    });

    return { ayData, volumes };
  };

  const handleAYProcessing = (result) => {
    setProcessedData(result.cleaned);
  };

  return (
    <div className="data-input-page">
      <div className="data-input-header">
        <h1>Data Input Portal</h1>
        <p>Submit your monthly production and environmental data</p>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAYSystem(!showAYSystem)}
          >
            <BarChart3 size={16} />
            {showAYSystem ? 'Hide' : 'Show'} AI Analysis
          </button>
        </div>
      </div>

      <div className="data-input-container">
        {/* Stage Navigation */}
        <div className="stage-navigation">
          <h2>Select Production Stage</h2>
          <div className="stages-grid">
            {stages.map(stage => (
              <button
                key={stage.id}
                className={`stage-button ${currentStage === stage.id ? 'active' : ''}`}
                onClick={() => setCurrentStage(stage.id)}
              >
                {stage.icon}
                <span>{stage.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>{stages.find(s => s.id === currentStage)?.name} Data</h2>
            <div className="form-actions">
              <button className="save-draft-btn">
                <Save size={16} />
                Save Draft
              </button>
              <button className="upload-file-btn">
                <Upload size={16} />
                Upload File
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="data-form">
            <div className="form-grid">
              {fields.map(field => (
                <div key={field.id} className="form-group">
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  <div className="input-container">
                    <input
                      type="number"
                      id={field.id}
                      value={formData[currentStage][field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className={`form-input ${validationErrors[field.id] ? 'error' : ''}`}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      step="0.01"
                      min="0"
                    />
                    <span className="input-unit">{field.unit}</span>
                  </div>
                  {validationErrors[field.id] && (
                    <span className="error-message">{validationErrors[field.id]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Estimated Score */}
            {estimatedScore !== null && (
              <div className="estimated-score">
                <div className="score-header">
                  <Calculator className="score-icon" />
                  <h3>Estimated Circularity Score</h3>
                </div>
                <div className="score-display">
                  <span className="score-value">{estimatedScore}%</span>
                  <span className="score-label">Based on current inputs</span>
                </div>
              </div>
            )}

            {/* Submit Section */}
            <div className="submit-section">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Submit Data
                  </>
                )}
              </button>

              {submitStatus && (
                <div className={`submit-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={16} />
                      Data submitted successfully!
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} />
                      Error submitting data. Please try again.
                    </>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Progress Summary */}
        <div className="progress-summary">
          <h3>Submission Progress</h3>
          <div className="progress-stages">
            {stages.map((stage, index) => {
              const isCompleted = formData[stage.id].production && formData[stage.id].carbonIntensity;
              const isCurrent = currentStage === stage.id;
              
              return (
                <div key={stage.id} className={`progress-stage ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="stage-indicator">
                    {isCompleted ? <CheckCircle size={16} /> : index + 1}
                  </div>
                  <span className="stage-name">{stage.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AY System Integration */}
      {showAYSystem && (
        <div className="ay-system-section">
          <div className="ay-system-header">
            <h2>AI-Powered Circularity Assessment</h2>
            <p>Advanced data processing and scoring using the AY system</p>
          </div>
          
          <div className="ay-system-content">
            {(() => {
              const { ayData, volumes } = convertToAYFormat();
              return (
                <>
                  <AY1DataProcessor 
                    data={ayData} 
                    onProcessed={handleAYProcessing}
                  />
                  {processedData && (
                    <AY2ScoringEngine 
                      cleanedData={processedData} 
                      stageVolumes={volumes}
                    />
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInput;


