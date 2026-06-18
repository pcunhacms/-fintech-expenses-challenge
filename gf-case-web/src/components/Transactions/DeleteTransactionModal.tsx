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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          Excluir Transação
        </h2>

        <p className="text-gray-600">
          Tem certeza que deseja excluir esta transação?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}