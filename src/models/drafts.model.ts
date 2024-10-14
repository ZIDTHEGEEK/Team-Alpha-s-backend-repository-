import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Drafts {
  @Prop({
    type: Types.ObjectId,
    ref: 'Users',
  })
  sender: ObjectId;
}
