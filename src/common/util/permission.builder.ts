import unionBy from 'lodash/unionBy';
import property from 'lodash/property';

export interface Permission {
  id?: number;
  name: string;
  resource: string;
}

export class PermissionBuilder {
  private roles: string[] = [];
  private selectedRole: string;
  private permissionsList: Permission[] = [];
  private permissions: {
    [role: string]: Permission[];
  } = {};
  private static instance: PermissionBuilder = null;
  private serial = 1;

  static builder() {
    if (PermissionBuilder.instance === null) {
      PermissionBuilder.instance = new PermissionBuilder();
    }
    return PermissionBuilder.instance;
  }

  getPermissionsFor(role: string) {
    return this.permissions[role];
  }

  getAllPermissions() {
    return this.permissionsList;
  }

  grant(role: string) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
    this.selectedRole = role;
    return this;
  }

  grantAll(role: string, resource: string) {
    return this.grant(role)
      .createAny(resource)
      .readAny(resource)
      .updateAny(resource)
      .deleteAny(resource);
  }

  extend(role: string) {
    if (this.roles.includes(role) && this.selectedRole) {
      const selectedPermissions = this.permissions[this.selectedRole];
      const permissionsToExtend = this.permissions[role];
      if (selectedPermissions && permissionsToExtend) {
        this.permissions[role] = unionBy(
          selectedPermissions,
          permissionsToExtend,
          property(['name', 'resource']),
        );
      }
    }
  }

  createAny(resource: string) {
    this.commitPermission('create:own', resource);
    return this.commitPermission('create:any', resource);
  }

  createOwn(resource: string) {
    return this.commitPermission('create:own', resource);
  }

  readAny(resource: string) {
    this.commitPermission('read:own', resource);
    return this.commitPermission('read:any', resource);
  }

  readOwn(resource: string) {
    return this.commitPermission('read:own', resource);
  }

  updateAny(resource: string) {
    this.commitPermission('update:own', resource);
    return this.commitPermission('update:any', resource);
  }

  updateOwn(resource: string) {
    return this.commitPermission('update:own', resource);
  }

  deleteAny(resource: string) {
    this.commitPermission('delete:own', resource);
    return this.commitPermission('delete:any', resource);
  }

  deleteOwn(resource: string) {
    return this.commitPermission('delete:own', resource);
  }

  private commitPermission(name: string, resource: string) {
    this.safeCheckForRole();
    const permission = this.buildPermission(name, resource);
    this.permissions[this.selectedRole].push(permission);
    return this;
  }

  private safeCheckForRole() {
    if (!this.selectedRole) {
      throw Error('You should call grant first!');
    }
    if (!this.permissions[this.selectedRole]) {
      this.permissions[this.selectedRole] = [];
    }
  }

  private buildPermission(name: string, resource: string) {
    const hasPermission = this.permissionsList.find(
      p => p.name === name && p.resource === resource,
    );
    if (!hasPermission) {
      const lastIndex =
        this.permissionsList.push({ name, resource, id: this.serial++ }) - 1;
      return this.permissionsList[lastIndex];
    }
    return hasPermission;
  }
}
