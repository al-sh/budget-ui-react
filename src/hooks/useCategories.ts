import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category } from '../types/categories';
import { ETRANSACTION_TYPE } from '../types/transactions';
import { getCategoriesStore } from '../stores/CategoriesStore';

export const categoriesQueryKey = 'categories';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesStore = getCategoriesStore();

  const useGetTree = (params: { showHidden?: boolean; typeId?: ETRANSACTION_TYPE }) => {
    const { typeId, showHidden } = params;

    return useQuery([categoriesQueryKey, 'tree', typeId, showHidden], () => categoriesStore.getTree(typeId, showHidden));
  };

  const useGetOne = (id: string) =>
    useQuery([categoriesQueryKey, 'details', id], () => categoriesStore.getOne(id), {
      enabled: !!id,
    });

  const useUpdate = (id: string, onSuccess?: () => void) =>
    useMutation(
      (formValues: Category) => {
        return categoriesStore.update(id, formValues);
      },
      {
        onSuccess: async () => {
          await queryClient.cancelQueries([categoriesQueryKey]);
          queryClient.invalidateQueries([categoriesQueryKey]);
          onSuccess && onSuccess();
        },
      }
    );

  const useDelete = (id: string, onSuccess?: () => void) =>
    useMutation(
      (id: string) => {
        return categoriesStore.delete(id);
      },
      {
        onSuccess: async () => {
          await queryClient.cancelQueries([categoriesQueryKey]);
          queryClient.invalidateQueries([categoriesQueryKey]);
          onSuccess && onSuccess();
        },
      }
    );

  const useCreate = () =>
    useMutation(
      (formValues: Category) => {
        return categoriesStore.create(formValues);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([categoriesQueryKey]);
        },
      }
    );

  return { useCreate, useGetTree, useGetOne, useUpdate, useDelete };
};
