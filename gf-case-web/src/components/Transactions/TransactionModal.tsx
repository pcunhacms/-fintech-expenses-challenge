import { useEffect, useState } from "react";
import type { Transaction, TransactionType } from "../../api/transactions";
import type { Category } from "../../api/categories";
import {useToast} from "../../hooks/useToats";
type Mode = "create" | "edit" | "delete";

type Props = {
    open: boolean;
    mode: Mode;

    transaction: Transaction | null;
    categories: Category[];

    onClose: () => void;

    onCreate: (data: {
        description: string;
        value: number;
        type: TransactionType;
        categoryId: string;
        date: string;
    }) => Promise<void>;

    onEdit: (id: string, data: any) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
};

export default function TransactionModal({
    open,
    mode,
    transaction,
    categories,
    onClose,
    onCreate,
    onEdit,
    onDelete,
}: Props) {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [categoryId, setCategoryId] = useState("");
    const [date, setDate] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (mode === "edit" && transaction) {
            setDescription(transaction.description);
            setValue(String(transaction.value));
            setType(transaction.type);
            setCategoryId(transaction.category.id);
            setDate(transaction.date.split("T")[0]);
        }

        if (mode === "create") {
            setDescription("");
            setValue("");
            setType("EXPENSE");
            setCategoryId("");
            setDate("");
        }
    }, [mode, transaction]);

    if (!open) return null;

    async function handleSubmit() {
        if (mode === "create") {
            if (!description || !value || !categoryId || !date) {
                toast.error("Preencha todos os campos");
                return;
            }

            await onCreate({
                description,
                value: Number(value),
                type,
                categoryId,
                date,
            });
        }

        if (mode === "edit" && transaction) {
            await onEdit(transaction.id, {
                description,
                value: Number(value),
                type,
                categoryId,
                date,
            });
        }

        onClose();
    }

    async function handleDelete() {
        if (!transaction) return;

        await onDelete(transaction.id);
        onClose();
    }

    const titleMap = {
        create: "Nova transação",
        edit: "Editar transação",
        delete: "Excluir transação",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">

                <h2 className="mb-5 text-xl font-semibold">
                    {titleMap[mode]}
                </h2>

                {/* DELETE MODE */}
                {mode === "delete" ? (
                    <>
                        <p className="text-sm text-gray-600">
                            Tem certeza que deseja excluir essa transação?
                        </p>

                        <div className="mt-6 flex justify-end gap-2">
                            <button onClick={onClose} className="h-9 rounded-md border px-4 text-sm">
                                Cancelar
                            </button>

                            <button
                                onClick={handleDelete}
                                className="h-9 rounded-md bg-red-600 px-4 text-sm text-white"
                            >
                                Excluir
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-3">
                            <input
                                placeholder="Descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="h-10 w-full rounded-md border px-3 text-sm"
                            />

                            <input
                                type="number"
                                placeholder="Valor"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="h-10 w-full rounded-md border px-3 text-sm"
                            />

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as TransactionType)}
                                className="h-10 w-full rounded-md border px-3 text-sm"
                            >
                                <option value="INCOME">Entrada</option>
                                <option value="EXPENSE">Saída</option>
                            </select>

                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="h-10 w-full rounded-md border px-3 text-sm"
                            >
                                <option value="">Categoria</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="h-10 w-full rounded-md border px-3 text-sm"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button onClick={onClose} className="h-9 rounded-md border px-4 text-sm">
                                Cancelar
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="h-9 rounded-md bg-black px-4 text-sm text-white"
                            >
                                Salvar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}