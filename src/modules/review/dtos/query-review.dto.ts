import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryReviewDto {
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
  device_id?: string;

  @IsOptional()
  @IsString()
  start_time?: string; // 开始时间（YYYY-MM-DD HH:mm:ss）

  @IsOptional()
  @IsString()
  end_time?: string; // 结束时间（YYYY-MM-DD HH:mm:ss）

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
