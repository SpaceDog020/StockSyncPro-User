import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePassword, encryptPassword } from 'src/validation/encrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { validatePassword } from 'src/validation/isStrongPassword';
import { LoginUserDto } from './dto/login-auth.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  

  async signIn(dataLogin: LoginUserDto): Promise<any> {
    if(!validatePassword(dataLogin.password)){
      throw new HttpException('Contraseña concumple con los requerimientos', HttpStatus.UNAUTHORIZED);
    }

    const user: User = await this.userService.findOne(dataLogin.email);
    if(!await comparePassword(dataLogin.password, user.password)){
      throw new HttpException('No autorizado, revisar credenciales', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(newUser: CreateUserDto): Promise<any> {
    if(!validatePassword(newUser.password)){
      throw new HttpException('Contraseña concumple con los requerimientos', HttpStatus.UNAUTHORIZED);
    }

    newUser.password = await encryptPassword(newUser.password);

    const user: User = await this.userService.createUser(newUser);

    const payload = { sub: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
