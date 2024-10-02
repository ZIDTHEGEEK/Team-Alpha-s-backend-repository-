import * as crypto from 'crypto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JWT_SECRET } from 'src/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserDocument, Users } from 'src/models/users.model';
import { ConflictException, Injectable } from '@nestjs/common';
import { jwtToAddress } from '@mysten/zklogin';
import { LoginUserDto } from './dtos/LoginUserDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  generateSalt() {
    const saltHex = crypto.randomBytes(16).toString('hex');
    const saltBigInt = BigInt(`0x${saltHex}`);
    return saltBigInt;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, fullname, username, phone, publicKey, nonce } =
      createUserDto;

    if (await this.userModel.findOne({ email })) {
      throw new ConflictException('You already have an account');
    }

    const userSalt = this.generateSalt();
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserData = {
      email,
      nonce,
      fullname,
      username,
      userSalt,
      publicKey,
      walletAddress: '',
      password: hashedPassword,
      phone: phone ? phone : '',
    };

    const user = await this.userModel.create(createUserData);
    const token = await this.signForJwtAddress(user, nonce);

    const zkLoginUserAddress = jwtToAddress(token, userSalt);

    await this.userModel.updateOne(
      { email },
      { walletAddress: zkLoginUserAddress },
    );

    return {
      id: user._id,
      address: zkLoginUserAddress,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ConflictException('Invalid password');
    }

    const token = await this.signForLogin(user);
    const { fullname, username, walletAddress, phone } = user;

    return { token, user: { email, fullname, username, walletAddress, phone } };
  }

  async signForJwtAddress(user: Users, nonce: string): Promise<string> {
    const payload = {
      nonce,
      sub: user._id,
      iss: 'http://localhost:4000',
      aud: 'http://localhost:4000',
      // issued at
      iat: Math.floor(Date.now() / 1000),
      jti: crypto.randomBytes(16).toString('hex'),
    };

    return this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      secret: JWT_SECRET,
    });
  }

  async signForLogin(user: Users): Promise<string> {
    const payload = {
      id: user._id,
      email: user.email,
      walletAddress: user.walletAddress,
      iat: Math.floor(Date.now() / 1000),
      jti: crypto.randomBytes(16).toString('hex'),
    };

    return this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      secret: JWT_SECRET,
    });
  }
}
