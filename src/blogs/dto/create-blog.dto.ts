import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsString()
  @IsOptional()
  body: string;
}
