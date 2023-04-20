'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extend2 = require('lodash/extend');

var _extend3 = _interopRequireDefault(_extend2);

var _isArrayBuffer2 = require('lodash/isArrayBuffer');

var _isArrayBuffer3 = _interopRequireDefault(_isArrayBuffer2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _hexToArrayBuffer = require('hex-to-array-buffer');

var _hexToArrayBuffer2 = _interopRequireDefault(_hexToArrayBuffer);

var _arraybufferToString = require('arraybuffer-to-string');

var _arraybufferToString2 = _interopRequireDefault(_arraybufferToString);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCryptoKey = function getCryptoKey(key) {
  if (key && (0, _isFunction3.default)(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};

var decrypt = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var cipher = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var key = _ref.key,
        _ref$raw = _ref.raw,
        raw = _ref$raw === undefined ? false : _ref$raw;
    var ciphertext, cryptoKey, cipherBuffer, settings, iv, ivBuffer, buffer, logger;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            ciphertext = cipher.text;

            if (!ciphertext) {
              _context.next = 11;
              break;
            }

            cryptoKey = getCryptoKey(key);
            cipherBuffer = (0, _isArrayBuffer3.default)(ciphertext) ? ciphertext : (0, _hexToArrayBuffer2.default)(ciphertext);
            settings = void 0;

            if (key.type === 'symmetric') {
              iv = cipher.iv;
              ivBuffer = (0, _isArrayBuffer3.default)(iv) ? iv : (0, _utils.stringToInitVector)(iv);

              settings = (0, _extend3.default)(key.getAlgorithm(), { iv: ivBuffer });
            } else if (key.type === 'asymmetric') {
              settings = key.getAlgorithm();
            }
            _context.next = 9;
            return crypto.subtle.decrypt(settings, cryptoKey, cipherBuffer);

          case 9:
            buffer = _context.sent;
            return _context.abrupt('return', raw ? buffer : (0, _arraybufferToString2.default)(buffer));

          case 11:
            return _context.abrupt('return', null);

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);
            logger = console;

            logger.groupCollapsed('%c[Enigma] Unable to decrypt payload.', 'background: #FFF0F0; color: #FD4146');
            logger.error({ cipher: cipher, key: key, raw: raw });
            logger.groupEnd();
            throw _context.t0;

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function decrypt() {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = decrypt;