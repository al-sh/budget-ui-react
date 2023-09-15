import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccountsStore } from '../stores/AccountsStore';
import { Account } from '../types/accounts';

export const accountsQueryKey = 'accounts';

export const useAccounts = () => {
  const accountsStore = getAccountsStore();

  const queryClient = useQueryClient();

  const cancelAndInvalidateAccounts = async () => {
    await queryClient.cancelQueries([accountsQueryKey]);
    await queryClient.invalidateQueries([accountsQueryKey]);
  };

  const useGetAccountsList = (showHidden?: boolean) => useQuery([accountsQueryKey, showHidden], () => accountsStore.getList(showHidden));

  const useGetOne = (id: string) =>
    useQuery([accountsQueryKey, 'details', id], () => accountsStore.getOne(id), {
      enabled: !!id,
    });

  const useDelete = (params: { id: string; onSuccess?: () => void }) =>
    useMutation(
      () => {
        return accountsStore.delete(params?.id);
      },
      {
        onSuccess: async () => {
          cancelAndInvalidateAccounts();
          params?.onSuccess && params?.onSuccess();
        },
      }
    );

  const useCreate = (params: { onSuccess?: () => void }) =>
    useMutation(
      (formValues: Account) => {
        return accountsStore.create(formValues);
      },
      {
        onSuccess: async () => {
          cancelAndInvalidateAccounts();
          params?.onSuccess && params?.onSuccess();
        },
      }
    );

  const useUpdate = (params: { id: string; onSuccess?: () => void }) =>
    useMutation(
      (formValues: Account) => {
        return accountsStore.update(params.id, formValues);
      },
      {
        onSuccess: async () => {
          cancelAndInvalidateAccounts();
          queryClient.invalidateQueries([accountsQueryKey, 'details', params.id]);
          params?.onSuccess && params?.onSuccess();
        },
      }
    );

  return { useGetAccountsList, useCreate, useGetOne, useUpdate, useDelete };
};
