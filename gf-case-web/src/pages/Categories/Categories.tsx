import { useEffect, useState } from "react";


import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    type Category,
} from "../../api/categories";

import CreateCategoryModal from "../../components/Categories/CreateCategoryModal";
import EditCategoryModal from "../../components/Categories/EditCategoryModal";
import DeleteCategoryModal from "../../components/Categories/DeleteCategoryModal";

import { useToast } from "../../hooks/useToats";
export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();


    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    async function loadCategories() {
        try {
            setLoading(true);

            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateCategory(data: {
        name: string;
        description?: string;
    }) {
        try {
            await createCategory(data);
            await loadCategories();
            toast.success("Categoria criada com sucesso!");
        } catch (error) {
            toast.error("Erro ao criar categoria.");
        }
    }

    async function handleEditCategory(
        id: string,
        data: {
            name: string;
            description?: string;
        }
    ) {
        try {
            await updateCategory(id, data);
             await loadCategories();
             toast.success("Categoria atualizada com sucesso!");
        } catch (error) {
            toast.error("Erro ao atualizar categoria.");
        }
    }

    async function handleDeleteCategory(id: string) {
        try {
            await deleteCategory(id);
            await loadCategories();
            toast.success("Categoria excluída com sucesso!");
        } catch {
            toast.error("Erro ao excluir categoria.");
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
  <div className="p-6 space-y-6">
    {/* HEADER */}
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
        onClick={() => setCreateModalOpen(true)}
        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
      >
        + Nova categoria
      </button>
    </div>

    {/* TABLE */}
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
                  <td className="p-3 font-medium">
                    {c.name}
                  </td>

                  <td className="p-3 text-muted-foreground">
                    {c.description || "-"}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(c);
                          setEditModalOpen(true);
                        }}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCategory(c);
                          setDeleteModalOpen(true);
                        }}
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

    {/* MODALS */}
    <CreateCategoryModal
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateCategory}
    />

    <EditCategoryModal
      open={editModalOpen}
      category={selectedCategory}
      onClose={() => {
        setEditModalOpen(false);
        setSelectedCategory(null);
      }}
      onSubmit={handleEditCategory}
    />

    <DeleteCategoryModal
      open={deleteModalOpen}
      category={selectedCategory}
      onClose={() => {
        setDeleteModalOpen(false);
        setSelectedCategory(null);
      }}
      onConfirm={handleDeleteCategory}
    />
  </div>
);
}