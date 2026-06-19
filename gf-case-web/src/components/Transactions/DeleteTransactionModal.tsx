import { deleteTransaction } from "../../api/transactions";

type Props = {
  open: boolean;
  transactionId: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DeleteTransactionModal({
  open,
  transactionId,
  onClose,
  onSuccess,
}: Props) {
  async function handleDelete() {
    if (!transactionId) return;

    try {
      await deleteTransaction(transactionId);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir transação");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">

        <h2 className="mb-3 text-xl font-semibold text-red-600">
          Excluir Transação
        </h2>

        <p className="text-sm text-gray-600">
          Tem certeza que deseja excluir esta transação?
        </p>

        <div className="mt-6 flex justify-end gap-2">
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