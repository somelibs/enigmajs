import _ from 'lodash';
import getAlgorithm from '../utils/getAlgorithm';
import Settings from '../core/Settings';
import SymmetricKey from '../core/SymmetricKey';
import AsymmetricKey from '../core/AsymmetricKey';

export default function importKey(jwk) {
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
}
