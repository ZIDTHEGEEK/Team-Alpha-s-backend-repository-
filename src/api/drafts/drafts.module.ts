import { Module } from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DraftsController } from './drafts.controller';
import { DraftModel, Drafts } from 'src/models/drafts.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drafts.name, schema: DraftModel }]),
  ],
  controllers: [DraftsController],
  providers: [DraftsService],
})
export class DraftsModule {}
