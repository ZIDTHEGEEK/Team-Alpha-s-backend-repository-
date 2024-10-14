import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/metadata';

export type UserDocument = Users & Document;

@Schema({
  timestamps: true,
})
export class Users {
  _id: string;

  @Prop({ required: false })
  fullname: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  walletAddress: string;

  @Prop({ default: Role.STANDARD, enum: Role })
  role: Role;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  addressSecretKey: string;
}

export const UserModel = SchemaFactory.createForClass(Users);
