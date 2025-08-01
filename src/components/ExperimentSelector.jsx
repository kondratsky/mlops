import React from 'react';

const ExperimentSelector = ({ experimentIds, selected, onChange }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>🧪 Обери експерименти:</h3>
      {experimentIds.map((id) => (
        <div key={id}>
          <label>
            <input
              type="checkbox"
              value={id}
              checked={selected.includes(id)}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  onChange([...selected, id]);
                } else {
                  onChange(selected.filter((item) => item !== id));
                }
              }}
            />
            {id}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ExperimentSelector;
