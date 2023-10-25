import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountRolePermissions1692611502632 implements MigrationInterface {
    name = 'AddAccountRolePermissions1692611502632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_role_enum" AS ENUM('admin', 'student', 'externTeacher', 'internTeacher')`);
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_permissions_enum" AS ENUM('add', 'update', 'delete', 'read', 'readAll', 'updateAll')`);
        await queryRunner.query(`CREATE TABLE "RolePermissions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "role" "public"."RolePermissions_role_enum" NOT NULL DEFAULT 'student', "permissions" "public"."RolePermissions_permissions_enum" array NOT NULL DEFAULT '{}', CONSTRAINT "PK_29cf5edaa365f1e090b95eb6708" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "RolePermissions_pkey" ON "RolePermissions" ("id") `);
        await queryRunner.query(`ALTER TABLE "Account" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD "intern" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Account" ADD CONSTRAINT "FK_a9738c411d54f010029fa60104d" FOREIGN KEY ("roleId") REFERENCES "RolePermissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`INSERT INTO public."RolePermissions" (id, "role", permissions) VALUES('10d65583-3068-4f76-be90-5234a306f04b'::uuid, 'admin'::public."RolePermissions_role_enum", '{add,update,delete,read,readAll,updateAll}')`);
        await queryRunner.query(`INSERT INTO public."RolePermissions" (id, "role", permissions) VALUES('a0161fa5-4a3b-4ccb-b445-50ab4ab73eb2'::uuid, 'student'::public."RolePermissions_role_enum", '{read,update}')`);
        await queryRunner.query(`INSERT INTO public."RolePermissions" (id, "role", permissions) VALUES('686ed5da-b6fe-468e-93be-fc461542fa0a'::uuid, 'externTeacher'::public."RolePermissions_role_enum", '{read,update}')`);
        await queryRunner.query(`INSERT INTO public."RolePermissions" (id, "role", permissions) VALUES('967aee48-f7f9-4f0c-b1fc-c492a7f2bf06'::uuid, 'internTeacher'::public."RolePermissions_role_enum", '{read,update}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP CONSTRAINT "FK_a9738c411d54f010029fa60104d"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP COLUMN "intern"`);
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP INDEX "public"."RolePermissions_pkey"`);
        await queryRunner.query(`DROP TABLE "RolePermissions"`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_permissions_enum"`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_role_enum"`);
    }

}
