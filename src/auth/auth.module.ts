import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UserModule,
    JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 days'},
  })
]
})
export class AuthModule {}
