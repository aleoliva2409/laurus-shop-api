import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderTableModified1722029812268 implements MigrationInterface {
    name = 'OrderTableModified1722029812268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_payment_type_enum" AS ENUM('cash', 'trasfer', 'mercadopago')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_type" "public"."orders_payment_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."orders_payment_status_enum" AS ENUM('noPay', 'pendingToPay', 'paid')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_status" "public"."orders_payment_status_enum" NOT NULL DEFAULT 'noPay'`);
        await queryRunner.query(`CREATE TYPE "public"."orders_shipping_status_enum" AS ENUM('toPack', 'toSend', 'sent', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_status" "public"."orders_shipping_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_delivery_status_enum" AS ENUM('toPack', 'readyToPickUp', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "delivery_status" "public"."orders_delivery_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "transaction_id" character varying(70)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivery_status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_delivery_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_shipping_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_payment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_type"`);
        await queryRunner.query(`DROP TYPE "public"."orders_payment_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pendingToPay', 'pendingToConfirm', 'paid', 'toPackage', 'sent', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pendingToPay'`);
    }

}
