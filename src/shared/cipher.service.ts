import { Injectable } from '@nestjs/common';
import { generateKeyPairSync } from 'node:crypto';

@Injectable()
export class CipherService {
  generateUserSecretKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return { privateKey, publicKey };
  }
}
