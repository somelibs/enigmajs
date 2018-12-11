import _ from 'lodash';
import arrayBufferToHex from 'array-buffer-to-hex';
import str2ab from 'string-to-arraybuffer';
import { stringToInitVector } from './utils';
import Random from './Random';

const getCryptoKey = (key) => {
  if (key && _.isFunction(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};

const encrypt = async (payload, { key, raw = false }) => {
  let settings; let
    ivString;
  const cryptoKey = getCryptoKey(key);
  const buffer = (_.isArrayBuffer(payload) || raw) ? payload : str2ab(encodeURI(payload));
  if (!key) throw Error('undefined key (Enigma.encrypt)');
  if (key.type === 'symmetric') {
    ivString = await Random.ivString();
    settings = _.extend(key.getAlgorithm(), { iv: stringToInitVector(ivString) });
  } else if (key.type === 'asymmetric') {
    settings = _.clone(key.getAlgorithm());
  }
  const ciphertext = await crypto.subtle.encrypt(settings, cryptoKey, buffer);
  return {
    text: raw ? ciphertext : arrayBufferToHex(ciphertext),
    iv: ivString,
  };
};

export default encrypt;
