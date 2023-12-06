import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { linkMongo } from './config/constants';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { PruebaModule } from './prueba/prueba.module';


@Module({
  imports: [UserModule, AuthModule,  MongooseModule.forRoot(linkMongo.secret),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: false,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  }),
    PruebaModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
