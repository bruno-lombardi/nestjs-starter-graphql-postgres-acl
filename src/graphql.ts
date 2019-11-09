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

  abstract createUser(createInput?: CreateUserInput): User | Promise<User>;

  abstract deleteUser(id: string): boolean | Promise<boolean>;

  abstract updateUser(
    id: string,
    updateInput: UpdateUserInput,
  ): User | Promise<User>;
}

export abstract class IQuery {
  abstract users(): User[] | Promise<User[]>;

  abstract user(id: string): User | Promise<User>;

  abstract me(): User | Promise<User>;
}

export class User {
  token?: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  confirmed?: boolean;
  socialSecurityNumber?: string;
}
