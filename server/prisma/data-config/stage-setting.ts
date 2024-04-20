import { PrismaClient, Prisma } from '@prisma/client';

export default async function stageSetting(prisma: PrismaClient) {
  const data: Prisma.StageSettingCreateInput[] = [];
  const arrData = [
    'Formation',
    'Progression',
    'Transition',
    'Elevation',
    'Domination',
  ];

  const totalStage = 25;
  let index = 0;
  let startDay = 1;
  let endDay = 5;
  let days = 5;

  for (let i = 0; i < totalStage; i++) {
    if (i !== 0) {
      startDay = endDay + 1;
      endDay += 15;
      days = 15;
    }

    data.push({
      level: 'S' + (i + 1),
      name: arrData[index],
      startDay,
      endDay,
      days,
    });

    if ((i + 1) % 5 === 0) {
      index++;
    }
  }

  await prisma.stageSetting.createMany({
    data,
    skipDuplicates: true,
  });
}
