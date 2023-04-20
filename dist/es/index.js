import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _isString from 'lodash/isString';

var _this = this;

import arrayBufferToHex from 'array-buffer-to-hex';

import SymmetricKey from './modules/SymmetricKey';
import AsymmetricKey from './modules/AsymmetricKey';
import Settings from './modules/Settings';
import { stringToArrayBuffer, getAlgorithm } from './modules/utils';

var sign = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(payload, _ref) {
    var key = _ref.key;
    var cryptoKey, buffer, settings, encryptedPayload;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cryptoKey = key.toCryptoKey(key);
            buffer = stringToArrayBuffer(payload);
            settings = key.getAlgorithm();
            _context.next = 5;
            return crypto.subtle.sign(settings, cryptoKey, buffer);

          case 5:
            encryptedPayload = _context.sent;
            return _context.abrupt('return', arrayBufferToHex(new Uint8Array(encryptedPayload)));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function sign(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var deriveKey = function deriveKey(_ref3) {
  var passphrase = _ref3.passphrase,
      salt = _ref3.salt;
  return SymmetricKey.generate({
    passphrase: passphrase,
    salt: salt
  });
};

var createSecret = function createSecret() {
  return SymmetricKey.generate();
};

var createSignatureKeyPair = function createSignatureKeyPair() {
  return AsymmetricKey.generate('SIGN_VERIFY');
};

var createEncryptionKeyPair = function createEncryptionKeyPair() {
  return AsymmetricKey.generate('ENCRYPT_DECRYPT');
};

var importKey = function importKey(jwk) {
  var jsonJwk = _isString(jwk) ? JSON.parse(jwk) : jwk;
  var algorithm = getAlgorithm(jsonJwk);
  var settings = Settings.getAlgorithmSettings(algorithm);
  if (algorithm) {
    if (settings.type === 'symmetric') {
      return SymmetricKey.import(jsonJwk);
    }if (settings.type === 'asymmetric') {
      return AsymmetricKey.import(jsonJwk);
    }
  }
};

import _encrypt from './modules/encrypt';
export { _encrypt as encrypt };
import _decrypt from './modules/decrypt';
export { _decrypt as decrypt };
import _Random from './modules/Random';
export { _Random as Random };


export { sign, deriveKey, createSecret, createSignatureKeyPair, createEncryptionKeyPair, importKey, stringToArrayBuffer };