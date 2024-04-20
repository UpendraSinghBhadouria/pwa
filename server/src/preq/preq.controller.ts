import { Controller, Get, Param } from '@nestjs/common';
import { PreqService } from './preq.service';

@Controller('preq')
export class PreqController {
  constructor(private readonly preqService: PreqService) {}

  @Get(':id')
  async getPreqData(@Param('id') userId: string) {
    try {
      const response = await this.preqService.getPreQdata(+userId);
      return response;
    } catch (error) {
      return error?.message;
    }
  }
}
