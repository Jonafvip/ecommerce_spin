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
  margin = { top: 16, right: 12, left: -8, bottom: 0 },
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={margin}>
        <defs>
          <linearGradient id="clientesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
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
          width={40}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          tick={{ fill: "#71717a", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "#f4f4f5" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e4e4e7",
            background: "#ffffff",
            color: "#18181b",
            fontSize: 13,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        />
        <Bar
          dataKey="value"
          name="Clientes"
          fill="url(#clientesGradient)"
          radius={[6, 6, 0, 0]}
          maxBarSize={48}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
