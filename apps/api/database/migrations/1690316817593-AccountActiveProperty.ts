import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountActiveProperty1690316817593 implements MigrationInterface {
    name = 'AccountActiveProperty1690316817593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "active"`);
    }

}
