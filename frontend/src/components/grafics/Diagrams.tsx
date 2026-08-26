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
    <ResponsiveContainer width="100%" height={380}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 16,
          bottom: 5,
          left: -8,
        }}
      >
        <defs>
          <linearGradient id="ventasGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="#e4e4e7"
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={{ stroke: "#e4e4e7" }}
          tick={{ fill: "#71717a", fontSize: 12 }}
        />
        <YAxis
          width={48}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#71717a", fontSize: 12 }}
          label={{
            position: "insideTopLeft",
            angle: -90,
            offset: 18,
            style: { fill: "#71717a", fontSize: 12 },
          }}
        />
        <Tooltip
          cursor={{ stroke: "#e4e4e7", strokeWidth: 1 }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e4e4e7",
            background: "#ffffff",
            color: "#18181b",
            fontSize: 13,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        />
        <Line
          type="monotone"
          dataKey="ventas"
          name="Ventas"
          stroke="url(#ventasGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#6366f1" }}
        />
        <Legend align="right" wrapperStyle={{ fontSize: 13 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
