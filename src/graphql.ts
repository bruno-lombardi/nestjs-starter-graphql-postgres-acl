/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  socialSecurityNumber?: string;
  identityDocument?: string;
  phoneNumber?: string;
}

export class PaginateUserInput {
  page: number;
  limit: number;
  firstName?: string;
  lastName?: string;
  socialSecurityNumber?: string;
  email?: string;
}

export class SignInInput {
  email: string;
  password: string;
}

export class UpdateUserInput {
  firstName?: string;
  lastName?: string;
  socialSecurityNumber?: string;
  identityDocument?: string;
  phoneNumber?: string;
}

export abstract class IMutation {
  abstract signIn(signInInput?: SignInInput): User | Promise<User>;

  abstract createUser(createInput?: CreateUserInput): User | Promise<User>;

  abstract deleteUser(id: string): boolean | Promise<boolean>;

  abstract updateUser(
    id: string,
    updateInput: UpdateUserInput,
  ): User | Promise<User>;
}

export class PaginateUserResult {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  data?: User[];
}

export abstract class IQuery {
  abstract users(
    input?: PaginateUserInput,
  ): PaginateUserResult | Promise<PaginateUserResult>;

  abstract user(id: string): User | Promise<User>;

  abstract me(): User | Promise<User>;
}

export class User {
  token?: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified?: boolean;
  socialSecurityNumber?: string;
  identityDocument?: string;
  phoneNumber?: string;
}
