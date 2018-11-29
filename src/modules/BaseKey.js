import _ from 'lodash';
import uuid from 'uuid';
import Settings from './Settings';

class BaseKey {

  constructor({ type, algorithm } = {}) {
    this.uuid = uuid();
    this.type = type;
    this.algorithm = algorithm;
  }

  toCryptoKey() {
    return this.cryptoKey;
  }

  setCryptoKey(cryptoKey) {
    this.cryptoKey = cryptoKey;
  }

  async toJwk() {
    try {
      return await crypto.subtle.exportKey('jwk', this.cryptoKey);
    } catch (error) {
      return null;
    }
  }

  getAlgorithm() {
    return _.clone(_.extend(this.algorithm, this.cryptoKey.algorithm));
  }

  static async import(key, algorithmName = null) {
    let settings;
    let type;
    let keyData;
    let usages;
    if (_.isString(key) || _.isPlainObject(key)) {
      keyData = _.isString(key) ? JSON.parse(key) : key;
      settings = Settings.getAlgorithmSettings((keyData.alg ? keyData.alg : keyData.crv));
      type = 'jwk';
      usages = keyData.key_ops;
    } else {
      keyData = key;
      settings = Settings.getAlgorithmSettings(algorithmName);
      type = 'raw';
      ({ usages } = settings);
    }
    const extractable = false;
    const { algorithm } = settings;
    const instance = new this(settings);
    const cryptoKey = await crypto.subtle.importKey(type, keyData, algorithm, extractable, usages);
    instance.setCryptoKey(cryptoKey);
    return instance;
  }

}

export default BaseKey;
