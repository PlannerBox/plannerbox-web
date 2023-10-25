import { MigrationInterface, QueryRunner } from "typeorm";

export class  UpdateAccount1692618673110 implements MigrationInterface {
    name = 'UpdateAccount1692618673110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."RolePermissions_permissions_enum" RENAME TO "RolePermissions_permissions_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_permissions_enum" AS ENUM('add', 'update', 'updateAll', 'delete', 'read', 'readAll')`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" TYPE "public"."RolePermissions_permissions_enum"[] USING "permissions"::"text"::"public"."RolePermissions_permissions_enum"[]`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_permissions_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_permissions_enum_old" AS ENUM('add', 'update', 'delete', 'read', 'readAll')`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" TYPE "public"."RolePermissions_permissions_enum_old"[] USING "permissions"::"text"::"public"."RolePermissions_permissions_enum_old"[]`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_permissions_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."RolePermissions_permissions_enum_old" RENAME TO "RolePermissions_permissions_enum"`);
    }

}
