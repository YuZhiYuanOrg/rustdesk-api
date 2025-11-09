import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryDeviceDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  current = 1; // 默认页码

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  pageSize = 10; // 默认每页条数

  @IsOptional()
  @IsString()
  os?: string; // 按操作系统筛选

  @IsOptional()
  @IsString()
  device_id?: string; // 按设备标识筛选

  @IsOptional()
  @IsString()
  typ?: string; // 按软件类型筛选

  @IsOptional()
  @IsString()
  os_version?: string;

  @IsOptional()
  @IsString()
  arch?: string;

  // @IsOptional()
  // @IsString()
  // request_time?: string;
}
