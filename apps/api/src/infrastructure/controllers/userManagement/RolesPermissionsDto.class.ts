import { ApiProperty } from "@nestjs/swagger";
import Role from "../../../domain/models/enums/role.enum";
import UsersPermissions from "../../../domain/models/enums/usersPermissions.enum";

export class RolesPermissionsDto {
    @ApiProperty({ required: false, enum: Role, enumName: 'Role' })
    readonly role: Role;

    @ApiProperty({ required: false, enum: UsersPermissions, enumName: 'UsersPermissions', isArray: true })
    readonly permissions: UsersPermissions[];
}