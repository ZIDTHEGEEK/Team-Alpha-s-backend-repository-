import { Module } from '@nestjs/common';
import { MONGO_DB_URL } from './config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_DB_URL, {
      dbName: 'sui-dems-db',
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
