import { IsEmail, IsNotEmpty, IsString, Min, Validate } from 'class-validator';


export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    @Min(5)
    password: string
}
