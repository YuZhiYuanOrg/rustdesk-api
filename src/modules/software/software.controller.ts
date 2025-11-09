import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';
import { SoftwareService } from './software.service';
import { QuerySoftwareDto, CreateSoftwareDto, UpdateSoftwareDto } from './dtos';

@Controller('software')
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  @Get()
  async findAll(@Query() query: QuerySoftwareDto) {
    return { success: true, data: await this.softwareService.findAll(query) };
  }

  @Post()
  async create(@Body() data: CreateSoftwareDto) {
    await this.softwareService.create(data);
    return { success: true, data: null };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateSoftwareDto) {
    await this.softwareService.update(id, data);
    return { success: true, data: null };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.softwareService.remove(id);
    return { success: true, data: null };
  }
}
