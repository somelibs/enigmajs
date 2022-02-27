import SymmetricKey from '../core/SymmetricKey';

export default deriveKey = ({ passphrase, salt }) => SymmetricKey.generate({
  passphrase,
  salt,
});
