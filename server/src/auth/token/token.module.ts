import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaModule } from 'src/prisma/prisma.module'; // Import your Prisma module
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
