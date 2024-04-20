import {
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isNumber } from 'src/utils';

@Injectable()
export class SkillsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Skills
   */
  async findAllAndCompute(value?: number | string) {
    const skills = await this.prismaService.tier3.findMany({
      where: isNumber(value) ? { id: value as number } : {},
      include: {
        tier2: {
          include: {
            tier1: true,
          },
        },
      },
    });

    if (!skills) {
      throw new NotFoundException(`Skills with id ${value} doesn't exists!`);
    }

    const skillsList = skills.reduce(
      (acc: any, item) => {
        const { tier2, ...skill } = item;
        const { tier1, ...rest } = tier2;
        const newItem = { ...skill, ...{ tier2: rest }, tier1 };
        const tier1Name = newItem.tier1.name;

        acc.result.push(newItem);
        acc.tier1TotalSkills[tier1Name] =
          (acc.tier1TotalSkills[tier1Name] || 0) + 1;

        return acc;
      },
      { result: [], tier1TotalSkills: {} },
    );

    if (value === 'ALL_SKILLS_WITH_COUNTS') {
      return {
        totalSkills: skills.length,
        skills: skillsList.result,
      };
    } else if (value === 'TIER1_TOTAL_SKILLS') {
      return skillsList.tier1TotalSkills;
    } else if (isNumber(value)) {
      return skillsList.result[0] || null;
    }
  }

  /**
   * Tier 1
   */
  async findAllTier1() {
    return this.prismaService.tier1.findMany();
  }

  async findTier1(id: number) {
    const record = await this.prismaService.tier1.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Tier1 with id ${id} doesn't exists!`);
    }

    return record;
  }

  async createTier1(createTier1Dto: any) {
    const existingRecord = await this.prismaService.tier1.findUnique({
      where: { name: createTier1Dto.name },
    });

    if (existingRecord) {
      throw new ConflictException(`${createTier1Dto.name} already exists!`);
    }

    return this.prismaService.tier1.create({
      data: createTier1Dto,
    });
  }

  async updateTier1(tier1Id: number, updateTier1Dto: any) {
    await this.findTier1(tier1Id);

    return this.prismaService.tier1.update({
      where: { id: tier1Id },
      data: {
        ...updateTier1Dto,
      },
    });
  }

  // TODO: fix
  async deleteTier1(tier1Id: number) {
    await this.findTier1(tier1Id);

    await this.prismaService.tier1.deleteMany({
      where: { id: tier1Id },
    });

    return {
      message: `Tier1 with tier1Id ${tier1Id} is deleted successfully!`,
    };
  }

  /**
   * Tier 2
   */
  async findAllTier2(tier1Id: number) {
    return this.prismaService.tier2.findMany({
      where: {
        tier1Id,
      },
    });
  }

  async findTier2(tier1Id: number, tier2Id: number) {
    const record = await this.prismaService.tier2.findUnique({
      where: {
        id: tier2Id,
        AND: {
          tier1Id,
        },
      },
    });

    if (!record) {
      throw new NotFoundException(
        `Tier2 with tier2Id ${tier2Id} doesn't exist!`,
      );
    }

    return record;
  }

  async createTier2(tier1Id: number, createTier2Dto: any) {
    await this.findTier1(tier1Id);

    const existingRecord = await this.prismaService.tier2.findUnique({
      where: { name: createTier2Dto.name },
    });

    if (existingRecord) {
      throw new ConflictException(`${createTier2Dto.name} already exists!`);
    }

    return this.prismaService.tier2.create({
      data: {
        ...createTier2Dto,
        tier1: {
          connect: {
            id: tier1Id,
          },
        },
      },
    });
  }

  async updateTier2(tier1Id: number, tier2Id: number, updateTier2Dto: any) {
    await this.findTier1(tier1Id);

    const existingRecord = await this.prismaService.tier2.findUnique({
      where: { id: tier2Id },
    });

    if (!existingRecord) {
      throw new NotFoundException(`Tier3 with id ${tier2Id} doesn't exists!`);
    }

    return this.prismaService.tier2.update({
      where: { id: tier2Id },
      data: {
        ...updateTier2Dto,
      },
    });
  }

  // TODO: fix
  async deleteTier2(tier1Id: number, tier2Id: number) {
    await this.findTier1(tier1Id);

    const existingRecord = await this.prismaService.tier2.findUnique({
      where: { id: tier2Id },
    });

    if (!existingRecord) {
      throw new NotFoundException(
        `Tier2 with tier2Id ${tier2Id} doesn't exists!`,
      );
    }

    const deleteTier3 = this.prismaService.tier3.deleteMany({
      where: { tier2Id },
    });

    const deleteTier2 = this.prismaService.tier2.delete({
      where: { id: tier2Id },
    });

    await this.prismaService.$transaction([deleteTier3, deleteTier2]);

    return {
      message: `Tier2 with tier2Id ${tier2Id} is deleted successfully!`,
    };
  }

  /**
   * Tier 3
   */
  async findAllTier3(tier1Id: number, tier2Id: number) {
    return this.prismaService.tier3.findMany({
      where: {
        tier2Id,
      },
    });
  }

  async findTier3(tier1Id: number, tier2Id: number, tier3Id: number) {
    const record = await this.prismaService.tier3.findUnique({
      where: {
        id: tier3Id,
        AND: {
          tier2Id,
        },
      },
    });

    if (!record) {
      throw new NotFoundException(
        `Tier3 with tier3Id ${tier2Id} doesn't exist!`,
      );
    }

    return record;
  }

  async createTier3(tier1Id: number, tier2Id: number, createTier3Dto: any) {
    await this.findTier1(tier1Id);
    await this.findTier2(tier1Id, tier2Id);

    const existingRecord = await this.prismaService.tier3.findUnique({
      where: { name: createTier3Dto.name },
    });

    if (existingRecord) {
      throw new ConflictException(`${createTier3Dto.name} already exists!`);
    }

    return this.prismaService.tier3.create({
      data: {
        ...createTier3Dto,
        tier2: {
          connect: {
            id: tier2Id,
          },
        },
      },
    });
  }

  async updateTier3(
    tier1Id: number,
    tier2Id: number,
    tier3Id: number,
    updateTier3Dto,
  ) {
    await this.findTier1(tier1Id);
    await this.findTier2(tier1Id, tier2Id);

    const existingRecord = await this.prismaService.tier3.findUnique({
      where: { id: tier3Id },
    });

    if (!existingRecord) {
      throw new NotFoundException(`Tier3 with id ${tier3Id} doesn't exists!`);
    }

    return this.prismaService.tier3.update({
      where: { id: tier3Id },
      data: {
        ...updateTier3Dto,
      },
    });
  }

  async updateIsActiveTier3(
    tier1Id: number,
    tier2Id: number,
    tier3Id: number,
    updateIsActiveTier3,
  ) {
    await this.findTier1(tier1Id);
    await this.findTier2(tier1Id, tier2Id);

    const existingRecord = await this.prismaService.tier3.findUnique({
      where: { id: tier3Id },
    });

    if (!existingRecord) {
      throw new NotFoundException(`Tier3 with id ${tier3Id} doesn't exists!`);
    }

    return this.prismaService.tier3.update({
      where: { id: tier3Id },
      data: {
        ...updateIsActiveTier3,
      },
    });
  }

  async deleteTier3(tier1Id: number, tier2Id: number, tier3Id: number) {
    await this.findTier1(tier1Id);
    await this.findTier2(tier1Id, tier2Id);

    const existingRecord = await this.prismaService.tier3.findUnique({
      where: { id: tier3Id },
    });

    if (!existingRecord) {
      throw new NotFoundException(`Tier3 with id ${tier3Id} doesn't exists!`);
    }

    await this.prismaService.tier3.delete({
      where: { id: tier3Id },
    });

    return {
      message: `Tier3 with id ${tier3Id} is deleted successfully!`,
    };
  }
}
