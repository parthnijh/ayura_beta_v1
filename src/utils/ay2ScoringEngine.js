// AY-2 Scoring Engine
// Maps stages to three pillars (Emissions, Energy, Water) plus Renewables bonus

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

// Normalization for "lower is better" metrics
const normLowIsBetter = (x, lo, hi) => {
  if (hi === lo) return 0.0;
  return Math.max(0.0, Math.min(1.0, (hi - x) / (hi - lo)));
};

// Calculate stage score (0-100)
export const stageScore = (stageName, metrics) => {
  const bench = BENCH[stageName];
  if (!bench) {
    return { score: 0, breakdown: { E: 0, G: 0, W: 0, R: 0 } };
  }

  const energyScore = normLowIsBetter(metrics.energy_kWh_per_t, ...bench.energy_kWh_per_t);
  const ghgScore = normLowIsBetter(metrics.ghg_tCO2e_per_t, ...bench.ghg_tCO2e_per_t);
  const waterScore = normLowIsBetter(metrics.water_m3_per_t, ...bench.water_m3_per_t);
  const renewableScore = Math.min(1.0, metrics.renewable_pct / 95.0);

  // Weighted score: Emissions 40%, Energy 40%, Water 10%, Renewables 10%
  const score01 = 0.40 * ghgScore + 0.40 * energyScore + 0.10 * waterScore + 0.10 * renewableScore;
  
  return {
    score: Math.round(100 * score01 * 10) / 10, // Round to 1 decimal
    breakdown: {
      E: Math.round(100 * energyScore * 10) / 10,
      G: Math.round(100 * ghgScore * 10) / 10,
      W: Math.round(100 * waterScore * 10) / 10,
      R: Math.round(100 * renewableScore * 10) / 10
    }
  };
};

// Company aggregation (multi-process)
export const ay2Score = (cleaned, stageVolumes = null) => {
  const stages = Object.keys(cleaned);
  const totalVol = stageVolumes ? 
    Object.values(stageVolumes).reduce((sum, vol) => sum + vol, 0) : 
    stages.length;

  const parts = [];
  const detail = {};

  for (const [stage, metrics] of Object.entries(cleaned)) {
    const { score, breakdown } = stageScore(stage, metrics);
    const weight = stageVolumes ? 
      (stageVolumes[stage] / totalVol) : 
      (1 / stages.length);

    parts.push(weight * score);
    detail[stage] = {
      score,
      weight: Math.round(weight * 1000) / 1000, // Round to 3 decimals
      breakdown
    };
  }

  const overall = Math.round(parts.reduce((sum, part) => sum + part, 0) * 10) / 10;
  
  return { overall, detail };
};

// Generate recommendations based on interventions
export const generateRecommendations = (cleaned, baselineScore, stageVolumes = null) => {
  const interventions = [
    {
      name: "Increase renewable electricity share by 20%",
      apply: (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const stage in newData) {
          newData[stage].renewable_pct = Math.min(95, newData[stage].renewable_pct + 20);
        }
        return newData;
      }
    },
    {
      name: "Improve energy efficiency by 10%",
      apply: (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const stage in newData) {
          newData[stage].energy_kWh_per_t *= 0.9;
        }
        return newData;
      }
    },
    {
      name: "Reduce water usage by 15%",
      apply: (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const stage in newData) {
          newData[stage].water_m3_per_t *= 0.85;
        }
        return newData;
      }
    },
    {
      name: "Cut GHG emissions by 12%",
      apply: (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const stage in newData) {
          newData[stage].ghg_tCO2e_per_t *= 0.88;
        }
        return newData;
      }
    },
    {
      name: "Implement circular economy practices (+25% efficiency)",
      apply: (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const stage in newData) {
          newData[stage].energy_kWh_per_t *= 0.85;
          newData[stage].water_m3_per_t *= 0.8;
          newData[stage].ghg_tCO2e_per_t *= 0.9;
        }
        return newData;
      }
    }
  ];

  const results = interventions.map(intervention => {
    const newData = intervention.apply(cleaned);
    const { overall: newScore } = ay2Score(newData, stageVolumes);
    const delta = newScore - baselineScore;
    
    return {
      action: intervention.name,
      new_score: Math.round(newScore * 10) / 10,
      delta: Math.round(delta * 10) / 10
    };
  });

  // Sort by delta and return top 3
  return results
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 3);
};
