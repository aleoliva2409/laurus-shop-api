import { MigrationInterface, QueryRunner } from "typeorm";

export class SizetypeAddedIntoProductTable1721360834803 implements MigrationInterface {
    name = 'SizetypeAddedIntoProductTable1721360834803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_size_type_enum" AS ENUM('alpha', 'numeric1', 'numeric2', 'kids')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "size_type" "public"."products_size_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "size_type"`);
        await queryRunner.query(`DROP TYPE "public"."products_size_type_enum"`);
    }

}
