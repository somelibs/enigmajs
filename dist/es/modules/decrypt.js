import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _extend from 'lodash/extend';
import _isArrayBuffer from 'lodash/isArrayBuffer';
import _isFunction from 'lodash/isFunction';

var _this = this;

import hexToArrayBuffer from 'hex-to-array-buffer';
import ab2str from 'arraybuffer-to-string';
import { stringToInitVector } from './utils';

var getCryptoKey = function getCryptoKey(key) {
  if (key && _isFunction(key.toCryptoKey)) {
    return key.toCryptoKey();
  }
};

var decrypt = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var cipher = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var key = _ref.key,
        _ref$raw = _ref.raw,
        raw = _ref$raw === undefined ? false : _ref$raw;
    var ciphertext, cryptoKey, cipherBuffer, settings, iv, ivBuffer, buffer, logger;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            cipherBuffer = _isArrayBuffer(ciphertext) ? ciphertext : hexToArrayBuffer(ciphertext);
            settings = void 0;

            if (key.type === 'symmetric') {
              iv = cipher.iv;
              ivBuffer = _isArrayBuffer(iv) ? iv : stringToInitVector(iv);

              settings = _extend(key.getAlgorithm(), { iv: ivBuffer });
            } else if (key.type === 'asymmetric') {
              settings = key.getAlgorithm();
            }
            _context.next = 9;
            return crypto.subtle.decrypt(settings, cryptoKey, cipherBuffer);

          case 9:
            buffer = _context.sent;
            return _context.abrupt('return', raw ? buffer : ab2str(buffer));

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
    }, _callee, _this, [[0, 14]]);
  }));

  return function decrypt() {
    return _ref2.apply(this, arguments);
  };
}();

export default decrypt;