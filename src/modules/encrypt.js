import _ from 'lodash';
import arrayBufferToHex from 'array-buffer-to-hex';
import { stringToArrayBuffer, stringToInitVector } from './utils';
import Random from './Random';

const getCryptoKey = (key) => {
  if (key && _.isFunction(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};

const encrypt = async (payload, { key, raw = false }) => {
  const cryptoKey = getCryptoKey(key);
  const buffer = _.isArrayBuffer(payload) ? payload : stringToArrayBuffer(payload);
  if (!key) throw Error('undefined key (Enigma.encrypt)');
  if (key.type === 'symmetric') {
    const ivString = await Random.ivString();
    const iv = stringToInitVector(ivString);
    const settings = _.extend(key.getAlgorithm(), { iv });
    const ciphertext = await crypto.subtle.encrypt(settings, cryptoKey, buffer);
    return {
      text: raw ? ciphertext : arrayBufferToHex(ciphertext),
      iv: ivString,
    };
  } if (key.type === 'asymmetric') {
    const settings = _.clone(key.getAlgorithm());
    const ciphertext = await crypto.subtle.encrypt(settings, cryptoKey, buffer);
    return {
      text: raw ? ciphertext : arrayBufferToHex(ciphertext),
    };
  }
};

export default encrypt;
