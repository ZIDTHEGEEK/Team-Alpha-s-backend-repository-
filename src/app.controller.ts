import { AuthGuard } from './api/auth/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('')
export class AppController {
  constructor() {}

  @Get('')
  getRoot() {
    return 'Welcome to SUI Mail API';
  }
}
