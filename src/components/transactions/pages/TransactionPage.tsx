import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionForm } from '../TransactionForm';
import { Loader } from '../../_shared/Loader';
import { FormHeader } from '../../_shared/forms/FormHeader';
import { useTransactions } from '../../../hooks/useTransactions';
import { UI_ROUTES } from '../../../constants/urls';

export const TransactionsPage: React.FC = () => {
  const { transactionId } = useParams();
  const { useGetOne, useItem } = useTransactions();
  const useDeleleQuery = useItem('DELETE', { id: transactionId });
  const { isFetching, data: transaction } = useGetOne(transactionId ? transactionId : ''); // TODO: переделать структуру, transactionId должен идти как обязательный props
  const navigate = useNavigate();

  return (
    <>
      {isFetching && <Loader />}
      {transactionId && transactionId !== 'new' && (
        <FormHeader
          text="Редактирование транзакции"
          onDeleteButtonClick={() => {
            if (confirm('Удалить транзакцию?')) {
              useDeleleQuery.mutate({});
              navigate(UI_ROUTES.TRANSACTIONS);
            }
          }}
        />
      )}
      {transactionId === 'new' && <div>Новая транзакция</div>}
      {!isFetching && <TransactionForm transaction={transaction} />}
    </>
  );
};

export default TransactionsPage;
