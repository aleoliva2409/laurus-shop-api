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
import { AddVariantInOrderDto } from './add-variant-in-order.dto';

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

  @IsArray()
  @IsObject({ each: true })
  variants: AddVariantInOrderDto[];
}
