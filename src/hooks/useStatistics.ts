import { Moment } from 'moment';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '../constants/api-routes';
import { formats } from '../constants/formats';
import { ETRANSACTION_TYPE } from '../types/transactions';
import { getApi } from '../services/Api';
import { GetMonthStatQuery, GetStatTreeQuery, MonthlyStatCategory } from '../types/statitics';
import { ICategoryStatItem } from '../types/categories';

export interface GetStatTreeFormParams {
  dateFrom?: Moment;
  dateEnd?: Moment;
  showHidden?: boolean;
  typeId?: ETRANSACTION_TYPE;
}

export interface GetMonthStatParams {
  dateFrom?: Moment;
  dateEnd?: Moment;
  showHidden?: boolean;
  typeId?: ETRANSACTION_TYPE;
  categoryIds?: string[];
}

export const statQueryKey = 'statistics';

export const useStatistics = () => {
  const api = getApi();

  const useGetTree = (params: GetStatTreeFormParams) => {
    const { dateFrom, dateEnd, typeId, showHidden } = params;
    const query: GetStatTreeQuery = {};

    if (dateFrom?.isValid()) {
      query.dateFrom = dateFrom.format(formats.dateMoment.short);
    }

    if (dateEnd?.isValid()) {
      query.dateEnd = dateEnd.format(formats.dateMoment.short);
    }

    query.showHidden = showHidden ? '1' : '0';
    query.typeId = String(typeId);

    return useQuery([statQueryKey, 'tree', JSON.stringify(query)], () =>
      api.send<ICategoryStatItem[], null, GetStatTreeQuery>({
        endpoint: API_ROUTES.STATISTICS + '/tree',
        method: 'GET',
        query: query,
      })
    );
  };

  const useGraph = (params: GetMonthStatParams) => {
    const { dateFrom, dateEnd, typeId, showHidden } = params;
    const query: GetMonthStatQuery = {};

    if (dateFrom?.isValid()) {
      query.dateFrom = dateFrom.format(formats.dateMoment.short);
    }

    if (dateEnd?.isValid()) {
      query.dateEnd = dateEnd.format(formats.dateMoment.short);
    }

    query.showHidden = showHidden ? '1' : '0';
    query.typeId = String(typeId);

    const categoryIds = params.categoryIds;
    if (categoryIds) {
      query.categoryIds = categoryIds.join(',');
    }

    return useQuery([statQueryKey, 'graph', JSON.stringify(query)], () =>
      api.send<MonthlyStatCategory[], null, GetMonthStatQuery>({
        endpoint: API_ROUTES.STATISTICS + '/graph',
        method: 'GET',
        query: query,
      })
    );
  };

  return { useGetTree, useGraph };
};
