import { Module } from '@nestjs/common';
import { OnboardingSlugService } from './onboardingSlug.service';
import { PrismaModule } from 'src/prisma/prisma.module'; // Import your Prisma module

@Module({
  imports: [PrismaModule],
  providers: [OnboardingSlugService],
  exports: [OnboardingSlugService],
})
export class OnboardingSlugModule {}
