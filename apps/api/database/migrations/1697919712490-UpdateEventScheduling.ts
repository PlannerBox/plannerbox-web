import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEventScheduling1697919712490 implements MigrationInterface {
    name = 'UpdateEventScheduling1697919712490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_677f52746dfb715d413c010480c"`);
        await queryRunner.query(`CREATE TABLE "CourseTeachers" ("courseId" uuid NOT NULL, "teacherId" uuid NOT NULL, CONSTRAINT "PK_b67d1a4c0f3d94a93568fdfe78b" PRIMARY KEY ("courseId", "teacherId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f32914f473e448ac5e2076abac" ON "CourseTeachers" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_748c1122931da79a66940bcd99" ON "CourseTeachers" ("teacherId") `);
        await queryRunner.query(`ALTER TABLE "Course" ADD "parentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Course" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "Course" ADD "startDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Course" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "Course" ADD "endDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_677f52746dfb715d413c010480c" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Course" ADD CONSTRAINT "FK_aa7ab61926078bdeff5fa5e6c7a" FOREIGN KEY ("parentId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CourseTeachers" ADD CONSTRAINT "FK_f32914f473e448ac5e2076abacb" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "CourseTeachers" ADD CONSTRAINT "FK_748c1122931da79a66940bcd996" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseTeachers" DROP CONSTRAINT "FK_748c1122931da79a66940bcd996"`);
        await queryRunner.query(`ALTER TABLE "CourseTeachers" DROP CONSTRAINT "FK_f32914f473e448ac5e2076abacb"`);
        await queryRunner.query(`ALTER TABLE "Course" DROP CONSTRAINT "FK_aa7ab61926078bdeff5fa5e6c7a"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_677f52746dfb715d413c010480c"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82"`);
        await queryRunner.query(`ALTER TABLE "Course" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "Course" ADD "endDate" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Course" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "Course" ADD "startDate" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Course" DROP COLUMN "parentId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_748c1122931da79a66940bcd99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f32914f473e448ac5e2076abac"`);
        await queryRunner.query(`DROP TABLE "CourseTeachers"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_677f52746dfb715d413c010480c" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
