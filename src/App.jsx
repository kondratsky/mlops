import React, { useState, useMemo } from 'react';
import CSVUploader from './components/CSVUploader';
import ExperimentSelector from './components/ExperimentSelector';
import MetricFilter from './components/MetricFilter';
import MetricChart from './components/MetricChart';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedExperiments, setSelectedExperiments] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  // Отримуємо всі унікальні experiment_id
  const experimentIds = useMemo(() => {
    const ids = new Set(csvData.map((item) => item.experiment_id));
    return Array.from(ids);
  }, [csvData]);

  // Унікальні metric_name
  const availableMetrics = useMemo(() => {
    return [...new Set(csvData.map((r) => r.metric_name))];
  }, [csvData]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧪 MLOps Experiment Viewer</h1>

      {/* Завантаження CSV */}
      <CSVUploader onDataParsed={setCsvData} />

      {/* Вибір експериментів */}
      {csvData.length > 0 && (
        <ExperimentSelector
          experimentIds={experimentIds}
          selected={selectedExperiments}
          onChange={setSelectedExperiments}
        />
      )}

      {/* Вибір метрик */}
      {selectedExperiments.length > 0 && (
        <MetricFilter
          availableMetrics={availableMetrics}
          selectedMetrics={selectedMetrics}
          onChange={setSelectedMetrics}
        />
      )}

      {/* Побудова графіків */}
      {selectedExperiments.length > 0 && selectedMetrics.length > 0 && (
        <>
          <h2 style={{ marginTop: '30px' }}>📈 Візуалізація метрик</h2>

          {(() => {
            const filtered = csvData.filter((row) =>
              selectedExperiments.includes(row.experiment_id)
            );

            const metrics = [...new Set(filtered.map((r) => r.metric_name))];

            return metrics
              .filter((metric) => selectedMetrics.includes(metric))
              .map((metric) => {
                const dataByStep = {};

                filtered
                  .filter((r) => r.metric_name === metric)
                  .forEach((row) => {
                    const step = Number(row.step);
                    const value = Number(row.value);

                    if (isNaN(step) || isNaN(value)) return;

                    if (!dataByStep[step]) dataByStep[step] = { step };
                    dataByStep[step][row.experiment_id] = value;
                  });

                const chartData = Object.values(dataByStep).sort(
                  (a, b) => a.step - b.step
                );

                return (
                  <MetricChart
                    key={metric}
                    data={chartData}
                    metricName={metric}
                  />
                );
              });
          })()}
        </>
      )}
    </div>
  );
}

export default App;
