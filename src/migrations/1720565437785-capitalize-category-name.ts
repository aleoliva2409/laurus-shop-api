import { MigrationInterface, QueryRunner } from "typeorm";

export class CapitalizeCategoryName1720565437785 implements MigrationInterface {
    name = 'CapitalizeCategoryName1720565437785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "UQ_d1a3a67c9c5d440edf414af1271" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "UQ_d1a3a67c9c5d440edf414af1271"`);
    }

}
