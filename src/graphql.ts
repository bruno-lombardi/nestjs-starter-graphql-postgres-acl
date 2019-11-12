/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class PaginateRoleInput {
  page: number;
  limit: number;
  name?: string;
  title?: string;
}

export class PaginateUserInput {
  page: number;
  limit: number;
  firstName?: string;
  lastName?: string;
  socialSecurityNumber?: string;
  email?: string;
}

export class PermissionInput {
  id?: string;
  name: string;
  resource: string;
}

export class RoleInput {
  title: string;
  name: string;
  description?: string;
}

export class SignInInput {
  email: string;
  password: string;
}

export class UpdateUserInput {
  firstName?: string;
  lastName?: string;
  socialSecurityNumber?: string;
}

export abstract class IMutation {
  abstract signIn(signInInput?: SignInInput): User | Promise<User>;

  abstract createRole(createInput?: RoleInput): Role | Promise<Role>;

  abstract deleteRole(id: string): boolean | Promise<boolean>;

  abstract updateRole(
    id: string,
    updateInput?: RoleInput,
  ): Role | Promise<Role>;

  abstract updateRolePermissions(
    id: string,
    permissions?: PermissionInput[],
  ): Role | Promise<Role>;

  abstract createUser(createInput?: CreateUserInput): User | Promise<User>;

  abstract deleteUser(id: string): boolean | Promise<boolean>;

  abstract updateUser(
    id: string,
    updateInput: UpdateUserInput,
  ): User | Promise<User>;
}

export class PaginateRoleResult {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  data?: Role[];
}

export class PaginateUserResult {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  data?: User[];
}

export class Permission {
  id: string;
  name: string;
  resource: string;
  roles?: Role[];
}

export abstract class IQuery {
  abstract roles(
    input?: PaginateRoleInput,
  ): PaginateRoleResult | Promise<PaginateRoleResult>;

  abstract role(id: string): Role | Promise<Role>;

  abstract users(
    input?: PaginateUserInput,
  ): PaginateUserResult | Promise<PaginateUserResult>;

  abstract user(id: string): User | Promise<User>;

  abstract me(): User | Promise<User>;
}

export class Role {
  id: string;
  name: string;
  title: string;
  description?: string;
  users?: User[];
  permissions?: Permission[];
}

export class User {
  token?: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  confirmed?: boolean;
  socialSecurityNumber?: string;
  roles?: Role[];
}
