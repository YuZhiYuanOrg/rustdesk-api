import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'device_id', comment: '设备唯一标识' })
  device_id: string;

  @Column({ name: 'download_url', comment: '返回的下载地址' })
  download_url: string;

  @CreateDateColumn({ name: 'response_time', type: 'datetime', comment: '响应时间' })
  response_time: Date;

  @Column({ comment: '操作系统' })
  os: string;

  @Column({ name: 'os_version', comment: '系统版本' })
  os_version: string;

  @Column({ comment: '架构' })
  arch: string;

  @Column({ comment: '软件类型' })
  typ: string;
}
