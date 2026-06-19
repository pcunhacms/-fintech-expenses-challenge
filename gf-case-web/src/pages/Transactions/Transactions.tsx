import { useEffect, useState } from "react";
import {
    getTransactions,
    type Transaction
} from "../../api/transactions";

import {
    getCategories,
    type Category
} from "../../api/categories";

import CreateTransactionModal from "../../components/Transactions/CreateTransactionModal";
import DeleteTransactionModal from "../../components/Transactions/DeleteTransactionModal";
import EditTransactionModal from "../../components/Transactions/EditTransactionModal";

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [typeFilter, setTypeFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);




    async function loadTransactions(currentPage = 1) {
        try {
            setLoading(true);

            const response = await getTransactions({
                page: currentPage,
                limit: 10,

                type: typeFilter
                    ? (typeFilter as "INCOME" | "EXPENSE")
                    : undefined,

                categoryId: categoryFilter || undefined,

                startDate: startDate || undefined,

                endDate: endDate || undefined,
            });

            setTransactions(response.data);
            setPage(response.page);
            setLastPage(response.lastPage);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function loadCategories() {
        try {
            const data = await getCategories();

            console.log("CATEGORIAS:", data);

            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

  
    useEffect(() => {
        loadTransactions();
        loadCategories();
    }, []);

   return (
  <div className="p-6 space-y-6">
    {/* HEADER */}
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Transações
        </h1>
        <p className="text-sm text-muted-foreground">
          Gerencie entradas e saídas financeiras
        </p>
      </div>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
      >
        + Nova transação
      </button>
    </div>

    {/* FILTERS */}
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-sm font-medium">Filtros</h2>
        <p className="text-xs text-muted-foreground">
          Refine sua busca
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Todos os tipos</option>
          <option value="INCOME">Entrada</option>
          <option value="EXPENSE">Saída</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Todas categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => loadTransactions(1)}
          className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-black/90"
        >
          Filtrar
        </button>

        <button
          onClick={() => {
            setTypeFilter("");
            setCategoryFilter("");
            setStartDate("");
            setEndDate("");
            setTimeout(() => loadTransactions(1), 0);
          }}
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        >
          Limpar
        </button>
      </div>
    </div>

    {/* TABLE */}
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">Lista de transações</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr>
              <th className="p-3">Descrição</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Data</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  Carregando...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  Nenhuma transação encontrada
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="border-t hover:bg-muted/30 transition">
                  <td className="p-3 font-medium">{t.description}</td>

                  <td className="p-3 text-muted-foreground">
                    {t.category.name}
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        t.type === "INCOME"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.type === "INCOME" ? "Entrada" : "Saída"}
                    </span>
                  </td>

                  <td className="p-3 font-medium">
                    R$ {Number(t.value).toFixed(2)}
                  </td>

                  <td className="p-3 text-muted-foreground">
                    {new Date(t.date).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTransaction(t);
                          setIsEditModalOpen(true);
                        }}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => {
                          setSelectedTransactionId(t.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* PAGINATION */}
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        Página {page} de {lastPage}
      </p>

      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => loadTransactions(page - 1)}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          disabled={page === lastPage}
          onClick={() => loadTransactions(page + 1)}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>

    {/* MODALS */}
    <CreateTransactionModal
      open={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
      categories={categories}
      onSuccess={() => loadTransactions(page)}
    />

    <EditTransactionModal
      open={isEditModalOpen}
      transaction={selectedTransaction}
      categories={categories}
      onClose={() => {
        setIsEditModalOpen(false);
        setSelectedTransaction(null);
      }}
      onSuccess={() => loadTransactions(page)}
    />

    <DeleteTransactionModal
      open={isDeleteModalOpen}
      transactionId={selectedTransactionId}
      onClose={() => {
        setIsDeleteModalOpen(false);
        setSelectedTransactionId(null);
      }}
      onSuccess={() => loadTransactions(page)}
    />
  </div>
);
}