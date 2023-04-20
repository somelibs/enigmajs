"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _clone2 = _interopRequireDefault(require("lodash/clone"));
var _extend2 = _interopRequireDefault(require("lodash/extend"));
var _isArrayBuffer2 = _interopRequireDefault(require("lodash/isArrayBuffer"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _utf8Buffer = require("utf8-buffer");
var _arrayBufferToHex = _interopRequireDefault(require("array-buffer-to-hex"));
var _utils = require("./utils");
var _Random = _interopRequireDefault(require("./Random"));
var getCryptoKey = function getCryptoKey(key) {
  if (key && (0, _isFunction2["default"])(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};
var stringToArrayBuffer = function stringToArrayBuffer(string) {
  var buffer = [];
  (0, _utf8Buffer.pack)(string, buffer);
  return new Uint8Array(buffer);
};
var encrypt = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, _ref) {
    var key, _ref$raw, raw, settings, ivString, cryptoKey, buffer, ciphertext, logger;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          key = _ref.key, _ref$raw = _ref.raw, raw = _ref$raw === void 0 ? false : _ref$raw;
          _context.prev = 1;
          cryptoKey = getCryptoKey(key);
          buffer = (0, _isArrayBuffer2["default"])(payload) || raw ? payload : stringToArrayBuffer(payload);
          if (key) {
            _context.next = 6;
            break;
          }
          throw Error('undefined key (Enigma.encrypt)');
        case 6:
          if (!(key.type === 'symmetric')) {
            _context.next = 13;
            break;
          }
          _context.next = 9;
          return _Random["default"].ivString();
        case 9:
          ivString = _context.sent;
          settings = (0, _extend2["default"])(key.getAlgorithm(), {
            iv: (0, _utils.stringToInitVector)(ivString)
          });
          _context.next = 14;
          break;
        case 13:
          if (key.type === 'asymmetric') {
            settings = (0, _clone2["default"])(key.getAlgorithm());
          }
        case 14:
          _context.next = 16;
          return crypto.subtle.encrypt(settings, cryptoKey, buffer);
        case 16:
          ciphertext = _context.sent;
          return _context.abrupt("return", {
            text: raw ? ciphertext : (0, _arrayBufferToHex["default"])(ciphertext),
            iv: ivString
          });
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          logger = console;
          logger.groupCollapsed('%c[Enigma] Unable to encrypt payload.', 'background: #FFF0F0; color: #FD4146');
          logger.error({
            payload: payload,
            key: key,
            raw: raw
          });
          logger.groupEnd();
          throw _context.t0;
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 20]]);
  }));
  return function encrypt(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = encrypt;
exports["default"] = _default;