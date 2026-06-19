import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartData = {
  category: string;
  total: number;
};

type Props = {
  data: ChartData[];
};

export default function DashboardChart({ data }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-semibold">
          Categorias com maior volume de saída
        </h2>
        <p className="text-sm text-muted-foreground">
          Top categorias do período
        </p>
      </div>

      <div className="h-[320px] md:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              formatter={(value) => [
                `R$ ${Number(value).toFixed(2)}`,
                "Total",
              ]}
            />

            <Bar
              dataKey="total"
              fill="#4b1cf7"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}