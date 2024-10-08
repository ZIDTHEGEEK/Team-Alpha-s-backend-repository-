import { SuiClient } from '@mysten/sui/client';

export const PACKAGE_ID = process.env.SUI_MAIL_PACKAGE_ID;

export const suiClient = new SuiClient({ url: process.env.SUI_FULLNODE_URL });
