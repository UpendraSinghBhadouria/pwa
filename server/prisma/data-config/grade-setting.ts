import { PrismaClient, Prisma } from '@prisma/client';

export default async function gradeSetting(prisma: PrismaClient) {
  const data: Prisma.GradeSettingCreateInput[] = [];
  const arrData = [
    ['Probie', [0, 30]],
    ['Prentice', [31, 50]],
    ['Prospect', [51, 60]],
    ['Proven', [61, 70]],
    ['Proficient', [71, 80]],
    ['Paragon', [81, 90]],
    ['Phenom', [91, 95]],
    ['Prodigy', [96, 100]],
  ];

  for (const [index, value] of arrData.entries()) {
    data.push({
      level: 'G' + (index + 1),
      name: value[0] as string,
      minPercentage: value[1][0] as number,
      maxPercentage: value[1][1] as number,
    });
  }

  await prisma.gradeSetting.createMany({
    data,
    skipDuplicates: true,
  });
}
