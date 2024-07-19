import { MigrationInterface, QueryRunner } from "typeorm";

export class SizetypeAddedIntoSizeTable1721357302077 implements MigrationInterface {
    name = 'SizetypeAddedIntoSizeTable1721357302077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sizes_type_enum" AS ENUM('alpha', 'numeric1', 'numeric2', 'kids')`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD "type" "public"."sizes_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sizes" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sizes_type_enum"`);
    }

}
