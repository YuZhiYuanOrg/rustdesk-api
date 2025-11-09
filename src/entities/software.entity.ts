import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('software')
export class SoftwareEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '操作系统' })
  os: string;

  @Column({ name: 'os_version', comment: '系统版本' })
  os_version: string;

  @Column({ comment: '架构' })
  arch: string;

  @Column({ comment: '软件类型' })
  typ: string;

  @Column({ name: 'download_url', comment: '软件下载地址' })
  download_url: string;

  @Column({ comment: '配置描述', nullable: true })
  description?: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', comment: '最后更新时间' })
  updated_at: Date;
}
