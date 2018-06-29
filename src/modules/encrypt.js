import _ from 'lodash';
import arrayBufferToHex from 'array-buffer-to-hex';
import { stringToArrayBuffer, stringToInitVector } from './utils';
import Random from './Random';

const encrypt = async (payload, { key }) => {
  const cryptoKey = key.toCryptoKey(key);
  const buffer = stringToArrayBuffer(payload);
  if (key.type === 'symmetric') {
    const ivString = await Random.ivString();
    const iv = stringToInitVector(ivString);
    const settings = _.extend(key.getAlgorithm(), { iv });
    const ciphertext = await crypto.subtle.encrypt(settings, cryptoKey, buffer);
    return {
      text: arrayBufferToHex(new Uint8Array(ciphertext)),
      iv: ivString,
    };
  } if (key.type === 'asymmetric') {
    const settings = _.clone(key.getAlgorithm());
    const ciphertext = await crypto.subtle.encrypt(settings, cryptoKey, buffer);
    return {
      text: arrayBufferToHex(new Uint8Array(ciphertext)),
    };
  }
};

export default encrypt;
