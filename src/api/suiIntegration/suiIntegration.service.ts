import { Injectable } from '@nestjs/common';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui/faucet';

@Injectable()
export class SuiIntegrationService {
  constructor() {}

  async getRequestSuiFromFaucet(suiAddress: string) {
    return await requestSuiFromFaucetV1({
      host: getFaucetHost('localnet'),
      recipient: suiAddress,
    });
  }
}
