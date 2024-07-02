import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesAndRelationsAdded1719881798900 implements MigrationInterface {
    name = 'EntitiesAndRelationsAdded1719881798900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "variants_in_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "variantId" uuid, "orderId" uuid, CONSTRAINT "PK_79f774723d003824bf47a6fe327" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "subcategoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "sizeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "colorId" integer`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "productId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "provinceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_d1fe096726c3c5b8a500950e448" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a87b8b3bf0a30377d53a7605c8a" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_bdbfe33a28befefa9723c355036" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" ADD CONSTRAINT "FK_9c1097d3f905788db5da9d9fd2d" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" ADD CONSTRAINT "FK_fda8c95faf5c5d9792248f81732" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_37636d260931dcf46d11892f614" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_fcec2e72402c8ba8f8f32e6ac93" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_fcec2e72402c8ba8f8f32e6ac93"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_37636d260931dcf46d11892f614"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" DROP CONSTRAINT "FK_fda8c95faf5c5d9792248f81732"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" DROP CONSTRAINT "FK_9c1097d3f905788db5da9d9fd2d"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_bdbfe33a28befefa9723c355036"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a87b8b3bf0a30377d53a7605c8a"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_d1fe096726c3c5b8a500950e448"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "provinceId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "colorId"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "sizeId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "subcategoryId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "province" character varying(25) NOT NULL`);
        await queryRunner.query(`DROP TABLE "variants_in_orders"`);
    }

}
