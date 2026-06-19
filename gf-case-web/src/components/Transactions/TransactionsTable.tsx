import type { Transaction } from "../../api/transactions";

type Props = {
  transactions: Transaction[];
  loading: boolean;

  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
};

export default function TransactionsTable({
  transactions,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
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
                  <td className="p-3 text-muted-foreground">{t.category.name}</td>

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
                        onClick={() => onEdit(t)}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => onDelete(t)}
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