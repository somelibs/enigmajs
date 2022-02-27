import AsymmetricKey from './base/AsymmetricKey';

export default createSignatureKeyPair = () => AsymmetricKey.generate('SIGN_VERIFY');
