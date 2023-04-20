'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _extend2 = require('lodash/extend');

var _extend3 = _interopRequireDefault(_extend2);

var _isArrayBuffer2 = require('lodash/isArrayBuffer');

var _isArrayBuffer3 = _interopRequireDefault(_isArrayBuffer2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _utf8Buffer = require('utf8-buffer');

var _arrayBufferToHex = require('array-buffer-to-hex');

var _arrayBufferToHex2 = _interopRequireDefault(_arrayBufferToHex);

var _utils = require('./utils');

var _Random = require('./Random');

var _Random2 = _interopRequireDefault(_Random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCryptoKey = function getCryptoKey(key) {
  if (key && (0, _isFunction3.default)(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};

var stringToArrayBuffer = function stringToArrayBuffer(string) {
  var buffer = [];
  (0, _utf8Buffer.pack)(string, buffer);
  return new Uint8Array(buffer);
};

var encrypt = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, _ref) {
    var key = _ref.key,
        _ref$raw = _ref.raw,
        raw = _ref$raw === undefined ? false : _ref$raw;
    var settings, ivString, cryptoKey, buffer, ciphertext, logger;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            settings = void 0;
            ivString = void 0;
            cryptoKey = getCryptoKey(key);
            buffer = (0, _isArrayBuffer3.default)(payload) || raw ? payload : stringToArrayBuffer(payload);

            if (key) {
              _context.next = 7;
              break;
            }

            throw Error('undefined key (Enigma.encrypt)');

          case 7:
            if (!(key.type === 'symmetric')) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return _Random2.default.ivString();

          case 10:
            ivString = _context.sent;

            settings = (0, _extend3.default)(key.getAlgorithm(), { iv: (0, _utils.stringToInitVector)(ivString) });
            _context.next = 15;
            break;

          case 14:
            if (key.type === 'asymmetric') {
              settings = (0, _clone3.default)(key.getAlgorithm());
            }

          case 15:
            _context.next = 17;
            return crypto.subtle.encrypt(settings, cryptoKey, buffer);

          case 17:
            ciphertext = _context.sent;
            return _context.abrupt('return', {
              text: raw ? ciphertext : (0, _arrayBufferToHex2.default)(ciphertext),
              iv: ivString
            });

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](0);
            logger = console;

            logger.groupCollapsed('%c[Enigma] Unable to encrypt payload.', 'background: #FFF0F0; color: #FD4146');
            logger.error({ payload: payload, key: key, raw: raw });
            logger.groupEnd();
            throw _context.t0;

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 21]]);
  }));

  return function encrypt(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = encrypt;