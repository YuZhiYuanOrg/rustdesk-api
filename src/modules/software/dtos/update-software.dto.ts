import { IsOptional, IsString } from 'class-validator';

export class UpdateSoftwareDto {
  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  @IsString()
  os_version?: string;

  @IsOptional()
  @IsString()
  arch?: string;

  @IsOptional()
  @IsString()
  typ?: string;

  @IsOptional()
  @IsString()
  download_url?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
