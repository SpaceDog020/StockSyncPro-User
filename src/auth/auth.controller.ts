
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CredentialsRequest, LoginUserResponse, RegisterUserResponse } from 'src/user/user.pb';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(data: CredentialsRequest): Promise<LoginUserResponse> {
    return this.authService.signIn(data);
  }

  @GrpcMethod('AuthService', 'Register')
  async register(data: CredentialsRequest): Promise<RegisterUserResponse> {
    return this.authService.register(data);
  }
}