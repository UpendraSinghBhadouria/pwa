import { PrismaClient } from '@prisma/client';
import user from './data-config/user';
import facetsSetting from './data-config/facets-setting';
import stageSetting from './data-config/stage-setting';
import gradeSetting from './data-config/grade-setting';
import s1QuestionSetting from './data-config/s1-question-setting';

const prisma = new PrismaClient();

async function main() {
  await user(prisma);

  // Settings data
  await facetsSetting(prisma);
  await stageSetting(prisma);
  await gradeSetting(prisma);
  await s1QuestionSetting(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
