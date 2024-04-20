import { Module } from '@nestjs/common';
import { OtpModule } from './otp/otp.module';
import { TokenModule } from './token/token.module';
import { AuthController } from './auth.controller';
import { OnboardingSlugModule } from './onboardingSlug/onboardingSlug.module';

@Module({
  imports: [OtpModule, TokenModule, OnboardingSlugModule],
  controllers: [AuthController],
})
export class AuthModule {}
