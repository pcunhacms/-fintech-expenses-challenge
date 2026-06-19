import { create } from "zustand";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from "../api/categories";

type CategoryState = {
  categories: Category[];
  loading: boolean;

  fetchCategories: () => Promise<void>;
  addCategory: (data: { name: string; description?: string }) => Promise<void>;
  editCategory: (
    id: string,
    data: { name: string; description?: string }
  ) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
};

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });

    const data = await getCategories();

    set({ categories: data, loading: false });
  },

  addCategory: async (data) => {
    await createCategory(data);
    await get().fetchCategories();
  },

  editCategory: async (id, data) => {
    await updateCategory(id, data);
    await get().fetchCategories();
  },

  removeCategory: async (id) => {
    await deleteCategory(id);
    await get().fetchCategories();
  },
}));