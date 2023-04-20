import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _clone from 'lodash/clone';
import _extend from 'lodash/extend';
import _isArrayBuffer from 'lodash/isArrayBuffer';
import _isFunction from 'lodash/isFunction';

var _this = this;

import { pack } from 'utf8-buffer';
import arrayBufferToHex from 'array-buffer-to-hex';
import { stringToInitVector } from './utils';
import Random from './Random';

var getCryptoKey = function getCryptoKey(key) {
  if (key && _isFunction(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};

var stringToArrayBuffer = function stringToArrayBuffer(string) {
  var buffer = [];
  pack(string, buffer);
  return new Uint8Array(buffer);
};

var encrypt = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(payload, _ref) {
    var key = _ref.key,
        _ref$raw = _ref.raw,
        raw = _ref$raw === undefined ? false : _ref$raw;
    var settings, ivString, cryptoKey, buffer, ciphertext, logger;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            settings = void 0;
            ivString = void 0;
            cryptoKey = getCryptoKey(key);
            buffer = _isArrayBuffer(payload) || raw ? payload : stringToArrayBuffer(payload);

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
            return Random.ivString();

          case 10:
            ivString = _context.sent;

            settings = _extend(key.getAlgorithm(), { iv: stringToInitVector(ivString) });
            _context.next = 15;
            break;

          case 14:
            if (key.type === 'asymmetric') {
              settings = _clone(key.getAlgorithm());
            }

          case 15:
            _context.next = 17;
            return crypto.subtle.encrypt(settings, cryptoKey, buffer);

          case 17:
            ciphertext = _context.sent;
            return _context.abrupt('return', {
              text: raw ? ciphertext : arrayBufferToHex(ciphertext),
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
    }, _callee, _this, [[0, 21]]);
  }));

  return function encrypt(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

export default encrypt;