import api from "./axios";

export type TransactionType = "INCOME" | "EXPENSE";

export type Transaction = {
  id: string;
  description: string;
  value: number;
  type: TransactionType;
  date: string;

  category: {
    id: string;
    name: string;
    description?: string;
  };
};

export type TransactionsResponse = {
  data: Transaction[];
  total: number;
  page: number;
  lastPage: number;
};

type TransactionsFilters = {
  page?: number;
  limit?: number;
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
};

export async function getTransactions(
  filters: TransactionsFilters = {}
) {
  const params = new URLSearchParams();

  if (filters.page) {
    params.append("page", String(filters.page));
  }

  if (filters.limit) {
    params.append("limit", String(filters.limit));
  }

  if (filters.type) {
    params.append("type", filters.type);
  }

  if (filters.categoryId) {
    params.append("categoryId", filters.categoryId);
  }

  if (filters.startDate) {
    params.append("startDate", filters.startDate);
  }

  if (filters.endDate) {
    params.append("endDate", filters.endDate);
  }

  return api.get<TransactionsResponse>(
    `/transactions?${params.toString()}`
  );
}

export async function createTransaction(data: {
  description: string;
  value: number;
  type: TransactionType;
  date: string;
  categoryId: string;
}) {
  return api.post("/transactions", data);
}

export async function updateTransaction(
  id: string,
  data: {
    description?: string;
    value?: number;
    type?: TransactionType;
    date?: string;
    categoryId?: string;
  }
) {
  return api.patch(`/transactions/${id}`, data);
}

export async function deleteTransaction(id: string) {
  return api.delete(`/transactions/${id}`);
}