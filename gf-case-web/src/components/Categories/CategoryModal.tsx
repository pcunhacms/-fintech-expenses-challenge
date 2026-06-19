import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "../../api/categories";

type Mode = "create" | "edit" | "delete";

type Props = {
  open: boolean;
  mode: Mode;
  category?: Category | null;
  onClose: () => void;

  onCreate: (data: {
    name: string;
    description?: string;
  }) => Promise<void>;

  onEdit: (
    id: string,
    data: {
      name: string;
      description?: string;
    }
  ) => Promise<void>;

  onDelete: (id: string) => Promise<void>;
};

export default function CategoryModal({
  open,
  mode,
  category,
  onClose,
  onCreate,
  onEdit,
  onDelete,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category && mode === "edit") {
      setName(category.name);
      setDescription(category.description || "");
    }

    if (mode === "create") {
      setName("");
      setDescription("");
    }
  }, [category, mode, open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (mode === "create") {
      await onCreate({ name, description });
    }

    if (mode === "edit" && category) {
      await onEdit(category.id, { name, description });
    }

    if (mode === "delete" && category) {
      await onDelete(category.id);
    }

    onClose();
  }

  const titleMap = {
    create: "Nova categoria",
    edit: "Editar categoria",
    delete: "Excluir categoria",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-lg font-semibold">
          {titleMap[mode]}
        </h2>

        {mode !== "delete" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-md border px-3"
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[90px] w-full rounded-md border px-3 py-2"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border px-3 py-2 text-sm"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-md bg-black px-3 py-2 text-sm text-white"
              >
                Salvar
              </button>
            </div>
          </form>
        )}

        {mode === "delete" && (
          <>
            <p className="mb-4 text-sm text-gray-600">
              Tem certeza que deseja excluir{" "}
              <b>{category?.name}</b>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="rounded-md border px-3 py-2 text-sm"
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                className="rounded-md bg-red-600 px-3 py-2 text-sm text-white"
              >
                Excluir
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}