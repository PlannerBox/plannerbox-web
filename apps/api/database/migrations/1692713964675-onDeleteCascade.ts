import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteCascade1692713964675 implements MigrationInterface {
    name = 'OnDeleteCascade1692713964675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "FK_3497a8bbf572bc7267563c094b0"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a"`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "FK_3497a8bbf572bc7267563c094b0" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teacher" DROP CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "FK_3497a8bbf572bc7267563c094b0"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "FK_3497a8bbf572bc7267563c094b0" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
