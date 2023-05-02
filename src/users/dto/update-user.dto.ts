import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ROLES_ENUM } from 'src/constants/roles.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsEnum(ROLES_ENUM)
  role?: ROLES_ENUM;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePicture?: string;

  
}
