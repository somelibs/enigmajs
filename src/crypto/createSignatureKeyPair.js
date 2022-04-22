import AsymmetricKey from '../core/AsymmetricKey';

export default function createSignatureKeyPair() {
  return AsymmetricKey.generate('SIGN_VERIFY');
}
