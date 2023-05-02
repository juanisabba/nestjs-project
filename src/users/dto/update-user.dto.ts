import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ROLES_ENUM } from 'src/constants/roles.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password?: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ROLES_ENUM)
  role?: ROLES_ENUM;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePicture?: string;

  
}
