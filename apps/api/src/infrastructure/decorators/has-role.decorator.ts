import { SetMetadata } from "@nestjs/common";
import Role from "../../domain/models/enums/role.enum";

export const HasRole = (...roles: Role[]) => SetMetadata('roles', roles)