"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _extend2 = _interopRequireDefault(require("lodash/extend"));
var _isArrayBuffer2 = _interopRequireDefault(require("lodash/isArrayBuffer"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _hexToArrayBuffer = _interopRequireDefault(require("hex-to-array-buffer"));
var _arraybufferToString = _interopRequireDefault(require("arraybuffer-to-string"));
var _utils = require("./utils");
var getCryptoKey = function getCryptoKey(key) {
  if (key && (0, _isFunction2["default"])(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};
var decrypt = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var cipher,
      _ref2,
      key,
      _ref2$raw,
      raw,
      ciphertext,
      cryptoKey,
      cipherBuffer,
      settings,
      iv,
      ivBuffer,
      buffer,
      logger,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cipher = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _ref2 = _args.length > 1 ? _args[1] : undefined, key = _ref2.key, _ref2$raw = _ref2.raw, raw = _ref2$raw === void 0 ? false : _ref2$raw;
          _context.prev = 2;
          ciphertext = cipher.text;
          if (!ciphertext) {
            _context.next = 12;
            break;
          }
          cryptoKey = getCryptoKey(key);
          cipherBuffer = (0, _isArrayBuffer2["default"])(ciphertext) ? ciphertext : (0, _hexToArrayBuffer["default"])(ciphertext);
          if (key.type === 'symmetric') {
            iv = cipher.iv;
            ivBuffer = (0, _isArrayBuffer2["default"])(iv) ? iv : (0, _utils.stringToInitVector)(iv);
            settings = (0, _extend2["default"])(key.getAlgorithm(), {
              iv: ivBuffer
            });
          } else if (key.type === 'asymmetric') {
            settings = key.getAlgorithm();
          }
          _context.next = 10;
          return crypto.subtle.decrypt(settings, cryptoKey, cipherBuffer);
        case 10:
          buffer = _context.sent;
          return _context.abrupt("return", raw ? buffer : (0, _arraybufferToString["default"])(buffer));
        case 12:
          return _context.abrupt("return", null);
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          logger = console;
          logger.groupCollapsed('%c[Enigma] Unable to decrypt payload.', 'background: #FFF0F0; color: #FD4146');
          logger.error({
            cipher: cipher,
            key: key,
            raw: raw
          });
          logger.groupEnd();
          throw _context.t0;
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 15]]);
  }));
  return function decrypt() {
    return _ref.apply(this, arguments);
  };
}();
var _default = decrypt;
exports["default"] = _default;