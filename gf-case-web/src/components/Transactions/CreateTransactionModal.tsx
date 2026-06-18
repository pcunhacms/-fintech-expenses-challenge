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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          Nova Transação
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-lg border p-2"
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            className="w-full rounded-lg border p-2"
          />

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as TransactionType
              )
            }
            className="w-full rounded-lg border p-2 text-black"
          >
            <option value="INCOME">
              Entrada
            </option>

            <option value="EXPENSE">
              Saída
            </option>
          </select>

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            className="w-full rounded-lg border p-2 text-black"
          >
            <option value="">
              Selecione uma categoria
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
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}