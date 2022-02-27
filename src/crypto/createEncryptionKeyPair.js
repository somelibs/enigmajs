import AsymmetricKey from '../core/AsymmetricKey';

export default createEncryptionKeyPair = () => AsymmetricKey.generate('ENCRYPT_DECRYPT');
