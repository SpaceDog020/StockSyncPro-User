import { Injectable } from '@nestjs/common';
import { comparePassword, encryptPassword } from '../validation/encrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../validation/isStrongPassword';
import { User } from '../schema/user.schema';
import { CredentialsRequest, LoginUserResponse, RegisterUserResponse } from '../user/user.pb';

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
      return response;
    }

    const user: User = await this.userService.findOne(dataLogin.email);
    if(!await comparePassword(dataLogin.password, user.password)){
      response.error = {message: 'No autorizado, revisar credenciales'};
      return response;
    }

    const payload = { sub: user.email };

    response.token = await this.jwtService.signAsync(payload);
    return response;
  }

  async register(newUser: CredentialsRequest): Promise<RegisterUserResponse> {
    var response: RegisterUserResponse = {success: false, error: undefined};
    if(!validatePassword(newUser.password)){
      response.error = {message: 'Contraseña no cumple con los requerimientos'};
      //throw new HttpException('Contraseña concumple con los requerimientos', HttpStatus.UNAUTHORIZED);
      return response;
    }

    newUser.password = await encryptPassword(newUser.password);
    try{
      const user: User = await this.userService.createUser({email: newUser.email, password: newUser.password});
      if(user){
        response.success = true;
      }
      return response;
    }catch{
      response.error = {message: 'Error al registrar usuario'};
      return response;
    }
    
  }

}
