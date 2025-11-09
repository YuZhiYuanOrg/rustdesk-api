import { Controller, Get, Delete, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { QueryDeviceDto } from './dtos/query-device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async findAll(@Query() query: QueryDeviceDto) {
    return { success: true, data: await this.deviceService.findAll(query) };
  }

  @Delete()
  async remove(@Query('id') id: string) {
    await this.deviceService.remove(id);
    return { success: true, data: null };
  }
}
