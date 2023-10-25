import { Role } from '../enums/Role';
import { apiCall } from '../utils/api';
import { RolePermissionData } from './listRolePermissions';
import { UserData } from './listUsers';

export type GetUserDetailsProps = {
  accountId?: string;
};

export type UserDetailsData = UserData & {
  id: string;
  role: Role;
  permissions: RolePermissionData[];
};

export type GetUserDetailsResponse = UserDetailsData;

const getUserDetails = async (
  props: GetUserDetailsProps,
  session: string
): Promise<GetUserDetailsResponse> => {
  let url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/user-management/users/details/${props.accountId || ''}`;

  return await apiCall(url, {
    method: 'GET',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
    redirect: 'follow',
  });
};

export { getUserDetails };
