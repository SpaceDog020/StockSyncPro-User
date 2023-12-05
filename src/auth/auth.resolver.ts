import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginUserDto } from './dto/login-auth.dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
      private authService: AuthService
  ){}


  @Query((returns) => Auth)
  async login(@Args('email') email: string, @Args('password') password: string) {
      return await this.authService.signIn({email,password} as LoginUserDto);
  }

  @Mutation((returns) => Auth)
  async register(
  @Args('password') password: string,
  @Args('email') email: string
  ) {
  
      return await this.authService.register({
          password: password,
          email:email
      });
  }
}
