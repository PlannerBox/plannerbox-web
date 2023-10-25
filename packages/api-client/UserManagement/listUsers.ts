import { Role } from '../enums/Role';
import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  role: Role;
};

export type ListUsersProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
};

export type AccountType = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  birthPlace: string;
  lastLogin: null;
  active: true;
};

export type UserGroupData = {
  groupId: string;
  groupMemberCount: number;
  groupName: string;
  isOwner: boolean;
  color: string;
};

export type UserData = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  birthPlace: string;
  active: boolean;
  role: Role;
  groups: UserGroupData[];
};

type MetaData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type ListUsersResponse = {
  data: UserData[];
  meta: MetaData;
};

const listUsers = async (
  props: ListUsersProps,
  session: string
): Promise<ListUsersResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/user/list-paginated`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.role && props.filter.role !== Role.Any) {
    url = addQueryParams(
      url,
      'filter.rolePermissions.role',
      `$eq:${props.filter.role}`
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

export { listUsers };
