import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('device') // 数据库表名
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid') // UUID主键
  id: string;

  @Column({ comment: '操作系统' })
  os: string;

  @Column({ name: 'os_version', comment: '系统版本' })
  os_version: string;

  @Column({ comment: '架构' })
  arch: string;

  @Column({ name: 'device_id', comment: '设备唯一标识' })
  device_id: string;

  @Column({ comment: '软件类型' })
  typ: string;

  @CreateDateColumn({ name: 'request_time', type: 'datetime', comment: '设备请求时间' })
  request_time: Date;
}
