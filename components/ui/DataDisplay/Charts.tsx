import { chartData, spyChartData } from './ChartData';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = { chartData, spyChartData };

const mergedData = data.chartData.map((item) => {
  const matchingItem = data.spyChartData.find(
    (spyItem) => spyItem.name === item.name
  );

  return {
    ...item,
    SPY: matchingItem ? matchingItem.SPY : null
  };
});

export const Charts = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={mergedData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          dataKey="BBB"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Line type="monotone" dataKey="BBB" stroke="#8884d8" />
        <Line type="monotone" dataKey="SPY" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
