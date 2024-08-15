import { IsArray, IsNumber, IsObject, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @Min(1)
  total: number;

  @IsNumber()
  @Min(1)
  totalItems: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  addressId?: number;

  @IsArray({ each: true })
  @IsObject()
  variants: VariantDto[];
}

class VariantDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
