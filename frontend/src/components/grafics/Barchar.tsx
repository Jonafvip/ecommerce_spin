import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";



type ChartData = {
  name: string;
  value: number;
};

type BarChartProps = {
  data: ChartData[];
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
};

export default function Barchar({
  data,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
