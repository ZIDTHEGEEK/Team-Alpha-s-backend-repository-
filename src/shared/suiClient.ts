import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

export const MY_SUI_ADDRESS =
  '0xa5914546779cd81cdc5c38bc0efe2cfe9d039f60c656e51fab340696b6639f43';

export const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
