import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ChartPoint {
  name: string;
  ventas: number;
}

export const Step4 = ({ data }: { data: ChartPoint[] }) => {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="ventas"
          stroke="purple"
          strokeWidth={2}
          name="Ventas"
        />
        <XAxis dataKey="name" />
        <YAxis
          width="auto"
          label={{ value: "Ventas", position: "insideLeft", angle: -90 }}
        />
        <Legend align="right" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
