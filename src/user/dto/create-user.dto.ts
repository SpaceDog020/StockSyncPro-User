import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    password: string
    @IsNotEmpty()
    @IsEmail()
    email: string
}
