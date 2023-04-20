'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _extend2 = require('lodash/extend');

var _extend3 = _interopRequireDefault(_extend2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Settings = require('./Settings');

var _Settings2 = _interopRequireDefault(_Settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseKey = function () {
  function BaseKey() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        type = _ref.type,
        algorithm = _ref.algorithm;

    (0, _classCallCheck3.default)(this, BaseKey);

    this.uuid = (0, _uuid2.default)();
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
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
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
    return (0, _clone3.default)((0, _extend3.default)(this.algorithm, this.cryptoKey.algorithm));
  };

  BaseKey.import = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key) {
      var algorithmName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var settings, type, keyData, usages, extractable, _settings, _settings2, algorithm, instance, cryptoKey;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              settings = void 0;
              type = void 0;
              keyData = void 0;
              usages = void 0;
              extractable = void 0;

              if ((0, _isString3.default)(key) || (0, _isPlainObject3.default)(key)) {
                keyData = (0, _isString3.default)(key) ? JSON.parse(key) : key;
                settings = _Settings2.default.getAlgorithmSettings(keyData.alg ? keyData.alg : keyData.crv);
                type = 'jwk';
                usages = keyData.key_ops;
                extractable = true;
              } else {
                keyData = key;
                settings = _Settings2.default.getAlgorithmSettings(algorithmName);
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

exports.default = BaseKey;