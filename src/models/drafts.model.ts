import { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DraftDocument = Drafts & Document;

@Schema({
  timestamps: true,
})
export class Drafts {
  @Prop({
    type: Types.ObjectId,
    ref: 'Users',
  })
  sender: ObjectId;

  @Prop({
    required: true,
  })
  body: string;

  @Prop({
    required: true,
  })
  aesKey: string;

  @Prop({
    required: true,
  })
  iv: string;
}

export const DraftModel = SchemaFactory.createForClass(Drafts);
