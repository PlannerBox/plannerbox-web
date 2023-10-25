import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
};

export type GetUserSummaryProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
};

export type UserSummaryData = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
};

type MetaData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type GetUserSummaryResponse = {
  data: UserSummaryData[];
  meta: MetaData;
};

const getUserSummary = async (
  props: GetUserSummaryProps,
  session: string
): Promise<GetUserSummaryResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/user/summary`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.id && props.filter.id !== '') {
    url = addQueryParams(url, 'filter.id', `$eq:${props.filter.id}`);
  }

  if (props.filter?.username && props.filter.username !== '') {
    url = addQueryParams(
      url,
      'filter.username',
      `$eq:${props.filter.username}`
    );
  }

  if (props.filter?.firstname && props.filter.firstname !== '') {
    url = addQueryParams(
      url,
      'filter.firstname',
      `$eq:${props.filter.firstname}`
    );
  }

  if (props.filter?.lastname && props.filter.lastname !== '') {
    url = addQueryParams(
      url,
      'filter.lastname',
      `$eq:${props.filter.lastname}`
    );
  }

  return await apiCall(url, {
    method: 'GET',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
    redirect: 'follow',
  });
};

export { getUserSummary };
