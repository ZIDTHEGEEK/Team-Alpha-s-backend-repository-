import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Users & Document;

@Schema({
  timestamps: true,
})
export class Users {
  _id: string;

  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  userSalt: string;

  @Prop({ required: false })
  phone: string;

  @Prop()
  publicKey: string;

  @Prop()
  walletAddress: string;

  @Prop()
  nonce: string;

  @Prop()
  password: string;
}

export const UserModel = SchemaFactory.createForClass(Users);
