import { useQuery } from '@tanstack/react-query';
import { LocalTransactionType } from '../types/categories';
import { ETRANSACTION_TYPE } from '../types/transactions';

export const transactionTypesQueryKey = 'transactionTypes';

const types: LocalTransactionType[] = [
  { id: ETRANSACTION_TYPE.EXPENSE, name: 'Расход' },
  { id: ETRANSACTION_TYPE.INCOME, name: 'Доход' },
  { id: ETRANSACTION_TYPE.RETURN_EXPENSE, name: 'Возврат расхода' },
  { id: ETRANSACTION_TYPE.RETURN_INCOME, name: 'Возврат дохода' },
  { id: ETRANSACTION_TYPE.TRANSFER, name: 'Перевод между своими счетами' },
];

const getTypes = (hideReturns: boolean) =>
  new Promise<LocalTransactionType[]>((resolve) => {
    if (hideReturns) {
      resolve(types.filter((type) => type.id !== ETRANSACTION_TYPE.RETURN_EXPENSE && type.id !== ETRANSACTION_TYPE.RETURN_INCOME));
    } else {
      resolve(types);
    }
  });

export const useTransactionTypes = (hideReturns?: boolean) =>
  useQuery([transactionTypesQueryKey, hideReturns], () => getTypes(!!hideReturns));
