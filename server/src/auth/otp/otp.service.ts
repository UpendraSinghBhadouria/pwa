import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OtpService {
  constructor(private readonly prismaService: PrismaService) {}
  private calculateExpirationDate(): Date {
    return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
  }
  private generateRandomOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
  private isUniqueConstraintError(error: any): boolean {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      error.meta?.modelName === 'OtpRequest' &&
      Array.isArray(error.meta.target) &&
      error.meta.target.includes('phoneNumber')
    );
  }
  async sendOtp(
    phone: string,
    country: string,
  ): Promise<{ message: string } | { error: string }> {
    try {
      const otp = this.generateRandomOtp();

      // Save OTP in OtpRequest table
      await this.prismaService.otpRequest.create({
        data: {
          phoneNumber: phone,
          otp,
          otpExpiresAt: this.calculateExpirationDate(),
        },
      });

      // Create user in User table
      // Check if the user already exists with the given phone number
      const existingUser = await this.prismaService.user.findUnique({
        where: { phoneNumber: phone },
      });
      if (existingUser) {
        // Update existing user information
        await this.prismaService.user.update({
          where: { id: existingUser.id },
          data: {
            isPhoneNumberVerified: true,
          },
        });
      } else {
        // Create a new user entry
        await this.prismaService.user.create({
          data: {
            country: country,
            phoneNumber: phone,
          },
        });
      }
      // Return success message
      return { message: `OTP sent successfully. Otp: ${otp}` };
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        // Update existing OTP
        const existingOtp = await this.prismaService.otpRequest.update({
          where: { phoneNumber: phone },
          data: {
            otp: this.generateRandomOtp(),
            otpExpiresAt: this.calculateExpirationDate(),
          },
        });

        return {
          message: `OTP updated and resent successfully. New Otp: ${existingOtp.otp}`,
        };
      }
      throw error;
    }
  }
  async resendOtp(phone: string): Promise<{ message: string }> {
    // Get the existing OTP request
    const existingRequest = await this.prismaService.otpRequest.findUnique({
      where: { phoneNumber: phone },
    });

    if (existingRequest) {
      // Generate New OTP
      const otp = this.generateRandomOtp();
      // Update the existing OTP in the OtpRequest table

      await this.prismaService.otpRequest.update({
        where: { id: existingRequest.id },
        data: {
          otp: otp,
          otpExpiresAt: this.calculateExpirationDate(),
        },
      });

      // Resend OTP to the provided phone number
      return { message: `New OTP sent successfully. New Otp: ${otp}` };
    } else {
      // Handle error: No existing OTP request found for the phone number
      throw new HttpException(
        'No OTP request found for the provided phone number',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyOtp(args: {
    country: string;
    phone: string;
    otp: number;
  }): Promise<void> {
    // Get the OTP request for the provided phone number
    const otpRequest = await this.prismaService.otpRequest.findUnique({
      where: { phoneNumber: args.phone },
    });

    const currentUtcTime = new Date().toISOString();
    if (
      otpRequest?.otp === args.otp &&
      otpRequest.otpExpiresAt.getTime() > new Date(currentUtcTime).getTime()
    ) {
      // OTP is valid and not expired
      // Update user entry in User table
      await this.prismaService.user.update({
        where: {
          phoneNumber: args.phone,
        },

        data: {
          isPhoneNumberVerified: true,
        },
      });

      // Delete the OTP request entry
      await this.prismaService.otpRequest.delete({
        where: { id: otpRequest.id },
      });
    } else {
      // Handle error: Invalid or expired OTP
      throw new HttpException('Invalid or expired OTP', HttpStatus.BAD_REQUEST);
    }
  }
}
