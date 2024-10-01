import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { SuiIntegrationService } from './suiIntegration.service';

@Controller('sui-integration')
export class SuiIntegrationController {
  constructor(private readonly suiIntegrationService: SuiIntegrationService) {}

  @Get('request-sui-from-faucet/:address')
  async getRequestedFaucet(
    @Param('address') address: string,
    @Res() res: Response,
  ) {
    await this.suiIntegrationService.getRequestSuiFromFaucet(address);
    return res.status(200).send('SUI requested successfully');
  }
}
