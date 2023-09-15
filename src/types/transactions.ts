import { Account } from './accounts';
import { CategoryWithDeps } from './categories';

export enum ETRANSACTION_TYPE {
  EXPENSE = 1,
  INCOME = 2,
  RETURN_EXPENSE = 3,
  RETURN_INCOME = 4,
  TRANSFER = 5,
}

export interface TransactionTypeWithDeps {
  id: ETRANSACTION_TYPE;
  name?: string;
  imageUrl?: string;
  categories?: CategoryWithDeps[];
}

export interface TransactionWithDeps {
  id: string;
  description?: string;
  amount: number;
  dt?: Date;
  account?: Account;
  toAccount?: Account;
  category?: CategoryWithDeps;
  type: TransactionTypeWithDeps;
}

export interface LocalTransaction {
  accountId: string;
  amount: number;
  categoryId: string;
  description?: string;
  dt: string;
  id: string;
  toAccountId: string;
  typeId: ETRANSACTION_TYPE;
}

export interface LocalTransactionWithNames extends LocalTransaction {
  categoryName?: string;
  accountName?: string;
}
