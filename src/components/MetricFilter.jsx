import React from 'react';

const MetricFilter = ({ availableMetrics, selectedMetrics, onChange }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>📐 Обери метрики для перегляду:</h3>
      {availableMetrics.map((metric) => (
        <div key={metric}>
          <label>
            <input
              type="checkbox"
              value={metric}
              checked={selectedMetrics.includes(metric)}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  onChange([...selectedMetrics, metric]);
                } else {
                  onChange(selectedMetrics.filter((m) => m !== metric));
                }
              }}
            />
            {metric}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MetricFilter;
