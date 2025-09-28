import React, { useState } from 'react';

const initialForm = {
  region: '',
  year: '',
  stage: '',
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
};

const MyForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
  const response = await fetch('http://localhost:5001/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setAlert({ type: 'success', message: result.message });
        setFormData(initialForm);
      } else {
        setAlert({ type: 'error', message: result.message });
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #eee' }}>
      <h2>Submit Production Stage Data</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialForm).map(key => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>
              {key.replace(/_/g, ' ')}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              required={['region','year','stage','grid_gCO2_per_kWh','energy_kWh_per_t','ghg_tCO2e_per_t','water_m3_per_t','residue_kg_per_t','data_quality_score'].includes(key)}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {alert && (
        <div style={{ marginTop: 20, color: alert.type === 'success' ? 'green' : 'red', fontWeight: 500 }}>
          {alert.message}
        </div>
      )}
    </div>
  );
};

export default MyForm;
