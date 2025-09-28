import React, { useState } from 'react';
import { Save, Upload, CheckCircle, AlertCircle, Calculator, BarChart3, Target, Info } from 'lucide-react';
import AY1DataProcessor from '../components/AY1DataProcessor';
import AY2ScoringEngine from '../components/AY2ScoringEngine';
import './DataInput.css';

const DataInput = () => {
  const [currentStage, setCurrentStage] = useState('mining');
  const [formData, setFormData] = useState({
    mining: {
      region: 'India',
      year: new Date().getFullYear().toString(),
      stage: 'Mining',
      grid_gCO2_per_kWh: '',
      energy_kWh_per_t: '',
      ghg_tCO2e_per_t: '',
      water_m3_per_t: '',
      residue_kg_per_t: '',
      renewable_pct: '',
      scrap_input_pct: '',
      eol_collection_pct: '',
      recycled_content_pct: '',
      recyclable_design_pct: '',
      data_quality_score: '',
      source_hint: ''
    },
    refining: {
      region: 'India',
      year: new Date().getFullYear().toString(),
      stage: 'Refining',
      grid_gCO2_per_kWh: '',
      energy_kWh_per_t: '',
      ghg_tCO2e_per_t: '',
      water_m3_per_t: '',
      residue_kg_per_t: '',
      renewable_pct: '',
      scrap_input_pct: '',
      eol_collection_pct: '',
      recycled_content_pct: '',
      recyclable_design_pct: '',
      data_quality_score: '',
      source_hint: ''
    },
    smelting: {
      region: 'India',
      year: new Date().getFullYear().toString(),
      stage: 'Smelting_Primary',
      grid_gCO2_per_kWh: '',
      energy_kWh_per_t: '',
      ghg_tCO2e_per_t: '',
      water_m3_per_t: '',
      residue_kg_per_t: '',
      renewable_pct: '',
      scrap_input_pct: '',
      eol_collection_pct: '',
      recycled_content_pct: '',
      recyclable_design_pct: '',
      data_quality_score: '',
      source_hint: ''
    },
    casting: {
      region: 'India',
      year: new Date().getFullYear().toString(),
      stage: 'Casting',
      grid_gCO2_per_kWh: '',
      energy_kWh_per_t: '',
      ghg_tCO2e_per_t: '',
      water_m3_per_t: '',
      residue_kg_per_t: '',
      renewable_pct: '',
      scrap_input_pct: '',
      eol_collection_pct: '',
      recycled_content_pct: '',
      recyclable_design_pct: '',
      data_quality_score: '',
      source_hint: ''
    },
    fabrication: {
      region: 'India',
      year: new Date().getFullYear().toString(),
      stage: 'Fabrication',
      grid_gCO2_per_kWh: '',
      energy_kWh_per_t: '',
      ghg_tCO2e_per_t: '',
      water_m3_per_t: '',
      residue_kg_per_t: '',
      renewable_pct: '',
      scrap_input_pct: '',
      eol_collection_pct: '',
      recycled_content_pct: '',
      recyclable_design_pct: '',
      data_quality_score: '',
      source_hint: ''
    },
    recycling: {
      region: 'India',
      year: new Date().getFullYear().toString(),
      stage: 'Recycling',
      grid_gCO2_per_kWh: '',
      energy_kWh_per_t: '',
      ghg_tCO2e_per_t: '',
      water_m3_per_t: '',
      residue_kg_per_t: '',
      renewable_pct: '',
      scrap_input_pct: '',
      eol_collection_pct: '',
      recycled_content_pct: '',
      recyclable_design_pct: '',
      data_quality_score: '',
      source_hint: ''
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

  // Dropdown options for categorical fields
  const dropdownOptions = {
    region: [
      'India', 'China', 'Russia', 'Canada', 'UAE', 'Australia', 'Norway', 
      'Bahrain', 'United States', 'Iceland', 'South Africa', 'Brazil', 'Other'
    ],
    year: Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString()),
    data_quality_score: [
      { value: '5', label: '5 - Excellent (Verified, detailed data)' },
      { value: '4', label: '4 - Good (Reliable with minor gaps)' },
      { value: '3', label: '3 - Average (Some uncertainty)' },
      { value: '2', label: '2 - Poor (Estimated with high uncertainty)' },
      { value: '1', label: '1 - Very Poor (Rough estimates only)' }
    ],
    source_hint: [
      'Company_Report', 'Industry_Database', 'Government_Data', 
      'Academic_Study', 'Supplier_Information', 'Estimated', 'Other'
    ]
  };

  const fields = [
    {
      id: 'region',
      label: 'Region',
      type: 'dropdown',
      options: dropdownOptions.region,
      required: true,
      description: 'Geographic region where the production stage operates'
    },
    {
      id: 'year',
      label: 'Year',
      type: 'dropdown',
      options: dropdownOptions.year,
      required: true,
      description: 'Reporting year for the data'
    },
    {
      id: 'grid_gCO2_per_kWh',
      label: 'Grid CO₂ Intensity',
      unit: 'g CO₂/kWh',
      type: 'number',
      required: true,
      description: 'Carbon intensity of the electricity grid in the region'
    },
    {
      id: 'energy_kWh_per_t',
      label: 'Energy Consumption',
      unit: 'kWh/tonne',
      type: 'number',
      required: true,
      description: 'Total energy consumed per tonne of product'
    },
    {
      id: 'ghg_tCO2e_per_t',
      label: 'GHG Emissions',
      unit: 'tCO₂e/tonne',
      type: 'number',
      required: true,
      description: 'Total greenhouse gas emissions per tonne of product'
    },
    {
      id: 'water_m3_per_t',
      label: 'Water Usage',
      unit: 'm³/tonne',
      type: 'number',
      required: true,
      description: 'Water consumption per tonne of product'
    },
    {
      id: 'residue_kg_per_t',
      label: 'Residue Generated',
      unit: 'kg/tonne',
      type: 'number',
      required: true,
      description: 'Solid waste and residues generated per tonne of product'
    },
    {
      id: 'renewable_pct',
      label: 'Renewable Energy',
      unit: '%',
      type: 'number',
      required: false,
      description: 'Percentage of energy from renewable sources'
    },
    {
      id: 'scrap_input_pct',
      label: 'Scrap Input',
      unit: '%',
      type: 'number',
      required: false,
      description: 'Percentage of recycled/scrap material in input'
    },
    {
      id: 'eol_collection_pct',
      label: 'End-of-Life Collection',
      unit: '%',
      type: 'number',
      required: false,
      description: 'Collection rate of products at end of life for recycling'
    },
    {
      id: 'recycled_content_pct',
      label: 'Recycled Content',
      unit: '%',
      type: 'number',
      required: false,
      description: 'Percentage of recycled content in the final product'
    },
    {
      id: 'recyclable_design_pct',
      label: 'Recyclable Design',
      unit: '%',
      type: 'number',
      required: false,
      description: 'Percentage of product designed for recyclability'
    },
    {
      id: 'data_quality_score',
      label: 'Data Quality Score',
      type: 'dropdown',
      options: dropdownOptions.data_quality_score,
      required: true,
      description: 'Assessment of data reliability and completeness (1-5 scale)'
    },
    {
      id: 'source_hint',
      label: 'Data Source',
      type: 'dropdown',
      options: dropdownOptions.source_hint,
      required: false,
      description: 'Primary source of the reported data'
    }
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
      } else if (field.type === 'number' && currentData[field.id] && isNaN(parseFloat(currentData[field.id]))) {
        errors[field.id] = `${field.label} must be a valid number`;
      } else if (field.type === 'number' && currentData[field.id] && parseFloat(currentData[field.id]) < 0) {
        errors[field.id] = `${field.label} cannot be negative`;
      } else if (field.unit === '%' && currentData[field.id] && parseFloat(currentData[field.id]) > 100) {
        errors[field.id] = `${field.label} cannot exceed 100%`;
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
      const response = await fetch('http://localhost:5001/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData[currentStage])
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        console.log('Form submitted to backend:', formData[currentStage]);
      } else {
        setSubmitStatus('error');
        console.error('Backend error:', result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEstimatedScore = () => {
    const data = formData[currentStage];
    if (!data.energy_kWh_per_t || !data.ghg_tCO2e_per_t) {
      return null;
    }

    // Enhanced scoring algorithm based on new parameters
    const energyScore = Math.max(0, 100 - (parseFloat(data.energy_kWh_per_t) / 50));
    const ghgScore = Math.max(0, 100 - (parseFloat(data.ghg_tCO2e_per_t) * 20));
    const waterScore = Math.max(0, 100 - (parseFloat(data.water_m3_per_t) * 10));
    const residueScore = Math.max(0, 100 - (parseFloat(data.residue_kg_per_t) / 10));
    const renewableScore = parseFloat(data.renewable_pct) || 0;
    const scrapScore = parseFloat(data.scrap_input_pct) || 0;
    const recycledContentScore = parseFloat(data.recycled_content_pct) || 0;
    const recyclableDesignScore = parseFloat(data.recyclable_design_pct) || 0;

    const totalScore = (
      energyScore * 0.2 + 
      ghgScore * 0.25 + 
      waterScore * 0.15 + 
      residueScore * 0.1 + 
      renewableScore * 0.1 + 
      scrapScore * 0.1 + 
      recycledContentScore * 0.05 + 
      recyclableDesignScore * 0.05
    );
    return Math.round(totalScore);
  };

  const estimatedScore = calculateEstimatedScore();

  // Convert form data to AY system format
  const convertToAYFormat = () => {
    const selectedStages = [];
    const ayData = { region: formData[currentStage].region, stages: selectedStages };
    const volumes = {};

    stages.forEach(stage => {
      const data = formData[stage.id];
      if (data.energy_kWh_per_t && data.ghg_tCO2e_per_t) {
        const stageName = data.stage;
        
        selectedStages.push(stageName);
        volumes[stageName] = 1000; // Default volume, should be actual production volume
        
        ayData[stageName] = {
          energy_kWh_per_t: parseFloat(data.energy_kWh_per_t) || 0,
          ghg_tCO2e_per_t: parseFloat(data.ghg_tCO2e_per_t) || 0,
          water_m3_per_t: parseFloat(data.water_m3_per_t) || 0,
          renewable_pct: parseFloat(data.renewable_pct) || 0,
          scrap_input_pct: parseFloat(data.scrap_input_pct) || 0,
          recycled_content_pct: parseFloat(data.recycled_content_pct) || 0
        };
      }
    });

    return { ayData, volumes };
  };

  const handleAYProcessing = (result) => {
    setProcessedData(result.cleaned);
  };

  const renderField = (field) => {
    const currentData = formData[currentStage];
    
    if (field.type === 'dropdown') {
      return (
        <div key={field.id} className="form-group">
          <label htmlFor={field.id} className="form-label">
            {field.label}
            {field.required && <span className="required">*</span>}
            <Info size={14} className="info-icon" title={field.description} />
          </label>
          <select
            id={field.id}
            value={currentData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`form-select ${validationErrors[field.id] ? 'error' : ''}`}
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option 
                key={typeof option === 'string' ? option : option.value} 
                value={typeof option === 'string' ? option : option.value}
              >
                {typeof option === 'string' ? option : option.label}
              </option>
            ))}
          </select>
          <div className="field-description">{field.description}</div>
          {validationErrors[field.id] && (
            <span className="error-message">{validationErrors[field.id]}</span>
          )}
        </div>
      );
    }

    return (
      <div key={field.id} className="form-group">
        <label htmlFor={field.id} className="form-label">
          {field.label}
          {field.required && <span className="required">*</span>}
          <Info size={14} className="info-icon" title={field.description} />
        </label>
        <div className="input-container">
          <input
            type="number"
            id={field.id}
            value={currentData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`form-input ${validationErrors[field.id] ? 'error' : ''}`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            step="0.01"
            min="0"
            max={field.unit === '%' ? '100' : undefined}
          />
          {field.unit && <span className="input-unit">{field.unit}</span>}
        </div>
        <div className="field-description">{field.description}</div>
        {validationErrors[field.id] && (
          <span className="error-message">{validationErrors[field.id]}</span>
        )}
      </div>
    );
  };

  return (
    <div className="data-input-page">
      <div className="data-input-header">
        <h1>Circular Economy Data Input Portal</h1>
        <p>Submit comprehensive environmental and circularity data for your production stages</p>
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
                <div className="stage-description">{stage.description}</div>
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
              {fields.map(field => renderField(field))}
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
                <div className="score-breakdown">
                  <p>This preliminary score considers energy efficiency, GHG emissions, resource usage, and circularity indicators.</p>
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
              const isCompleted = formData[stage.id].energy_kWh_per_t && formData[stage.id].ghg_tCO2e_per_t;
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