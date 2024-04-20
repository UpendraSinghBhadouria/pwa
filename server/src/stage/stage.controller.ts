// stage-history.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { StageService } from './stage.service';

@Controller('stage')
export class StageController {
  constructor(private readonly stageHistoryService: StageService) {}

  @Get(':userId')
  async getOrCreateStageHistory(@Param('userId') userId: number) {
    // Check if StageHistory exists for the given user
    let stageHistory = await this.stageHistoryService.getStageHistory(userId);

    // If StageHistory doesn't exist, create one - for now with default values
    if (!stageHistory) {
      stageHistory = await this.stageHistoryService.createStageHistory(userId);
    }

    return stageHistory;
  }
}
