import { Controller, Post, Body } from '@nestjs/common';
import { UpdateService } from './update.service';
import { DeviceUpdateRequestDto } from './dtos/device-update-request.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Public()
  @Post('request')
  async handleRequest(@Body() data: DeviceUpdateRequestDto) {
    const result = await this.updateService.handleUpdateRequest(data);
    return { success: true, data: result };
  }
}
