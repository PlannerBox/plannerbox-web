import { Role } from '../enums/Role';
import { apiCall } from '../utils/api';
import { RolePermissionData } from './listRolePermissions';

export type UpdateRolePermissionsProps = {
  permissions: RolePermissionItem[];
};

export type RolePermissionItem = {
  role: Role;
  permissions: RolePermissionData[];
};

export type UpdateRolePermissionsResponse = {};

const updateRolePermissions = async (
  data: UpdateRolePermissionsProps
): Promise<UpdateRolePermissionsResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/role-permissions`,
    {
      method: 'POST',
      body: JSON.stringify(data.permissions),
    }
  );
};

export { updateRolePermissions };
