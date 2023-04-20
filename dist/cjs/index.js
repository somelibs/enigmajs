"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sign = exports.importKey = exports.encrypt = exports.deriveKey = exports.decrypt = exports.createSignatureKeyPair = exports.createSecret = exports.createEncryptionKeyPair = exports.Random = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _arrayBufferToHex = _interopRequireDefault(require("array-buffer-to-hex"));
var _SymmetricKey = _interopRequireDefault(require("./modules/SymmetricKey"));
var _AsymmetricKey = _interopRequireDefault(require("./modules/AsymmetricKey"));
var _Settings = _interopRequireDefault(require("./modules/Settings"));
var _utils = require("./modules/utils");
exports.stringToArrayBuffer = _utils.stringToArrayBuffer;
var _encrypt = _interopRequireDefault(require("./modules/encrypt"));
exports.encrypt = _encrypt["default"];
var _decrypt = _interopRequireDefault(require("./modules/decrypt"));
exports.decrypt = _decrypt["default"];
var _Random = _interopRequireDefault(require("./modules/Random"));
exports.Random = _Random["default"];
var sign = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, _ref) {
    var key, cryptoKey, buffer, settings, encryptedPayload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          key = _ref.key;
          cryptoKey = key.toCryptoKey(key);
          buffer = (0, _utils.stringToArrayBuffer)(payload);
          settings = key.getAlgorithm();
          _context.next = 6;
          return crypto.subtle.sign(settings, cryptoKey, buffer);
        case 6:
          encryptedPayload = _context.sent;
          return _context.abrupt("return", (0, _arrayBufferToHex["default"])(new Uint8Array(encryptedPayload)));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sign(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.sign = sign;
var deriveKey = function deriveKey(_ref3) {
  var passphrase = _ref3.passphrase,
    salt = _ref3.salt;
  return _SymmetricKey["default"].generate({
    passphrase: passphrase,
    salt: salt
  });
};
exports.deriveKey = deriveKey;
var createSecret = function createSecret() {
  return _SymmetricKey["default"].generate();
};
exports.createSecret = createSecret;
var createSignatureKeyPair = function createSignatureKeyPair() {
  return _AsymmetricKey["default"].generate('SIGN_VERIFY');
};
exports.createSignatureKeyPair = createSignatureKeyPair;
var createEncryptionKeyPair = function createEncryptionKeyPair() {
  return _AsymmetricKey["default"].generate('ENCRYPT_DECRYPT');
};
exports.createEncryptionKeyPair = createEncryptionKeyPair;
var importKey = function importKey(jwk) {
  var jsonJwk = (0, _isString2["default"])(jwk) ? JSON.parse(jwk) : jwk;
  var algorithm = (0, _utils.getAlgorithm)(jsonJwk);
  var settings = _Settings["default"].getAlgorithmSettings(algorithm);
  if (algorithm) {
    if (settings.type === 'symmetric') {
      return _SymmetricKey["default"]["import"](jsonJwk);
    }
    if (settings.type === 'asymmetric') {
      return _AsymmetricKey["default"]["import"](jsonJwk);
    }
  }
};
exports.importKey = importKey;