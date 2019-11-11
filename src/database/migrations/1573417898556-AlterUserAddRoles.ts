import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserAddRoles1573417898556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_414979b0063b8bc39335d748f10" PRIMARY KEY ("userId", "roleId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a44b6228b173c7b9dfb8aa647" ON "user_roles_role" ("userId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8844abvvbf75b01affffvc6112" ON "user_roles_role" ("roleId") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_ffcab6228b173c7b9dfb8c61244" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_641d5484bf75b063fdcff26abcd" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_641d5484bf75b063fdcff26abcd"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_ffcab6228b173c7b9dfb8c61244"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_8844abvvbf75b01affffvc6112"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_4a44b6228b173c7b9dfb8aa647"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`, undefined);
  }
}
