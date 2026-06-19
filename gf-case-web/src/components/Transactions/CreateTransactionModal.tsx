import { useState } from "react";

import {
  createTransaction,
  type TransactionType,
} from "../../api/transactions";

import type { Category } from "../../api/categories";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  onSuccess: () => void;
};

export default function CreateTransactionModal({
  open,
  onClose,
  categories,
  onSuccess,
}: Props) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] =
    useState<TransactionType>("EXPENSE");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    try {
      await createTransaction({
        description,
        value: Number(value),
        type,
        date,
        categoryId,
      });

      setDescription("");
      setValue("");
      setType("EXPENSE");
      setCategoryId("");
      setDate("");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar transação");
    }
  }

  if (!open) {
    return null;
  }

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">
      
      <h2 className="mb-5 text-xl font-semibold tracking-tight">
        Nova Transação
      </h2>

      <div className="space-y-3">
        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        >
          <option value="INCOME">Entrada</option>
          <option value="EXPENSE">Saída</option>
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        >
          <option value="">Selecione uma categoria</option>
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
          className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="h-9 rounded-md border px-4 text-sm hover:bg-gray-50"
        >
          Cancelar
        </button>

        <button
          onClick={handleSubmit}
          className="h-9 rounded-md bg-black px-4 text-sm text-white hover:bg-black/90"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
);
}