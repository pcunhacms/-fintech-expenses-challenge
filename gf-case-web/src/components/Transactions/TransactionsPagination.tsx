type Props = {
  page: number;
  lastPage: number;

  onPrevious: () => void;
  onNext: () => void;
};

export default function TransactionsPagination({
  page,
  lastPage,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        Página {page} de {lastPage}
      </p>

      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={onPrevious}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          disabled={page === lastPage}
          onClick={onNext}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}