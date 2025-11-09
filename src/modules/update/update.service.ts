import { Injectable, NotFoundException } from '@nestjs/common';
import { SoftwareService } from '../software/software.service';
import { ReviewService } from '../review/review.service';
import { DeviceUpdateRequestDto } from './dtos/device-update-request.dto';
import { DeviceEntity } from '../../entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateService {
  constructor(
    private readonly softwareService: SoftwareService,
    private readonly reviewService: ReviewService,
    @InjectRepository(DeviceEntity)
    private readonly deviceRepo: Repository<DeviceEntity>,
  ) {}

  // 处理设备更新请求
  async handleUpdateRequest(data: DeviceUpdateRequestDto) {
    const { os, os_version, arch, device_id, typ } = data;

    // 1. 查找匹配的软件配置
    const software = await this.softwareService.findMatch(os, os_version, arch, typ);
    if (!software) throw new NotFoundException('未找到匹配的软件下载地址');

    // 2. 保存设备请求记录（首次请求时新增）
    const existingDevice = await this.deviceRepo.findOneBy({ device_id: device_id });
    if (!existingDevice) {
      const device = this.deviceRepo.create({
        os,
        os_version: os_version,
        arch,
        device_id: device_id,
        typ,
      });
      await this.deviceRepo.save(device);
    }

    // 3. 保存审查记录
    await this.reviewService.create({
      device_id: device_id,
      download_url: software.download_url,
      os,
      os_version: os_version,
      arch,
      typ,
    });

    // 4. 返回结果（版本可选，这里默认返回空）
    return {
      download_url: software.download_url,
      message: '更新地址获取成功',
      version: '', // 可根据实际需求从software表扩展version字段
    };
  }
}
