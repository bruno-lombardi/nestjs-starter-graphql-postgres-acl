import { SetMetadata } from '@nestjs/common';
import { Permission } from '../interfaces/permission.interface';
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
export const UsePermissions = (...roles: Permission[]) =>
  SetMetadata('permissions', roles);
