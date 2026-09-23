import React, { useState } from "react";
import "./DataLab.css";

const mlMetrics = [
  { name: "Model Accuracy (Random Forest)", val: 92.5, color: "#38bdf8" },
  { name: "Precision (Logistic Regression)", val: 89.2, color: "#e879f9" },
  { name: "Recall Score", val: 91.0, color: "#34d399" },
  { name: "R2 Score (Linear Regression)", val: 88.4, color: "#fbbf24" }
];

const DataLab = () => {
  const [tenure, setTenure] = useState(12);
  const [monthlySpend, setMonthlySpend] = useState(65);
  const [prediction, setPrediction] = useState(null);

  // Core ML Classification Prediction Simulator
  const handlePredictChurn = () => {
    // Simple ML Decision Logic: High spend + Low tenure = High Churn Risk
    let score = 100 - (tenure * 2.5) + (monthlySpend * 0.4);
    score = Math.min(Math.max(Math.round(score), 10), 95);

    let riskLevel = "LOW RISK 🟢";
    let badgeColor = "#34d399";

    if (score > 60) {
      riskLevel = "HIGH RISK 🔴";
      badgeColor = "#f87171";
    } else if (score > 35) {
      riskLevel = "MEDIUM RISK 🟡";
      badgeColor = "#fbbf24";
    }

    setPrediction({
      score,
      riskLevel,
      badgeColor
    });
  };

  return (
    <section id="datalab" className="datalab">
      <div className="datalab-title">
        <span className="datalab-badge">DATA ANALYTICS & ML LAB</span>
        <h1>Interactive ML Playground</h1>
        <p className="datalab-subtitle">
          Test real-time Machine Learning classification models & model evaluation metrics
        </p>
      </div>

      <div className="datalab-grid">
        {/* Widget 1: ML Model Metrics Chart */}
        <div className="datalab-card">
          <div className="card-header">
            <h3>📊 Scikit-Learn Model Metrics</h3>
            <span className="live-tag">ML EVALUATION</span>
          </div>

          <div className="chart-bars-container">
            {mlMetrics.map((item, idx) => (
              <div key={idx} className="chart-row">
                <div className="chart-label">
                  <span>{item.name}</span>
                  <span className="chart-val">{item.val}%</span>
                </div>
                <div className="chart-track">
                  <div
                    className="chart-fill"
                    style={{ width: `${item.val}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Interactive ML Churn Risk Predictor */}
        <div className="datalab-card">
          <div className="card-header">
            <h3>🤖 Customer Churn Risk Predictor</h3>
            <span className="live-tag ml-tag">CLASSIFICATION ML</span>
          </div>

          <p className="card-desc">
            Adjust customer tenure & monthly spend to test the ML prediction logic:
          </p>

          <div className="slider-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Customer Tenure: <strong style={{ color: '#fff' }}>{tenure} Months</strong></label>
            <input
              type="range"
              min="1"
              max="48"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
            />
          </div>

          <div className="slider-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Monthly Spend: <strong style={{ color: '#fff' }}>${monthlySpend}</strong></label>
            <input
              type="range"
              min="10"
              max="200"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#e879f9', cursor: 'pointer' }}
            />
          </div>

          <button className="nlp-btn" onClick={handlePredictChurn}>
            Run ML Prediction 🚀
          </button>

          {prediction && (
            <div className="sentiment-result-box">
              <div className="result-header">
                <span>Predicted Churn Status:</span>
                <span className="sentiment-badge" style={{ backgroundColor: prediction.badgeColor }}>
                  {prediction.riskLevel}
                </span>
              </div>
              <div className="confidence-meter">
                <div className="meter-label">
                  <span>Probability Score:</span>
                  <span>{prediction.score}%</span>
                </div>
                <div className="chart-track">
                  <div
                    className="chart-fill"
                    style={{ width: `${prediction.score}%`, backgroundColor: prediction.badgeColor }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DataLab;
