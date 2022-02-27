import SymmetricKey from '../base/SymmetricKey';

export default deriveKey = ({ passphrase, salt }) => SymmetricKey.generate({
  passphrase,
  salt,
});
