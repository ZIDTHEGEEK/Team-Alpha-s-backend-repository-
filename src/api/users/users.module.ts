import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModel, Users } from 'src/models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserModel }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}
