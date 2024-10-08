import { AuthGuard } from './api/auth/auth.guard';
import { CipherService } from './shared/cipher.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('')
export class AppController {
  constructor(private readonly cipherService: CipherService) {}

  @Get('')
  getRoot() {
    return 'Welcome to SUI Mail API';
  }

  // @RequiresAdminRole()
  // @Get('generate-secrets')
  // async generateServerKeys() {
  //   const serverKeys = this.cipherService.generateUserSecretKeys();
  //   return serverKeys;
  // }
}
