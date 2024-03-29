import * as crypto from 'crypto';
import * as fs from 'fs';

let publicKey: crypto.KeyObject | null = null;
let privateKey: crypto.KeyObject | null = null;

const getPrivateKey = () => {
  if (privateKey) return privateKey;

  privateKey = crypto.createPrivateKey({
    key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
    format: 'pem',
    type: 'pkcs1',
  });
  return privateKey;
};

export const encrypt = (data: any) =>
  crypto.privateEncrypt(getPrivateKey(), Buffer.from(data, 'utf8')).toString('base64');

export const decrypt = (data: string) =>
  crypto.privateDecrypt(getPrivateKey(), Buffer.from(data, 'base64')).toString('utf8');

const getPublicKey = () => {
  if (publicKey) return publicKey;
  publicKey = crypto.createPublicKey({
    key: fs.readFileSync(process.env.PUBLIC_KEY_PATH),
    format: 'pem',
    type: 'pkcs1',
  });
  return publicKey;
};

export const encryptForTest = (data: any) =>
  crypto.publicEncrypt(getPublicKey(), Buffer.from(data, 'utf8')).toString('base64');

export const decryptForTest = (data: string) =>
  crypto.privateDecrypt(getPrivateKey(), Buffer.from(data, 'base64')).toString('utf8');
