import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class VariantInOrderDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  variantId: string;
}

export interface IVariantInOrder extends VariantInOrderDto {
  orderId: string;
}
