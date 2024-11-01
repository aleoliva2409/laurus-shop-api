import { IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @Length(4, 50)
  fullName: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MaxLength(30)
  street: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  number?: string;

  @IsString()
  @MaxLength(5)
  @IsOptional()
  floor?: string;

  @IsString()
  @MaxLength(15)
  zipCode: string;

  @IsString()
  @MaxLength(25)
  city: string;

  @IsString()
  @MaxLength(25)
  @IsOptional()
  location?: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  betweenStreet1?: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  betweenStreet2?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  observations?: string;

  @IsNumber()
  provinceId: number;
}
