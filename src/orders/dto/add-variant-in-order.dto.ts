import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class AddVariantInOrderDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  variantId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  orderId: string;
}
