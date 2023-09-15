import { Category } from './categories';

export interface GetStatTreeQuery {
  dateEnd?: string;
  dateFrom?: string;
  showHidden?: string;
  typeId?: string;
}

export interface GetMonthStatQuery {
  categoryIds?: string;
  dateEnd?: string;
  dateFrom?: string;
  showHidden?: string;
  typeId?: string;
}

export interface GetAllCategoriesQuery {
  showHidden?: string;
  typeId?: string;
}

export interface MonthlyStatCategory {
  category: { id: Category['id']; name: Category['name'] };
  data: { amount: number; period: string }[];
}
