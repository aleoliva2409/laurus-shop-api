import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { DeliveryStatus, PaymentStatus, ShippingStatus } from 'src/shared/types';

export class UpdateOrderDto {
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
