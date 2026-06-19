import { useEffect, useState } from "react";

import type { Category } from "../../api/categories";
import { useToast } from "../../hooks/useToats";

import { useCategoryStore } from "../../store/categories.store";

import CategoryModal from "../../components/Categories/CategoryModal";
import CategoriesHeader from "../../components/Categories/CategoriesHeader";
import CategoriesTable from "../../components/Categories/CategoriesTable";

type ModalMode = "create" | "edit" | "delete";

export default function Categories() {
  const toast = useToast();

  const {
    categories,
    loading,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategoryStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("create");

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCreate(data: {
    name: string;
    description?: string;
  }) {
    try {
      await addCategory(data);
      toast.success("Categoria criada com sucesso!");
      fetchCategories();
    } catch {
      toast.error("Erro ao criar categoria.");
    }
  }

  async function handleEdit(
    id: string,
    data: { name: string; description?: string }
  ) {
    try {
      await editCategory(id, data);
      toast.success("Categoria atualizada com sucesso!");
      fetchCategories();
    } catch {
      toast.error("Erro ao atualizar categoria.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await removeCategory(id);
      toast.success("Categoria excluída com sucesso!");
      fetchCategories();
    } catch {
      toast.error("Erro ao excluir categoria.");
    }
  }

  return (
    <div className="p-6 space-y-6">
        
         <CategoriesHeader
        onNewCategory={() => {
          setMode("create");
          setSelectedCategory(null);
          setModalOpen(true);
        }}
      />

      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
       <CategoriesTable
        categories={categories}
        loading={loading}
        onEdit={(c) => {
          setSelectedCategory(c);
          setMode("edit");
          setModalOpen(true);
        }}
        onDelete={(c) => {
          setSelectedCategory(c);
          setMode("delete");
          setModalOpen(true);
        }}
      />
      </div>
      <CategoryModal
        open={modalOpen}
        mode={mode}
        category={selectedCategory}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}