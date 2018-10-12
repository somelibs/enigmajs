import _ from 'lodash';
import arrayBufferToHex from 'array-buffer-to-hex';

import SymmetricKey from './modules/SymmetricKey';
import AsymmetricKey from './modules/AsymmetricKey';
import Settings from './modules/Settings';
import { stringToArrayBuffer, getAlgorithm } from './modules/utils';

const sign = async (payload, { key }) => {
  const cryptoKey = key.toCryptoKey(key);
  const buffer = stringToArrayBuffer(payload);
  const settings = key.getAlgorithm();
  const encryptedPayload = await crypto.subtle.sign(settings, cryptoKey, buffer);
  return arrayBufferToHex(new Uint8Array(encryptedPayload));
};

const deriveKey = ({ passphrase, salt }) => SymmetricKey.generate({
  passphrase,
  salt,
});

const createSecret = () => SymmetricKey.generate();

const createSignatureKeyPair = () => AsymmetricKey.generate('SIGN_VERIFY');

const createEncryptionKeyPair = () => AsymmetricKey.generate('ENCRYPT_DECRYPT');

const importKey = (jwk) => {
  const jsonJwk = _.isString(jwk) ? JSON.parse(jwk) : jwk;
  const algorithm = getAlgorithm(jsonJwk);
  const settings = Settings.getAlgorithmSettings(algorithm);
  if (algorithm) {
    if (settings.type === 'symmetric') {
      return SymmetricKey.import(jsonJwk);
    } if (settings.type === 'asymmetric') {
      return AsymmetricKey.import(jsonJwk);
    }
  }
};

export encrypt from './modules/encrypt';
export decrypt from './modules/decrypt';
export Random from './modules/Random';

export { sign, deriveKey, createSecret, createSignatureKeyPair, createEncryptionKeyPair, importKey };
