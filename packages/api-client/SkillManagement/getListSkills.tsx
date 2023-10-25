import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  name?: string;
};

export type GetListSkillsProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
};

export type ListSkillsData = {
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

export type GetListSkillsResponse = {
  data: ListSkillsData[];
  meta: MetaData;
};

const getListSkills = async (
  props: GetListSkillsProps,
  session: string
): Promise<GetListSkillsResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/skill-management/skill/all`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.name && props.filter.name !== '') {
    url = addQueryParams(url, 'filter.name', `$eq:${props.filter.name}`);
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

export { getListSkills };
