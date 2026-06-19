import { useEffect, useState } from "react";

import { getDashboard } from "../../api/dashboard";
import type { DashboardData } from "../../types/dashboard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import DashboardChart from "../../components/Dashboard/DashboardChart";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

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


      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Visão geral das suas finanças
        </p>
      </div>


      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          label="Saldo atual"
          value={formatCurrency(data.balance)}
          variant={data.balance >= 0 ? "default" : "danger"}
        />

        <DashboardCard
          label="Valor total de entrada"
          value={formatCurrency(data.totalIncome)}
          variant="success"
        />

        <DashboardCard
          label="Valor total de saída"
          value={formatCurrency(data.totalExpense)}
          variant="danger"
        />
      </div>

      
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        

        <DashboardChart data={data.topCategories} />
      </div>
    </div>
  );
}