import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSoftwareDto {
  @IsNotEmpty({ message: '操作系统不能为空' })
  @IsString()
  os: string;

  @IsNotEmpty({ message: '系统版本不能为空' })
  @IsString()
  os_version: string;

  @IsNotEmpty({ message: '架构不能为空' })
  @IsString()
  arch: string;

  @IsNotEmpty({ message: '软件类型不能为空' })
  @IsString()
  typ: string;

  @IsNotEmpty({ message: '下载地址不能为空' })
  @IsString()
  download_url: string;

  @IsOptional()
  @IsString()
  description?: string;
}
