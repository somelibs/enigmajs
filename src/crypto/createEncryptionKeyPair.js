import AsymmetricKey from '../core/AsymmetricKey';

export default function createEncryptionKeyPair() {
  return AsymmetricKey.generate('ENCRYPT_DECRYPT');
}
