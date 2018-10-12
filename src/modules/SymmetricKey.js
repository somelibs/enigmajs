import Settings from './Settings';
import BaseKey from './BaseKey';
import { stringToInitVector, stringToArrayBuffer } from './utils';

class SymmetricKey extends BaseKey {

  type = 'symmetric';

  static async derive(passphraseKey, salt) {
    const { algorithm } = Settings.getAlgorithmSettings('PBKDF2');
    algorithm.salt = stringToInitVector(salt);
    const { algorithm: derivedAlgorithm, usages } = Settings.getAlgorithmSettings('A256GCM');
    return crypto.subtle.deriveKey(algorithm, passphraseKey, derivedAlgorithm, false, usages);
  }

  static async generate({ passphrase, salt } = {}) {
    let cryptoKey;
    const settings = Settings.getAlgorithmSettings('A256GCM');
    const instance = new this(settings);
    if (passphrase && salt) {
      const extractable = false;
      const passphraseBuffer = stringToArrayBuffer(passphrase);
      const passphraseKey = await this.import(passphraseBuffer, 'PBKDF2');
      cryptoKey = await this.derive(passphraseKey.toCryptoKey(), salt);
    } else {
      const extractable = true;
      const { algorithm, usages } = settings;
      cryptoKey = await crypto.subtle.generateKey(algorithm, extractable, usages);
    }
    instance.setCryptoKey(cryptoKey);
    return instance;

  }

}

export default SymmetricKey;
