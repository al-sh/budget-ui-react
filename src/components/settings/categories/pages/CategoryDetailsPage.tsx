import React from 'react';
import { useParams } from 'react-router-dom';
import { useCategories } from '../../../../hooks/useCategories';
import { Loader } from '../../../_shared/Loader';
import { EditCategoryForm } from '../EditCategoryForm';

export const CategoryDetailsPage: React.VFC = () => {
  const { categoryId } = useParams();
  const { useGetOne } = useCategories();
  const { isFetching, isError, data: category } = useGetOne(categoryId || ''); //TODO: вынести в обязательный пропс чтобы не было этого условия

  return (
    <>
      {isFetching && <Loader />}
      {isError && !isFetching && <div>Ошибка загрузки категории</div>}
      {!isFetching && !isError && category && <EditCategoryForm category={category} />}
    </>
  );
};

export default CategoryDetailsPage;
