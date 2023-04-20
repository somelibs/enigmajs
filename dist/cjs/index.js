'use strict';

exports.__esModule = true;
exports.stringToArrayBuffer = exports.importKey = exports.createEncryptionKeyPair = exports.createSignatureKeyPair = exports.createSecret = exports.deriveKey = exports.sign = exports.Random = exports.decrypt = exports.encrypt = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _arrayBufferToHex = require('array-buffer-to-hex');

var _arrayBufferToHex2 = _interopRequireDefault(_arrayBufferToHex);

var _SymmetricKey = require('./modules/SymmetricKey');

var _SymmetricKey2 = _interopRequireDefault(_SymmetricKey);

var _AsymmetricKey = require('./modules/AsymmetricKey');

var _AsymmetricKey2 = _interopRequireDefault(_AsymmetricKey);

var _Settings = require('./modules/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _utils = require('./modules/utils');

var _encrypt2 = require('./modules/encrypt');

var _encrypt3 = _interopRequireDefault(_encrypt2);

var _decrypt2 = require('./modules/decrypt');

var _decrypt3 = _interopRequireDefault(_decrypt2);

var _Random2 = require('./modules/Random');

var _Random3 = _interopRequireDefault(_Random2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sign = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, _ref) {
    var key = _ref.key;
    var cryptoKey, buffer, settings, encryptedPayload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cryptoKey = key.toCryptoKey(key);
            buffer = (0, _utils.stringToArrayBuffer)(payload);
            settings = key.getAlgorithm();
            _context.next = 5;
            return crypto.subtle.sign(settings, cryptoKey, buffer);

          case 5:
            encryptedPayload = _context.sent;
            return _context.abrupt('return', (0, _arrayBufferToHex2.default)(new Uint8Array(encryptedPayload)));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sign(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var deriveKey = function deriveKey(_ref3) {
  var passphrase = _ref3.passphrase,
      salt = _ref3.salt;
  return _SymmetricKey2.default.generate({
    passphrase: passphrase,
    salt: salt
  });
};

var createSecret = function createSecret() {
  return _SymmetricKey2.default.generate();
};

var createSignatureKeyPair = function createSignatureKeyPair() {
  return _AsymmetricKey2.default.generate('SIGN_VERIFY');
};

var createEncryptionKeyPair = function createEncryptionKeyPair() {
  return _AsymmetricKey2.default.generate('ENCRYPT_DECRYPT');
};

var importKey = function importKey(jwk) {
  var jsonJwk = (0, _isString3.default)(jwk) ? JSON.parse(jwk) : jwk;
  var algorithm = (0, _utils.getAlgorithm)(jsonJwk);
  var settings = _Settings2.default.getAlgorithmSettings(algorithm);
  if (algorithm) {
    if (settings.type === 'symmetric') {
      return _SymmetricKey2.default.import(jsonJwk);
    }if (settings.type === 'asymmetric') {
      return _AsymmetricKey2.default.import(jsonJwk);
    }
  }
};

exports.encrypt = _encrypt3.default;
exports.decrypt = _decrypt3.default;
exports.Random = _Random3.default;
exports.sign = sign;
exports.deriveKey = deriveKey;
exports.createSecret = createSecret;
exports.createSignatureKeyPair = createSignatureKeyPair;
exports.createEncryptionKeyPair = createEncryptionKeyPair;
exports.importKey = importKey;
exports.stringToArrayBuffer = _utils.stringToArrayBuffer;