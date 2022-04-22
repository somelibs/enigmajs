import SymmetricKey from '../core/SymmetricKey';

export default function createSecret() {
  return SymmetricKey.generate();
}
