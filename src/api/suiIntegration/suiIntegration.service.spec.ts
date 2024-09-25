import { Injectable } from '@nestjs/common';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { MY_SUI_ADDRESS, suiClient } from 'src/shared/suiClient';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui/faucet';

@Injectable()
export class SuiIntegrationService {
  constructor() {}

  async getClientBalance() {
    const balance = (balance: any) => {
      return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
    };

    const suiBefore = await suiClient.getBalance({
      owner: MY_SUI_ADDRESS,
    });

    await requestSuiFromFaucetV1({
      host: getFaucetHost('testnet'),
      recipient: MY_SUI_ADDRESS,
    });

    const suiAfter = await suiClient.getBalance({
      owner: MY_SUI_ADDRESS,
    });

    return {
      suiBefore: balance(suiBefore),
      suiAfter: balance(suiAfter),
    };
  }
}
