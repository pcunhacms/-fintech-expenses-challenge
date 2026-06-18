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
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Transações</h1>
                    <p className="text-gray-500">
                        Gerencie suas entradas e saídas financeiras
                    </p>
                </div>

                <button
                    onClick={() =>
                        setIsCreateModalOpen(true)
                    }

                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                    + Nova Transação
                </button>
            </div>

            <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Filtros</h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <select
                        value={typeFilter}
                        onChange={(event) =>
                            setTypeFilter(event.target.value)
                        }
                        className="rounded-lg border p-2"
                    >
                        <option value="">Todos os tipos</option>
                        <option value="INCOME">Entrada</option>
                        <option value="EXPENSE">Saída</option>
                    </select>

                    <select
                        value={categoryFilter}
                        onChange={(event) =>
                            setCategoryFilter(event.target.value)
                        }
                        className="rounded-lg border p-2 text-black bg-white"
                    >
                        <option value="">
                            Todas categorias
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>



                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) =>
                            setStartDate(event.target.value)
                        }
                        className="rounded-lg border p-2"
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) =>
                            setEndDate(event.target.value)
                        }
                        className="rounded-lg border p-2"
                    />
                </div>

                <div className="mt-4">
                    <button
                        onClick={() => loadTransactions(1)}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-white"
                    >
                        Filtrar
                    </button>

                    <button
                        onClick={() => {
                            setTypeFilter("");
                            setCategoryFilter("");
                            setStartDate("");
                            setEndDate("");

                            setTimeout(() => {
                                loadTransactions(1);
                            }, 0);
                        }}
                        className="ml-2 rounded-lg border px-4 py-2"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">Descrição</th>
                            <th className="px-4 py-3 text-left">Categoria</th>
                            <th className="px-4 py-3 text-left">Tipo</th>
                            <th className="px-4 py-3 text-left">Valor</th>
                            <th className="px-4 py-3 text-left">Data</th>
                            <th className="px-4 py-3 text-center">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-4 text-center">
                                    Carregando...
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-4 text-center">
                                    Nenhuma transação encontrada
                                </td>
                            </tr>
                        ) : (
                            transactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="border-t"
                                >
                                    <td className="px-4 py-3">
                                        {transaction.description}
                                    </td>

                                    <td className="px-4 py-3">
                                        {transaction.category.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {transaction.type === "INCOME" ? (
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-700">
                                                Entrada
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-100 px-2 py-1 text-sm text-red-700">
                                                Saída
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        R$ {Number(transaction.value).toFixed(2)}
                                    </td>

                                    <td className="px-4 py-3">
                                        {new Date(transaction.date).toLocaleDateString(
                                            "pt-BR"
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedTransaction(transaction);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="rounded-md bg-yellow-500 px-3 py-1 text-sm text-white"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedTransactionId(transaction.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="rounded-md bg-red-600 px-3 py-1 text-sm text-white"
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

            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Página {page} de {lastPage}
                </p>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => loadTransactions(page - 1)}
                        className="rounded-lg border px-4 py-2 disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    <button
                        disabled={page === lastPage}
                        onClick={() => loadTransactions(page + 1)}
                        className="rounded-lg border px-4 py-2 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            </div>

            <CreateTransactionModal
                open={isCreateModalOpen}
                onClose={() =>
                    setIsCreateModalOpen(false)
                }
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