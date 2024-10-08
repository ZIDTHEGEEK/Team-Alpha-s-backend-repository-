import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from 'src/models/users.model';
import { UpdateUserDto } from './dtos/updateUserDto';

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

  async updateActiveUser(userId: string, updateUserDto: UpdateUserDto) {
    if (await this.userModel.findOne({ email: updateUserDto.email })) {
      throw new ConflictException('You already have an account');
    }

    return await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: { ...updateUserDto },
      },
      {
        new: true,
      },
    );
  }

  async getUserWalletAddressByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('walletAddress');

    if (!user) throw new NotFoundException();

    return user.walletAddress;
  }
}
