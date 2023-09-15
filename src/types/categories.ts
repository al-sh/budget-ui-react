import { ETRANSACTION_TYPE, TransactionTypeWithDeps, TransactionWithDeps } from './transactions';

export interface CategoryWithDeps {
  id: string;
  name?: string;
  isActive?: boolean;
  order?: number;
  type: TransactionTypeWithDeps;
  childrenCategories?: CategoryWithDeps[];
  parentCategory?: CategoryWithDeps;
  transactions?: TransactionWithDeps[];
}

export interface Category {
  id: string;
  isActive: boolean;
  mpath: string;
  name: string;
  order: number;
  parentCategoryId: string | null;
  typeId: ETRANSACTION_TYPE;
}

export interface LocalCategoryTreeItem {
  title?: string;
  id: string;
  key: string | number; //key и value - для Tree в antd
  value: string;
  isActive?: boolean;
  children?: LocalCategoryTreeItem[];
}

export interface LocalTransactionType {
  id: ETRANSACTION_TYPE;
  name: string;
}

export interface ICategoryTreeItem {
  title?: string;
  id: string;
  key: string | number; //key и value - для Tree в antd
  value: string;
  isActive?: boolean;
  children?: ICategoryTreeItem[];
  transactions?: TransactionWithDeps[];
}

export interface ICategoryStatItem extends ICategoryTreeItem {
  selfAmount: number;
  totalAmount: number;
  share: number;
}
