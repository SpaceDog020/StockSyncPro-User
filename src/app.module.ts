import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { linkMongo } from './config/constants';


@Module({
  imports: [UserModule, AuthModule,  MongooseModule.forRoot(linkMongo.secret)
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
