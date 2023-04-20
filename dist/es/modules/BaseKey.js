import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _isPlainObject from 'lodash/isPlainObject';
import _isString from 'lodash/isString';
import _extend from 'lodash/extend';
import _clone from 'lodash/clone';

import uuid from 'uuid';
import Settings from './Settings';

var BaseKey = function () {
  function BaseKey() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        type = _ref.type,
        algorithm = _ref.algorithm;

    _classCallCheck(this, BaseKey);

    this.uuid = uuid();
    this.type = type;
    this.algorithm = algorithm;
  }

  BaseKey.prototype.toCryptoKey = function toCryptoKey() {
    return this.cryptoKey;
  };

  BaseKey.prototype.setCryptoKey = function setCryptoKey(cryptoKey) {
    this.cryptoKey = cryptoKey;
  };

  BaseKey.prototype.toJwk = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return crypto.subtle.exportKey('jwk', this.cryptoKey);

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', null);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 6]]);
    }));

    function toJwk() {
      return _ref2.apply(this, arguments);
    }

    return toJwk;
  }();

  BaseKey.prototype.getAlgorithm = function getAlgorithm() {
    return _clone(_extend(this.algorithm, this.cryptoKey.algorithm));
  };

  BaseKey.import = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(key) {
      var algorithmName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var settings, type, keyData, usages, extractable, _settings, _settings2, algorithm, instance, cryptoKey;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              settings = void 0;
              type = void 0;
              keyData = void 0;
              usages = void 0;
              extractable = void 0;

              if (_isString(key) || _isPlainObject(key)) {
                keyData = _isString(key) ? JSON.parse(key) : key;
                settings = Settings.getAlgorithmSettings(keyData.alg ? keyData.alg : keyData.crv);
                type = 'jwk';
                usages = keyData.key_ops;
                extractable = true;
              } else {
                keyData = key;
                settings = Settings.getAlgorithmSettings(algorithmName);
                type = 'raw';
                extractable = false;
                _settings = settings;
                usages = _settings.usages;
              }
              _settings2 = settings, algorithm = _settings2.algorithm;
              instance = new this(settings);
              _context2.next = 10;
              return crypto.subtle.importKey(type, keyData, algorithm, extractable, usages);

            case 10:
              cryptoKey = _context2.sent;

              instance.setCryptoKey(cryptoKey);
              return _context2.abrupt('return', instance);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _import(_x3) {
      return _ref3.apply(this, arguments);
    }

    return _import;
  }();

  return BaseKey;
}();

export default BaseKey;