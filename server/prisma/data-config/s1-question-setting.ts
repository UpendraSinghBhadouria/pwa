import { PrismaClient, Prisma } from '@prisma/client';

export default async function s1QuestionSetting(prisma: PrismaClient) {
  const data: Prisma.S1QuestionSettingCreateInput[] = [
    {
      day: 1,
      selection1: {
        tier2Id: 24,
        tier3Count: 3,
      },
      selection2: {
        tier2Id: 29,
        tier3Count: 3,
      },
      selection3: {
        tier2Id: 5,
        tier3Count: 10,
      },
      fs: 7,
      as: 7,
      cs: null,
      es: 4,
      ts: null,
      ss: 2,
    },
    {
      day: 2,
      selection1: {
        tier2Id: 14,
        tier3Count: 3,
      },
      selection2: {
        tier2Id: 26,
        tier3Count: 3,
      },
      selection3: {
        tier2Id: 6,
        tier3Count: 10,
      },
      fs: 7,
      as: 7,
      cs: 4,
      es: null,
      ts: null,
      ss: 2,
    },
    {
      day: 3,
      selection1: {
        tier2Id: 30,
        tier3Count: 3,
      },
      selection2: {
        tier2Id: 18,
        tier3Count: 3,
      },
      selection3: {
        tier2Id: 7,
        tier3Count: 10,
      },
      fs: 6,
      as: 6,
      cs: null,
      es: 3,
      ts: 3,
      ss: 2,
    },
    {
      day: 4,
      selection1: {
        tier2Id: 20,
        tier3Count: 3,
      },
      selection2: {
        tier2Id: 22,
        tier3Count: 3,
      },
      selection3: {
        tier2Id: 8,
        tier3Count: 10,
      },
      fs: 6,
      as: 6,
      cs: 3,
      es: null,
      ts: 3,
      ss: 2,
    },
    {
      day: 5,
      selection1: {
        tier2Id: 1,
        tier3Count: 3,
      },
      selection2: {
        tier2Id: 2,
        tier3Count: 3,
      },
      selection3: {
        tier2Id: 9,
        tier3Count: 10,
      },
      fs: 4,
      as: 4,
      cs: 2,
      es: 2,
      ts: 6,
      ss: 2,
    },
  ];

  await prisma.s1QuestionSetting.createMany({
    data,
    skipDuplicates: true,
  });
}
