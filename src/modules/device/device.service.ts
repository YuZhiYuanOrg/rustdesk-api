import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from '../../entities/device.entity';
import { QueryDeviceDto } from './dtos/query-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepo: Repository<DeviceEntity>,
  ) {}

  // 查询设备列表（分页+筛选）
  async findAll(query: QueryDeviceDto) {
    //, request_time
    const { current, pageSize, os, device_id, typ, os_version, arch } = query;
    const offset = (current - 1) * pageSize;

    // 构建查询条件
    const queryBuilder = this.deviceRepo.createQueryBuilder('device');
    if (os) queryBuilder.andWhere('device.os = :os', { os });
    if (device_id) queryBuilder.andWhere('device.device_id = :device_id', { device_id: device_id });
    if (typ) queryBuilder.andWhere('device.typ = :typ', { typ });
    if (os_version) queryBuilder.andWhere('device.os_version = :os_version', { os_version });
    if (arch) queryBuilder.andWhere('device.arch = :arch', { arch });
    //if (request_time) queryBuilder.andWhere('device.request_time LIKE :request_time', { request_time: `%${request_time}%` });

    // 分页查询
    const [list, total] = await queryBuilder
      .skip(offset)
      .take(pageSize)
      .orderBy('device.request_time', 'DESC')
      .getManyAndCount();

    return {
      list,
      total,
      current,
      pageSize,
    };
  }

  // 删除设备信息
  async remove(id: string) {
    const device = await this.deviceRepo.findOneBy({ id });
    if (!device) throw new NotFoundException('设备记录不存在');

    await this.deviceRepo.delete(id);
    return null;
  }
}
