import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async findOne(email: string) {
        return await this.userModel.findOne({ email });
    }

    async createUser(newUser: CreateUserDto) {
        const createdUser = await this.userModel.create(newUser);
        return createdUser;
    }
    
}
