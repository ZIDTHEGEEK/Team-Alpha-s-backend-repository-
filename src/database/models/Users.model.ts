import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Users & Document;

@Schema({
  timestamps: true,
})
export class Users {
  _id: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  phone: string;
}

export const UserModel = SchemaFactory.createForClass(Users);
