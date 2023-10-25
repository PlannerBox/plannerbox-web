import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFormationMode1692705630225 implements MigrationInterface {
    name = 'AddFormationMode1692705630225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Student_formationmode_enum" AS ENUM('presentiel', 'hybride', 'distanciel')`);
        await queryRunner.query(`ALTER TABLE "Student" ADD "formationMode" "public"."Student_formationmode_enum" NOT NULL DEFAULT 'presentiel'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "formationMode"`);
        await queryRunner.query(`DROP TYPE "public"."Student_formationmode_enum"`);
    }

}
