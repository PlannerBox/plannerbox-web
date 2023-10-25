import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillEntity1695152905236 implements MigrationInterface {
    name = 'AddSkillEntity1695152905236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TeacherSkills" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "teacherId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_7416572e0f6b95f0931c24c99f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Skill" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_566c22ec29ed0c9cab8eb36ffbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Skill_pkey" ON "Skill" ("id") `);
        await queryRunner.query(`ALTER TABLE "TeacherSkills" ADD CONSTRAINT "FK_8024c5507aab383df9d86cc24a4" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TeacherSkills" ADD CONSTRAINT "FK_600caca35b2bb81d7a1f64cda26" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TeacherSkills" DROP CONSTRAINT "FK_600caca35b2bb81d7a1f64cda26"`);
        await queryRunner.query(`ALTER TABLE "TeacherSkills" DROP CONSTRAINT "FK_8024c5507aab383df9d86cc24a4"`);
        await queryRunner.query(`DROP INDEX "public"."Skill_pkey"`);
        await queryRunner.query(`DROP TABLE "Skill"`);
        await queryRunner.query(`DROP TABLE "TeacherSkills"`);
    }

}
