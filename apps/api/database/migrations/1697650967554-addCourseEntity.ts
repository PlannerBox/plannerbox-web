import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourseEntity1697650967554 implements MigrationInterface {
    name = 'AddCourseEntity1697650967554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Course_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "Course" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(100) NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "type" "public"."Course_type_enum" NOT NULL DEFAULT '0', "groupId" uuid, CONSTRAINT "PK_2132e2054a5c04b038320b38c11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Course_pkey" ON "Course" ("id") `);
        await queryRunner.query(`CREATE TABLE "CourseSkills" ("courseId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_9da6b6c6b2b04c2e3322c0e0f50" PRIMARY KEY ("courseId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72156c299f09de45c8ffa3705f" ON "CourseSkills" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1e85e12f66e0f17d34f4f3e7f7" ON "CourseSkills" ("skillId") `);
        await queryRunner.query(`CREATE TYPE "public"."Group_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "Group" ADD "type" "public"."Group_type_enum" NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "Course" ADD CONSTRAINT "FK_8bfe378dfd793d9820fdc9aa920" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CourseSkills" ADD CONSTRAINT "FK_72156c299f09de45c8ffa3705fe" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "CourseSkills" ADD CONSTRAINT "FK_1e85e12f66e0f17d34f4f3e7f7e" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseSkills" DROP CONSTRAINT "FK_1e85e12f66e0f17d34f4f3e7f7e"`);
        await queryRunner.query(`ALTER TABLE "CourseSkills" DROP CONSTRAINT "FK_72156c299f09de45c8ffa3705fe"`);
        await queryRunner.query(`ALTER TABLE "Course" DROP CONSTRAINT "FK_8bfe378dfd793d9820fdc9aa920"`);
        await queryRunner.query(`ALTER TABLE "Group" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."Group_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e85e12f66e0f17d34f4f3e7f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72156c299f09de45c8ffa3705f"`);
        await queryRunner.query(`DROP TABLE "CourseSkills"`);
        await queryRunner.query(`DROP INDEX "public"."Course_pkey"`);
        await queryRunner.query(`DROP TABLE "Course"`);
        await queryRunner.query(`DROP TYPE "public"."Course_type_enum"`);
    }

}
