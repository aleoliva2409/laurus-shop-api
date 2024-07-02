import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from '../../users/dto/create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
