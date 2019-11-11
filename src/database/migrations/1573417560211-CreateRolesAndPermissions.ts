import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesAndPermissions1573417560211
  implements MigrationInterface {
  name = 'CreateRolesAndPermissions1573417560211';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "title" character varying(128) NOT NULL, "description" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "resource" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "permission_roles_role" ("permissionId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_534958b0063b8ad39335d7bcfd0" PRIMARY KEY ("permissionId", "roleId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f44b6228b173c7b9dfb8c6600" ON "permission_roles_role" ("permissionId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ec93d4fbf75b063f3ffd2646a" ON "permission_roles_role" ("roleId") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_roles_role" ADD CONSTRAINT "FK_9f44b6228b173c7b9dfb8c66003" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_roles_role" ADD CONSTRAINT "FK_7ec93d4fbf75b063f3ffd2646a5" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "permission_roles_role" DROP CONSTRAINT "FK_7ec93d4fbf75b063f3ffd2646a5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_roles_role" DROP CONSTRAINT "FK_9f44b6228b173c7b9dfb8c66003"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7ec93d4fbf75b063f3ffd2646a"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9f44b6228b173c7b9dfb8c6600"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "permission_roles_role"`, undefined);
    await queryRunner.query(`DROP TABLE "permission"`, undefined);
    await queryRunner.query(`DROP TABLE "role"`, undefined);
  }
}
