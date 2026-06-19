import type { Category } from "../../api/categories";

type Props = {
  typeFilter: string;
  categoryFilter: string;
  startDate: string;
  endDate: string;

  categories: Category[];

  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;

  onFilter: () => void;
  onClear: () => void;
};

export default function TransactionsFilters({
  typeFilter,
  categoryFilter,
  startDate,
  endDate,
  categories,
  onTypeChange,
  onCategoryChange,
  onStartDateChange,
  onEndDateChange,
  onFilter,
  onClear,
}: Props) {
  return (
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
          onChange={(e) => onTypeChange(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Todos os tipos</option>
          <option value="INCOME">Entrada</option>
          <option value="EXPENSE">Saída</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
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
          onChange={(e) => onStartDateChange(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onFilter}
          className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-black/90"
        >
          Filtrar
        </button>

        <button
          onClick={onClear}
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}