import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PreqService {
  constructor(private readonly prismaService: PrismaService) {}
  async getPreQdata(userId) {
    const response = {};
    const stageHistory = await this.prismaService.stageHistory.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    if (!stageHistory) {
      throw new NotFoundException(
        `No stage history found for this userId - ${userId}`,
      );
    }
    response['testType'] = 'Mix Mode';
    response['day'] = stageHistory.day;
    response['questionStars'] = 100;
    const preQdata = {};
    //get all the question Id which are in QA history table
    const qaHistories = await this.prismaService.userQAHistory.findMany({
      where: { userId },
      select: {
        questionId: true,
      },
    });
    let attemptedQuestion = [];
    if (qaHistories.length) {
      attemptedQuestion = qaHistories.map((qa) => qa.questionId);
    }
    const questionQuery = { isActive: true };
    if (attemptedQuestion.length) {
      questionQuery['id'] = { notIn: attemptedQuestion };
    }
    // Now we will find a question which is not present in the attemptedQuestion array
    const question = await this.prismaService.question.findFirst({
      where: questionQuery,
    });
    //data related to tiers of question
    const { tier1Id, tier2Id, tier3Id } = question;
    const tier1Data = await this.prismaService.tier1.findUnique({
      where: { id: tier1Id },
    });
    const tier2Data = await this.prismaService.tier2.findUnique({
      where: { id: tier2Id },
    });
    const tier3Data = await this.prismaService.tier3.findUnique({
      where: { id: tier3Id },
    });
    preQdata['foresight'] = {
      avgTime: question.avgTime || 0,
      accuracy: question.accuracy || 0,
      timeLimit: question.timeLimit || 0,
      tier1: {
        name: tier1Data.name,
        foregroundColor: tier1Data.foregroundColor,
        backgroundColor: tier1Data.backgroundColor,
      },
      tier2: tier2Data.name,
      tier3: tier3Data.name,
    };

    //create Reward related data here
    const rewardHistory = await this.prismaService.rewardHistory.findMany({
      where: { userId },
    });
    const powerUp = [];
    const wildcard = [];
    for (const reward of rewardHistory) {
      const powerUpIds = reward?.powerUpIds || [];
      let powerUps: any;
      for (powerUps of powerUpIds) {
        const powerUpSetting =
          await this.prismaService.powerUpSetting.findUnique({
            where: { id: powerUps?.id },
          });
        if (powerUpSetting.type == 'REWARD') {
          powerUp.push({
            id: powerUps?.id,
            name: powerUpSetting.text,
            codeName: powerUpSetting.codeName,
            status: {
              isLocked: powerUps?.status?.isLocked || false,
              isConsumed: powerUps?.status?.isConsumed || true,
              nextIn: powerUps?.status?.nextIn || 20,
            },
          });
        }
        if (powerUpSetting.type == 'WILDCARD') {
          wildcard.push({
            id: powerUps?.id,
            name: powerUpSetting?.text,
            codeName: powerUpSetting?.codeName,
            status: {
              isLocked: powerUps?.status?.isLocked || false,
              isConsumed: powerUps?.status?.isConsumed || true,
              nextIn: powerUps?.status?.isConsumed || 20,
            },
          });
        }
      }
    }
    preQdata['powerUps'] = powerUp;
    preQdata['wildCrads'] = wildcard;
    response['preQ'] = preQdata;
    return response;
  }
}
