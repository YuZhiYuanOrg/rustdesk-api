import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QuerySoftwareDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  current = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  pageSize = 10;

  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  @IsString()
  arch?: string;

  @IsOptional()
  @IsString()
  typ?: string;

  @IsOptional()
  @IsString()
  os_version?: string;

  @IsOptional()
  @IsString()
  download_url?: string;

  // @IsOptional()
  // @IsString()
  // updated_at?: string;
}
