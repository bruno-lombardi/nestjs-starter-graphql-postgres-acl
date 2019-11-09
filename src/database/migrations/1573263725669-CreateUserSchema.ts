import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserSchema1573263725669 implements MigrationInterface {
  name = 'CreateUserSchema1573263725669';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(128) NOT NULL, "lastName" character varying(128) NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "password" character varying NOT NULL, "socialSecurityNumber" character varying(14), "birthDate" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_5988ce92803c24344592c47d223" UNIQUE ("socialSecurityNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`, undefined);
  }
}
