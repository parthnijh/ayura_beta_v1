// AY-1 Data Processing Engine
// Validates, normalizes, clips outliers, and imputes missing values

const BENCH = {
  "Smelting_Primary": {
    "energy_kWh_per_t": [13000, 16000], 
    "ghg_tCO2e_per_t": [8.0, 16.0], 
    "water_m3_per_t": [30, 70]
  },
  "Refining": {
    "energy_kWh_per_t": [3000, 5000], 
    "ghg_tCO2e_per_t": [0.8, 1.8], 
    "water_m3_per_t": [6, 16]
  },
  "Recycling": {
    "energy_kWh_per_t": [500, 1500], 
    "ghg_tCO2e_per_t": [0.3, 0.8], 
    "water_m3_per_t": [2, 6]
  },
  "Casting": {
    "energy_kWh_per_t": [2000, 4000], 
    "ghg_tCO2e_per_t": [0.5, 1.2], 
    "water_m3_per_t": [4, 12]
  },
  "Fabrication": {
    "energy_kWh_per_t": [1500, 3000], 
    "ghg_tCO2e_per_t": [0.3, 0.8], 
    "water_m3_per_t": [3, 8]
  },
  "Mining": {
    "energy_kWh_per_t": [1000, 2500], 
    "ghg_tCO2e_per_t": [0.2, 0.6], 
    "water_m3_per_t": [2, 6]
  }
};

export const ay1Clean = (payload) => {
  const log = [];
  let dqPoints = 100;
  
  // 1) Schema check
  if (!payload.stages || !Array.isArray(payload.stages) || payload.stages.length === 0) {
    return {
      cleaned: null,
      ay1: { dq: 0, log: ["No stages selected."] }
    };
  }

  // 2) Iterate stages, normalize + clip + impute
  const cleaned = {};
  
  for (const stage of payload.stages) {
    const stageData = payload[stage] || {};
    cleaned[stage] = {};
    
    const stageBench = BENCH[stage];
    if (!stageBench) {
      log.push(`${stage}: No benchmarks available, skipping validation`);
      continue;
    }
    
    for (const [metric, [lo, hi]] of Object.entries(stageBench)) {
      let value = stageData[metric];
      
      if (value === null || value === undefined || value === '') {
        // Simple impute = midpoint; mark in log and reduce DQ
        value = (lo + hi) / 2.0;
        dqPoints -= 5;
        log.push(`${stage}.${metric}: missing → imputed ${value.toFixed(2)}`);
      } else {
        value = parseFloat(value);
      }
      
      // Clip to plausible bounds
      if (value < 0) {
        log.push(`${stage}.${metric}: negative → set to ${lo}`);
        value = lo;
        dqPoints -= 5;
      }
      if (value < lo) {
        log.push(`${stage}.${metric}: below plausible → clipped to ${lo}`);
        value = lo;
        dqPoints -= 2;
      }
      if (value > hi) {
        log.push(`${stage}.${metric}: above plausible → clipped to ${hi}`);
        value = hi;
        dqPoints -= 2;
      }
      
      cleaned[stage][metric] = value;
    }

    // Optional: renewables %
    let renewablePct = stageData.renewable_pct;
    if (renewablePct === null || renewablePct === undefined || renewablePct === '') {
      renewablePct = 20.0;
      dqPoints -= 2;
      log.push(`${stage}.renewable_pct: missing → imputed 20%`);
    } else {
      renewablePct = parseFloat(renewablePct);
    }
    renewablePct = Math.max(0.0, Math.min(95.0, renewablePct));
    cleaned[stage].renewable_pct = renewablePct;
  }

  dqPoints = Math.max(0, Math.min(100, dqPoints));
  
  return {
    cleaned,
    ay1: { dq: dqPoints, log }
  };
};

// Scenario transforms for grid gCO₂/kWh and renewables %
export const applyScenarioTransforms = (cleaned, gridIntensity = 0.5, renewablesBoost = 0) => {
  const transformed = JSON.parse(JSON.stringify(cleaned)); // Deep copy
  
  for (const stage in transformed) {
    // Adjust renewable percentage
    transformed[stage].renewable_pct = Math.min(95, 
      transformed[stage].renewable_pct + renewablesBoost
    );
    
    // Adjust GHG based on grid intensity (simplified model)
    const currentRenewable = transformed[stage].renewable_pct / 100;
    const gridFactor = 1 - (currentRenewable * (1 - gridIntensity));
    transformed[stage].ghg_tCO2e_per_t *= gridFactor;
  }
  
  return transformed;
};
