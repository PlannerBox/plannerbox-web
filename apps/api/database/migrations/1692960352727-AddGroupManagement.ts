import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupManagement1692960352727 implements MigrationInterface {
    name = 'AddGroupManagement1692960352727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Group" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(100) NOT NULL, "color" character varying(50) NOT NULL, CONSTRAINT "PK_d064bd160defed65823032ee547" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Group_pkey" ON "Group" ("id") `);
        await queryRunner.query(`CREATE TABLE "GroupMembers" ("groupId" uuid NOT NULL, "accountId" uuid NOT NULL, "isOwner" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_17f2957262fcab1d41c6d055422" PRIMARY KEY ("groupId", "accountId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "GroupMembers_pkey" ON "GroupMembers" ("groupId", "accountId") `);
        await queryRunner.query(`ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_620c0c144747b4a30137427ffd9" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_5f096d2c348d8a2b05ac099a9f6" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT "FK_5f096d2c348d8a2b05ac099a9f6"`);
        await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT "FK_620c0c144747b4a30137427ffd9"`);
        await queryRunner.query(`DROP INDEX "public"."GroupMembers_pkey"`);
        await queryRunner.query(`DROP TABLE "GroupMembers"`);
        await queryRunner.query(`DROP INDEX "public"."Group_pkey"`);
        await queryRunner.query(`DROP TABLE "Group"`);
    }

}
