import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoftwareEntity } from '../../entities/software.entity';
import { QuerySoftwareDto, CreateSoftwareDto, UpdateSoftwareDto } from './dtos';

@Injectable()
export class SoftwareService {
  constructor(
    @InjectRepository(SoftwareEntity)
    private readonly softwareRepo: Repository<SoftwareEntity>,
  ) {}

  // 查询软件配置列表
  async findAll(query: QuerySoftwareDto) {
    const { current, pageSize, os, arch, typ } = query;
    const offset = (current - 1) * pageSize;

    const queryBuilder = this.softwareRepo.createQueryBuilder('software');
    if (os) queryBuilder.andWhere('software.os = :os', { os });
    if (arch) queryBuilder.andWhere('software.arch = :arch', { arch });
    if (typ) queryBuilder.andWhere('software.typ = :typ', { typ });

    const [list, total] = await queryBuilder
      .skip(offset)
      .take(pageSize)
      .orderBy('software.updatedAt', 'DESC')
      .getManyAndCount();

    return { list, total, current, pageSize };
  }

  // 新增软件配置
  async create(data: CreateSoftwareDto) {
    const software = this.softwareRepo.create({
      os: data.os,
      os_version: data.os_version,
      arch: data.arch,
      typ: data.typ,
      downloadUrl: data.download_url,
      description: data.description,
    });
    await this.softwareRepo.save(software);
    return null;
  }

  // 更新软件配置
  async update(id: string, data: UpdateSoftwareDto) {
    const software = await this.softwareRepo.findOneBy({ id });
    if (!software) throw new NotFoundException('配置记录不存在');

    // 仅更新传入的字段
    const updateData = {};
    if (data.os) updateData['os'] = data.os;
    if (data.os_version) updateData['os_version'] = data.os_version;
    if (data.arch) updateData['arch'] = data.arch;
    if (data.typ) updateData['typ'] = data.typ;
    if (data.download_url) updateData['downloadUrl'] = data.download_url;
    if (data.description !== undefined) updateData['description'] = data.description;

    await this.softwareRepo.update(id, updateData);
    return null;
  }

  // 删除软件配置
  async remove(id: string) {
    const software = await this.softwareRepo.findOneBy({ id });
    if (!software) throw new NotFoundException('配置记录不存在');

    await this.softwareRepo.delete(id);
    return null;
  }

  // 按设备信息匹配软件配置（供更新请求使用）
  async findMatch(os: string, os_version: string, arch: string, typ: string) {
    return this.softwareRepo.findOne({
      where: { os, os_version, arch, typ },
    });
  }
}
