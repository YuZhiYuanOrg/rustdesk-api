import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoftwareModule } from '../software/software.module';
import { ReviewModule } from '../review/review.module';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { DeviceEntity } from '../../entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity]), SoftwareModule, ReviewModule],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
