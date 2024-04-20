import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OtpService } from './otp/otp.service';
import { TokenService } from './token/token.service';
import * as AuthValidation from './common.validation';
import { ZodError } from 'zod';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly otpService: OtpService,
    private readonly tokenService: TokenService,
  ) {}
  private handleValidationAndErrors(
    error: any,
    defaultMessage: string,
  ): { message?: string; error?: string } {
    if (error instanceof ZodError) {
      console.log('@@ ~ error:', error);
      // Zod validation error
      const validationError = error.errors
        .map((issue) => issue.message)
        .join(', ');
      return { error: `Validation failed: ${validationError}` };
    }

    // Handle other errors appropriately
    console.error(defaultMessage, error);
    return { error: defaultMessage };
  }
  @Get('/otp/send')
  async sendOtp(
    @Query('phone') phone: string,
    country: string,
  ): Promise<{ message?: string } | { error?: string }> {
    try {
      const validatedPhone = AuthValidation.phoneValidation.parse({
        phoneNumber: phone,
      });
      const validatedCountry = AuthValidation.countryValidation.parse({
        countryCode: country,
      });
      const response = await this.otpService.sendOtp(
        validatedPhone.phoneNumber,
        validatedCountry.countryCode,
      );
      if ('message' in response) {
        return { message: response.message };
      } else {
        return {
          error:
            response.error || 'Failed to send OTP. Please try again later.',
        };
      }
    } catch (error) {
      return this.handleValidationAndErrors(error, 'Error resending OTP:');
    }
  }

  @Get('/otp/resend')
  async resendOtp(
    @Query('phone') phone: string,
  ): Promise<{ message?: string } | { error: string }> {
    try {
      const validatedData = AuthValidation.phoneValidation.parse({
        phoneNumber: phone,
      });
      await this.otpService.resendOtp(validatedData.phoneNumber);
      return { message: 'New OTP sent successfully' };
    } catch (error) {
      return this.handleValidationAndErrors(error, 'Error sending OTP:');
    }
  }

  @Post('/otp/verify')
  async verifyOtp(
    @Body()
    verificationData: {
      country: string;
      phone: string;
      otp: number;
    },
  ): Promise<{ accessToken?: string } | { error?: string }> {
    try {
      const validatedData = AuthValidation.authValidation.parse({
        countryCode: verificationData.country,
        phoneNumber: verificationData.phone,
        otp: verificationData.otp,
      });
      await this.otpService.verifyOtp({
        phone: validatedData.phoneNumber,
        country: validatedData.countryCode,
        otp: validatedData.otp,
      });

      return this.tokenService.generateTokens(verificationData.phone);
    } catch (error) {
      return this.handleValidationAndErrors(error, 'Error verifying OTP:');
    }
  }

  @Post('/login')
  async login(
    @Body() loginData: { phone: string; country: string },
  ): Promise<{ message?: string } | { error: string }> {
    try {
      const validatedPhone = AuthValidation.phoneValidation.parse({
        phoneNumber: loginData.phone,
      });
      const validatedCountry = AuthValidation.countryValidation.parse({
        countryCode: loginData.country,
      });
      // Initiate OTP verification
      const response = await this.otpService.sendOtp(
        validatedPhone.phoneNumber,
        validatedCountry.countryCode,
      );

      if ('message' in response) {
        return { message: response.message };
      } else {
        return {
          error:
            response.error || 'Failed to send OTP. Please try again later.',
        };
      }
    } catch (error) {
      return this.handleValidationAndErrors(error, 'Error initiating login:');
    }
  }
  @Post('/signout')
  async signout(
    @Body() signoutData: { phone: string },
  ): Promise<{ message?: string } | { error: string }> {
    try {
      const validatedData = AuthValidation.phoneValidation.parse({
        phoneNumber: signoutData.phone,
      });

      // Assuming you have a method in TokenService to revoke tokens
      const result = await this.tokenService.revokeTokens(
        validatedData.phoneNumber,
      );

      if (result) {
        return { message: 'Signout successful' };
      } else {
        return {
          error: 'Failed to signout. Please try again later.',
        };
      }
    } catch (error) {
      return this.handleValidationAndErrors(error, 'Error signing out:');
    }
  }
}
