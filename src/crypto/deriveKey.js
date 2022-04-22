import SymmetricKey from '../core/SymmetricKey';

export default function deriveKey({ passphrase, salt }) {
  return SymmetricKey.generate({
    passphrase,
    salt,
  });
}
