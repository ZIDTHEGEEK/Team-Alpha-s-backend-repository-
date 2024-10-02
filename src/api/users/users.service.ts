import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from 'src/models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getActiveUser(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password -nonce -userSalt');
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
