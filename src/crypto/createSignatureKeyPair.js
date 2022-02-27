import AsymmetricKey from '../core/AsymmetricKey';

export default createSignatureKeyPair = () => AsymmetricKey.generate('SIGN_VERIFY');
