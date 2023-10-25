import { SetMetadata } from '@nestjs/common';
import Permission from '../../domain/models/enums/permission.type';

export const HasPermissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);