import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @Length(4, 50)
  fullName?: string;

  // @IsString()
  // @IsOptional()
  // nroDocumento?: string;

  // @IsEmail()
  // @IsString()
  // @IsOptional()
  // email?: string;
}
