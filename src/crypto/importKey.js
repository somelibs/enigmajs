import _ from 'lodash';
import getAlgorithm from '../utils/getAlgorithm';
import Settings from './base/Settings';
import SymmetricKey from './base/SymmetricKey';
import AsymmetricKey from './base/AsymmetricKey';

export default importKey = (jwk) => {
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
