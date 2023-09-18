// components/Charts.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload.timestamp;
    const formattedTimestamp = formatTimestamp(timestamp);
    
    return (
      <div className="custom-tooltip bg-white border border-purple-300 p-2">
        <p>{`Time: ${formattedTimestamp}`}</p>
        <p>{`Price: ${payload[0].payload.price}`}</p>
      </div>
    );
  }

  return null;
};

const CommodityChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={formatTimestamp}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CommodityChart;
