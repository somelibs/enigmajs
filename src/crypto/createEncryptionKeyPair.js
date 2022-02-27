import AsymmetricKey from '../base/AsymmetricKey';

export default createEncryptionKeyPair = () => AsymmetricKey.generate('ENCRYPT_DECRYPT');
