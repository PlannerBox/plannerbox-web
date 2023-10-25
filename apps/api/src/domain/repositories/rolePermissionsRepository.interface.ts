import { RolePermissions } from "../../infrastructure/entities/RolePermissions.entity";
import Permission from "../models/enums/permission.type";
import Role from "../models/enums/role.enum";

export interface IRolePermissionsRepository {
    updateRolePermissions(role: Role, permissions: Permission[]): Promise<void>;
    getRolePermissions(): Promise<RolePermissions[]>;
}