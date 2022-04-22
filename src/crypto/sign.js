import arrayBufferToHex from 'array-buffer-to-hex';
import stringToArrayBuffer from '../utils/stringToArrayBuffer';

export default async function sign(payload, { key }) {
  const cryptoKey = key.toCryptoKey(key);
  const buffer = stringToArrayBuffer(payload);
  const settings = key.getAlgorithm();
  const encryptedPayload = await crypto.subtle.sign(settings, cryptoKey, buffer);
  return arrayBufferToHex(new Uint8Array(encryptedPayload));
}
