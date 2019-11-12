import { PermissionBuilder } from '../../common/util/permission.builder';

PermissionBuilder.builder()
  .grant('CUSTOMER')
  .createOwn('user')
  .readOwn('user')
  .updateOwn('user')
  .deleteOwn('user')

  .readOwn('role')
  .readOwn('permission')

  .createAny('order')
  .readOwn('order')
  .updateOwn('order')

  .readAny('product')

  .grantAll('ADMIN', 'role')
  .grantAll('ADMIN', 'permission')
  .grantAll('ADMIN', 'user')
  .grantAll('ADMIN', 'product')
  .grantAll('ADMIN', 'order')

  .grantAll('MANAGER', 'user')
  .grantAll('MANAGER', 'product')
  .grantAll('MANAGER', 'order')
  .readOwn('role')
  .readOwn('permission');

export default PermissionBuilder.builder();
