export class DashboardResponseDto {
  balance!: number;
  totalIncome!: number;
  totalExpense!: number;
  topCategories!: {
    category: string;
    total: number;
  }[];
}