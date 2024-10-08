import { Module } from '@nestjs/common';
import { MONGO_DB_URL } from './config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/users.module';
import { CipherService } from './shared/cipher.service';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DB_URL, {
      dbName: 'sui-dems-db',
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [CipherService],
})
export class AppModule {}
