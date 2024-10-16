import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDraftDto } from './dtos/CreateDraftDto';
import { UpdateDraftDto } from './dtos/UpdateDraftDto';
import { DraftDocument, Drafts } from 'src/models/drafts.model';

@Injectable()
export class DraftsService {
  constructor(
    @InjectModel(Drafts.name)
    private readonly draftsModel: Model<DraftDocument>,
  ) {}

  async createDraft(createDraftDto: CreateDraftDto) {
    const draft = await this.draftsModel.create(createDraftDto);
    return draft;
  }

  async getDraftsForUser(userId: string) {
    const drafts = await this.draftsModel.find({
      sender: userId,
    });

    return drafts;
  }

  async updateDraft(id: string, updateDraftDto: UpdateDraftDto) {
    return await this.draftsModel.findByIdAndUpdate(
      id,
      {
        $set: updateDraftDto,
      },
      { new: true },
    );
  }

  async deleteDraft(id: string) {
    return await this.draftsModel.findByIdAndDelete(id);
  }
}
