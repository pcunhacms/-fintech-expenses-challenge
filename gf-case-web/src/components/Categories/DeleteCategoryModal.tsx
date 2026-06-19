import type { Category } from "../../api/categories";

type Props = {
    open: boolean;
    category: Category | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function DeleteCategoryModal({
    open,
    category,
    onClose,
    onConfirm,
}: Props) {
    if (!open || !category) {
        return null;
    }

    const currentCategory = category;

    async function handleDelete() {
        await onConfirm(currentCategory.id);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">

                <h2 className="mb-3 text-xl font-semibold text-red-600">
                    Excluir Categoria
                </h2>

                <p className="mb-6 text-sm text-gray-600">
                    Tem certeza que deseja excluir{" "}
                    <span className="font-medium text-gray-900">
                        {category.name}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="h-9 rounded-md border px-4 text-sm hover:bg-gray-50"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleDelete}
                        className="h-9 rounded-md bg-red-600 px-4 text-sm text-white hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}