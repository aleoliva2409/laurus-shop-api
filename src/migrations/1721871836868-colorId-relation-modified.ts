import { MigrationInterface, QueryRunner } from "typeorm";

export class ColorIdRelationModified1721871836868 implements MigrationInterface {
    name = 'ColorIdRelationModified1721871836868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67"`);
        await queryRunner.query(`ALTER TABLE "variants" ALTER COLUMN "colorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67"`);
        await queryRunner.query(`ALTER TABLE "variants" ALTER COLUMN "colorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
