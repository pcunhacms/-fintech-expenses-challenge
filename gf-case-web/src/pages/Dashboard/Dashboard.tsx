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
      <div className="p-6 text-gray-500">
        Carregando dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-red-500">
        Erro ao carregar dados
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">
        Dashboard Financeiro
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Total de Entradas
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            R$ {Number(data.totalIncome).toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Total de Saídas
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            R$ {Number(data.totalExpense).toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Saldo Atual
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              data.balance >= 0
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            R$ {Number(data.balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Top 3 Categorias com Maior Volume de Saídas
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={data.topCategories}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `R$ ${Number(value).toFixed(2)}`,
                "Total",
              ]}
            />

            <Bar
              dataKey="total"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}