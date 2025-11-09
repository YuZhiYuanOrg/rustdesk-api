import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceUpdateRequestDto {
  @IsNotEmpty({ message: '操作系统不能为空' })
  @IsString()
  os: string;

  @IsNotEmpty({ message: '系统版本不能为空' })
  @IsString()
  os_version: string;

  @IsNotEmpty({ message: '架构不能为空' })
  @IsString()
  arch: string;

  @IsNotEmpty({ message: '设备唯一标识不能为空' })
  @IsString()
  device_id: string;

  @IsNotEmpty({ message: '软件类型不能为空' })
  @IsString()
  typ: string;
}
