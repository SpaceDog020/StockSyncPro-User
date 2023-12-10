import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UserModule {}
