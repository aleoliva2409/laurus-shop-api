import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { DeliveryType, PaymentType } from 'src/shared/types';

export class CreateOrderDto {
  @IsEnum(PaymentType)
  @IsString()
  paymentType: PaymentType;

  @IsEnum(DeliveryType)
  @IsString()
  deliveryType: DeliveryType;

  @IsNumber()
  @Min(1)
  total: number;

  @IsNumber()
  @Min(1)
  totalItems: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  addressId?: string;

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
