import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { PrismaModule } from 'src/prisma/prisma.module'; // Import your Prisma module

@Module({
  imports: [PrismaModule], // Import your Prisma module here
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
