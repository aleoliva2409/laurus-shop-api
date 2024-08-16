import { PartialType } from '@nestjs/mapped-types';

import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { CreateOrderDto } from './create-order.dto';
import { DeliveryStatus, PaymentStatus, ShippingStatus } from 'src/shared/types';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsDate()
  @IsOptional()
  paidAt?: Date;

  @IsBoolean()
  @IsOptional()
  isDelivered?: boolean;

  @IsDate()
  @IsOptional()
  deliveredAt?: Date;

  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;

  @IsEnum(ShippingStatus)
  @IsOptional()
  shippingStatus?: ShippingStatus;

  @IsEnum(DeliveryStatus)
  @IsOptional()
  deliveryStatus?: DeliveryStatus;

  @IsString()
  @IsOptional()
  transactionId?: string;
}
