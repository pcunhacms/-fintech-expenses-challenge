import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getDashboard } from "../../api/dashboard";
import type { DashboardData } from "../../types/dashboard";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await getDashboard();
        setData(response);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Carregando dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Sem dados para exibir
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Visão geral das suas finanças
        </p>
      </div>

      {/* CARDS */}
      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
          <p className="text-sm text-muted-foreground">
            Saldo atual
          </p>
          <p
            className={`mt-2 text-2xl font-semibold ${
              data.balance >= 0
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            R$ {Number(data.balance).toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
          <p className="text-sm text-muted-foreground">
            Valor total de entrada
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">
            R$ {Number(data.totalIncome).toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
          <p className="text-sm text-muted-foreground">
            Valor total de saída
          </p>
          <p className="mt-2 text-2xl font-semibold text-red-600">
            R$ {Number(data.totalExpense).toFixed(2)}
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-base font-semibold">
            Categorias com maior volume de saída
          </h2>
          <p className="text-sm text-muted-foreground">
            Top 3 categorias do período
          </p>
        </div>

        <div className="h-[320px] md:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topCategories}>
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
    </div>
  );
}