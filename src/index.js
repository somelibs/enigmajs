/* ------------------- Utils ------------------- */

import stringToArrayBuffer from './utils/stringToArrayBuffer';

/* ------------------- Crypto ------------------- */

import createEncryptionKeyPair from './crypto/createEncryptionKeyPair';
import createSignatureKeyPair from './crypto/createSignatureKeyPair';
import createSecret from './crypto/createSecret';
import deriveKey from './crypto/deriveKey';
import importKey from './crypto/importKey';
import sign from './crypto/sign';

/* ------------------ Wrappers ------------------ */

import SymmetricKey from './core/SymmetricKey';
import AsymmetricKey from './core/AsymmetricKey';

/* ------------------- Exports ------------------ */

export encrypt from './modules/encrypt';
export decrypt from './modules/decrypt';
export Random from './modules/Random';

export {
  sign,
  deriveKey,
  createSecret,
  createSignatureKeyPair,
  createEncryptionKeyPair,
  importKey,
  stringToArrayBuffer,
};
