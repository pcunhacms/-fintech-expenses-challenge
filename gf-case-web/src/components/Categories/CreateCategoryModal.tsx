import { useState, type FormEvent } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
  }) => Promise<void>;
};

export default function CreateCategoryModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSubmit({
      name,
      description,
    });

    setName("");
    setDescription("");

    onClose();
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    
    <div className="w-full max-w-md rounded-lg border bg-white shadow-xl">

     
      <div className="border-b px-6 py-4">
        <h2 className="text-base font-semibold tracking-tight">
          Nova categoria
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Crie uma categoria para organizar suas transações
        </p>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-4 p-6">

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Nome
          </label>

          <input
            type="text"
            placeholder="Ex: Alimentação"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Descrição
          </label>

          <textarea
            placeholder="Ex: Gastos com comida, mercado..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

       
        <div className="flex justify-end gap-2 pt-2">
          
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm transition hover:bg-accent hover:text-accent-foreground"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Salvar
          </button>

        </div>

      </form>
    </div>
  </div>
);
}