import { Role } from '../enums/Role';
import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  id: Role;
};

export type ListRolePermissionsProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
};

export type RolePermissionData = {
  id: Role;
  label: string;
};

type MetaData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type ListRolePermissionsResponse = {
  data: RolePermissionData[];
  meta: MetaData;
};

const listRolePermissions = async (
  props: ListRolePermissionsProps,
  session: string
): Promise<ListRolePermissionsResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/role-permissions`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.id && props.filter.id !== Role.Any) {
    url = addQueryParams(
      url,
      'filter.rolePermissions.role',
      `$eq:${props.filter.id}`
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

export { listRolePermissions };
