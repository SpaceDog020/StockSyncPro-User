import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from './user/user.pb';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5003',
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/user.proto')
      }
    }
  );
  await app.listen();
  console.log("[*] Awaiting GRPC requests");
}
bootstrap();
