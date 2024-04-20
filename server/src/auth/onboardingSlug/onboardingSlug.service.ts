import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OnboardingSlugService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateSlug(
    phoneNumber: string,
    slug: string,
  ): Promise<{ message: string } | { error: string }> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          phoneNumber: phoneNumber,
        },
        data: {
          onboardingSlug: slug,
        },
      });

      if (!user) {
        // Handle the case where the user is not found
        throw new Error('User not found');
      }

      return { message: `User updated successfully.` };
    } catch (error) {
      return {
        error: `Failed to update user.`,
      };
    }
  }
}
