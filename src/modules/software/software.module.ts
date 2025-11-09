import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoftwareEntity } from '../../entities/software.entity';
import { SoftwareController } from './software.controller';
import { SoftwareService } from './software.service';

@Module({
  imports: [TypeOrmModule.forFeature([SoftwareEntity])],
  controllers: [SoftwareController],
  providers: [SoftwareService],
  exports: [SoftwareService], // 导出供UpdateModule使用
})
export class SoftwareModule {}
