import BaseKey from './BaseKey';
import Settings from './Settings';

class AsymmetricKey extends BaseKey {

  type = 'asymmetric';

  static async generate(type) {
    let settings;
    if (type === 'SIGN_VERIFY') {
      settings = Settings.getAlgorithmSettings('ECDSA');
    } else if (type === 'ENCRYPT_DECRYPT') {
      settings = Settings.getAlgorithmSettings('RSA-OAEP');
    }
    const extractable = true;
    const { algorithm, usages } = settings;
    const publicKey = new AsymmetricKey(settings);
    const privateKey = new AsymmetricKey(settings);
    const keyPair = await crypto.subtle.generateKey(algorithm, extractable, usages);
    publicKey.setCryptoKey(keyPair.publicKey);
    privateKey.setCryptoKey(keyPair.privateKey);
    return { publicKey, privateKey };
  }

}

export default AsymmetricKey;
