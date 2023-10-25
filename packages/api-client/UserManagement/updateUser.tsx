import { GroupData } from '../GroupManagement/listGroups';
import { Role } from '../enums/Role';
import { apiCall } from '../utils/api';
import { RolePermissionData } from './listRolePermissions';

export type UpdateUserProps = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  session: string;
};

export type UpdateUserResponse = {
  studentId: string;
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  lastLogin: string | null;
  role: Role;
  rolePermissions: {
    id: string;
    role: Role;
    permissions: RolePermissionData[];
  };
  groups: GroupData[];
};

const updateUser = async ({
  id,
  username,
  firstname,
  lastname,
  session,
}: UpdateUserProps): Promise<UpdateUserResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/update`,
    {
      method: 'POST',
      body: JSON.stringify({ id, username, firstname, lastname }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Cookie: `session=${session}`,
      }),
      credentials: 'include',
      redirect: 'follow',
    }
  );
};

export { updateUser };
