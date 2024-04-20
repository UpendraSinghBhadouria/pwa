import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(phone: string): Promise<{ accessToken: string }> {
    // Get the user by phone number (assuming you have a getUserByPhone method in your userService)
    const user = await this.prismaService.user.findUnique({
      where: { phoneNumber: phone },
    });

    if (user) {
      // Check if a session for the user already exists
      const existingSession = await this.prismaService.session.findUnique({
        where: { userId: user.id },
      });

      if (existingSession) {
        // Update the existing session
        await this.prismaService.session.update({
          where: { id: existingSession.id },
          data: {
            token: this.jwtService.sign({ sub: user.id }),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
          },
        });
      } else {
        // Create a new session entry
        const accessToken = this.jwtService.sign({ sub: user.id });

        await this.prismaService.session.create({
          data: {
            userId: user.id,
            token: accessToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
          },
        });

        return { accessToken };
      }
    } else {
      // Handle error: User not found
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async revokeTokens(
    phone: string,
  ): Promise<{ message: string } | { error: string }> {
    // Get the user by phone number (assuming you have a getUserByPhone method in your userService)
    const user = await this.prismaService.user.findUnique({
      where: { phoneNumber: phone },
    });

    if (user) {
      // Generate an access token using the JWT service
      // const accessToken = this.jwtService.unSign({ sub: user.id });

      // Save the token in the Session table
      await this.prismaService.session.delete({
        where: { userId: user.id },
      });

      return { message: 'true' };
    } else {
      // Handle error: User not found
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
