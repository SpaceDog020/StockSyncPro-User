import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePassword, encryptPassword } from 'src/validation/encrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { validatePassword } from 'src/validation/isStrongPassword';
import { LoginUserDto } from './dto/login-auth.dto';
import { User } from 'src/schema/user.schema';
import { CredentialsRequest, LoginUserResponse, RegisterUserResponse } from 'src/user/user.pb';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  

  async signIn(dataLogin: CredentialsRequest): Promise<LoginUserResponse> {
    var response: LoginUserResponse = {token: "", error: undefined};
    if(!validatePassword(dataLogin.password)){
      response.error = {message: 'Contraseña concumple con los requerimientos'};
      //throw new HttpException('Contraseña concumple con los requerimientos', HttpStatus.UNAUTHORIZED);
      return response;
    }

    const user: User = await this.userService.findOne(dataLogin.email);
    if(!await comparePassword(dataLogin.password, user.password)){
      response.error = {message: 'No autorizado, revisar credenciales'};
      //throw new HttpException('No autorizado, revisar credenciales', HttpStatus.UNAUTHORIZED);
      return response;
    }

    const payload = { sub: user.email };

    response.token = await this.jwtService.signAsync(payload);
    return response;
  }

  async register(newUser: CredentialsRequest): Promise<RegisterUserResponse> {
    var response: RegisterUserResponse = {succcess: false, error: undefined};
    if(!validatePassword(newUser.password)){
      response.error = {message: 'Contraseña concumple con los requerimientos'};
      //throw new HttpException('Contraseña concumple con los requerimientos', HttpStatus.UNAUTHORIZED);
      return response;
    }

    newUser.password = await encryptPassword(newUser.password);

    const user: User = await this.userService.createUser(newUser);

    if(user){
      response.succcess = true;
    }
    return response;
  }

}
