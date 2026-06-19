import type { Category } from "../../api/categories";

type Props = {
  categories: Category[];
  loading: boolean;

  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export default function CategoriesTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">Lista de categorias</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Descrição</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-muted-foreground">
                  Carregando categorias...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-muted-foreground">
                  Nenhuma categoria cadastrada
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="border-t hover:bg-muted/30 transition">
                  <td className="p-3 font-medium">{c.name}</td>

                  <td className="p-3 text-muted-foreground">
                    {c.description || "-"}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(c)}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => onDelete(c)}
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
  );
}