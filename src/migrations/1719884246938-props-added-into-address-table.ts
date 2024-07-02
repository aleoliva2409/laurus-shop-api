import { MigrationInterface, QueryRunner } from "typeorm";

export class PropsAddedIntoAddressTable1719884246938 implements MigrationInterface {
    name = 'PropsAddedIntoAddressTable1719884246938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "created_at"`);
    }

}
