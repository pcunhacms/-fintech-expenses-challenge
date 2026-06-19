type Props = {
  onNewCategory: () => void;
};

export default function CategoriesHeader({ onNewCategory }: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Categorias
        </h1>
        <p className="text-sm text-muted-foreground">
          Organize suas categorias financeiras
        </p>
      </div>

      <button
        onClick={onNewCategory}
        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
      >
        + Nova categoria
      </button>
    </div>
  );
}