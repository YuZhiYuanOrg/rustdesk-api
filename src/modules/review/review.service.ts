import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../../entities/review.entity';
import { QueryReviewDto } from './dtos/query-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
  ) {}

  // 查询审查记录列表
  async findAll(query: QueryReviewDto) {
    const { current, pageSize, device_id, start_time, end_time, os, typ, arch, os_version, download_url } = query;
    const offset = (current - 1) * pageSize;

    const queryBuilder = this.reviewRepo.createQueryBuilder('review');
    if (device_id) queryBuilder.andWhere('review.device_id = :device_id', { device_id: device_id });
    if (start_time) queryBuilder.andWhere('review.response_time >= :startTime', { startTime: start_time });
    if (end_time) queryBuilder.andWhere('review.response_time <= :endTime', { endTime: end_time });
    if (os) queryBuilder.andWhere('review.os = :os', { os });
    if (arch) queryBuilder.andWhere('review.arch = :arch', { arch });
    if (typ) queryBuilder.andWhere('review.typ = :typ', { typ });
    if (os_version) queryBuilder.andWhere('review.os_version = :os_version', { os_version });
    if (download_url) queryBuilder.andWhere('review.download_url = :download_url', { download_url });

    const [list, total] = await queryBuilder
      .skip(offset)
      .take(pageSize)
      .orderBy('review.response_time', 'DESC')
      .getManyAndCount();

    return { list, total, current, pageSize };
  }

  // 创建审查记录（供更新请求使用）
  async create(data: Partial<ReviewEntity>) {
    const review = this.reviewRepo.create(data);
    await this.reviewRepo.save(review);
    return review;
  }
}
