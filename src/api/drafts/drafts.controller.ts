import { AuthGuard } from '../auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { CreateDraftDto } from './dtos/CreateDraftDto';
import { UpdateDraftDto } from './dtos/UpdateDraftDto';

@Controller('drafts')
@UseGuards(AuthGuard)
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @Post('')
  async createDraft(@Body() createDraftDto: CreateDraftDto) {
    const draft = await this.draftsService.createDraft(createDraftDto);
    return draft;
  }

  @Get('sender/:id')
  async getDraftForUser(@Param('id') id: string) {
    const drafts = await this.draftsService.getDraftsForUser(id);
    return drafts;
  }

  @Put(':id')
  async updateDraft(
    @Param('id') id: string,
    @Body() updateDraftDto: UpdateDraftDto,
  ) {
    const draft = await this.draftsService.updateDraft(id, updateDraftDto);
    return draft;
  }

  @Delete(':id')
  async deleteDraft(@Param('id') id: string) {
    const draft = await this.draftsService.deleteDraft(id);
    return draft;
  }
}
