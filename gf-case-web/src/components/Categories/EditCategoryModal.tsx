import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type { Category } from "../../api/categories";

type Props = {
  open: boolean;
  category: Category | null;

  onClose: () => void;

  onSubmit: (
    id: string,
    data: {
      name: string;
      description?: string;
    }
  ) => Promise<void>;
};

export default function EditCategoryModal({
  open,
  category,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(
        category.description || ""
      );
    }
  }, [category]);

  if (!open || !category) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSubmit(category!.id, {
      name,
      description,
    });

    onClose();
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-lg border bg-white shadow-lg">
      
      {/* HEADER */}
      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-semibold">
          Editar categoria
        </h2>
        <p className="text-xs text-muted-foreground">
          Atualize os dados da categoria
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Nome
          </label>

          <input
            type="text"
            placeholder="Ex: Alimentação"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Descrição
          </label>

          <textarea
            placeholder="Ex: Gastos com mercado..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[90px] w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-black/90"
          >
            Atualizar
          </button>
        </div>

      </form>
    </div>
  </div>
);
}