import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetricChart = ({ data, metricName }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h4>{metricName}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="step" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data[0])
            .filter((key) => key !== 'step')
            .map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke="#8884d8"
                dot={false}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricChart;
