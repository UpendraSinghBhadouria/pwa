import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StageService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStageHistory(userId: number) {
    // Create a new StageHistory entry

    return this.prismaService.stageHistory.create({
      data: {
        userId,
        day: 0,
        stageId: 1,
        gradeId: 1,
        testStatus: null,
        questionTypes: [],
        totalQuestions: 10,
        totalCorrectAnswers: 0,
        totalTimeSpent: 0,
        rewardsCollected: [],
        rewardConsumed: [],
        repeatedQuestion: 0,
        totalScore: 0,
      },
    });
  }

  async getStageHistory(userId: number) {
    // Retrieve latest StageHistory for a user
    return this.prismaService.stageHistory.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
