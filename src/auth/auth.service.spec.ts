import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
      providers: [AuthService]
    })
    .overrideProvider(getModelToken(User.name))
    .useValue(jest.fn())
    .compile();

    service = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
