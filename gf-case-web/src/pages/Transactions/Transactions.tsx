import { useEffect, useState } from "react";
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    type Transaction,
    type TransactionType,
} from "../../api/transactions";

import {
    getCategories,
    type Category,
} from "../../api/categories";

import TransactionModal from "../../components/Transactions/TransactionModal";
import TransactionsTable from "../../components/Transactions/TransactionsTable";
import TransactionsFilters from "../../components/Transactions/TransactionsFilters";
import TransactionsPagination from "../../components/Transactions/TransactionsPagination";

import { useToast } from "../../hooks/useToats";

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const toast = useToast();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [typeFilter, setTypeFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit" | "delete">("create");

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    async function loadTransactions(currentPage = 1) {
        try {
            setLoading(true);

            const response = await getTransactions({
                page: currentPage,
                limit: 10,
                type: typeFilter ? (typeFilter as "INCOME" | "EXPENSE") : undefined,
                categoryId: categoryFilter || undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
            });

            setTransactions(response.data);
            setPage(response.page);
            setLastPage(response.lastPage);
        } finally {
            setLoading(false);
        }
    }

    async function loadCategories() {
        const data = await getCategories();
        setCategories(data);
    }

    useEffect(() => {
        loadTransactions();
        loadCategories();
    }, []);


    async function handleCreate(data: {
        description: string;
        value: number;
        type: TransactionType;
        categoryId: string;
        date: string;
    }) {
        try {
            await createTransaction(data);
            await loadTransactions(page);

            toast.success("Transação criada com sucesso!");
        } catch (error) {
            toast.error("Erro ao criar transação");
        }
    }

    async function handleEdit(id: string, data: any) {
        try {
            await updateTransaction(id, data);
            await loadTransactions(page);

            toast.success("Transação atualizada com sucesso!");
        } catch (error) {
            toast.error("Erro ao atualizar transação");
        }
    }

    async function handleDelete(id: string) {
        try {
            await deleteTransaction(id);
            await loadTransactions(page);
            toast.success("Transação excluída com sucesso!");
        } catch (error) {
            toast.error("Erro ao excluir transação");
        }
    }

    return (
        <div className="p-6 space-y-6">

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
                    onClick={() => {
                        setMode("create");
                        setSelectedTransaction(null);
                        setModalOpen(true);
                    }}
                    className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
                >
                    + Nova transação
                </button>
            </div>


            <TransactionsFilters
                typeFilter={typeFilter}
                categoryFilter={categoryFilter}
                startDate={startDate}
                endDate={endDate}
                categories={categories}

                onTypeChange={setTypeFilter}
                onCategoryChange={setCategoryFilter}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}

                onFilter={() => loadTransactions(1)}

                onClear={() => {
                    setTypeFilter("");
                    setCategoryFilter("");
                    setStartDate("");
                    setEndDate("");
                    setTimeout(() => loadTransactions(1), 0);
                }}
            />

            <TransactionsTable
                transactions={transactions}
                loading={loading}
                onEdit={(t) => {
                    setSelectedTransaction(t);
                    setMode("edit");
                    setModalOpen(true);
                }}
                onDelete={(t) => {
                    setSelectedTransaction(t);
                    setMode("delete");
                    setModalOpen(true);
                }}
            />


            <TransactionsPagination
                page={page}
                lastPage={lastPage}
                onPrevious={() => loadTransactions(page - 1)}
                onNext={() => loadTransactions(page + 1)}
            />

            <TransactionModal
                open={modalOpen}
                mode={mode}
                transaction={selectedTransaction}
                categories={categories}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedTransaction(null);
                }}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}