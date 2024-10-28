import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/shared/types';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
