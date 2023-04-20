'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Settings = require('./Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _BaseKey2 = require('./BaseKey');

var _BaseKey3 = _interopRequireDefault(_BaseKey2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SymmetricKey = function (_BaseKey) {
  (0, _inherits3.default)(SymmetricKey, _BaseKey);

  function SymmetricKey() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SymmetricKey);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _BaseKey.call.apply(_BaseKey, [this].concat(args))), _this), _this.type = 'symmetric', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  SymmetricKey.derive = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(passphraseKey, salt) {
      var _Settings$getAlgorith, algorithm, _Settings$getAlgorith2, derivedAlgorithm, usages;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Settings$getAlgorith = _Settings2.default.getAlgorithmSettings('PBKDF2'), algorithm = _Settings$getAlgorith.algorithm;

              algorithm.salt = (0, _utils.stringToInitVector)(salt);
              _Settings$getAlgorith2 = _Settings2.default.getAlgorithmSettings('A256GCM'), derivedAlgorithm = _Settings$getAlgorith2.algorithm, usages = _Settings$getAlgorith2.usages;
              return _context.abrupt('return', crypto.subtle.deriveKey(algorithm, passphraseKey, derivedAlgorithm, false, usages));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function derive(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return derive;
  }();

  SymmetricKey.generate = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          passphrase = _ref3.passphrase,
          salt = _ref3.salt;

      var cryptoKey, settings, instance, passphraseBuffer, passphraseKey, extractable, algorithm, usages;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cryptoKey = void 0;
              settings = _Settings2.default.getAlgorithmSettings('A256GCM');
              instance = new this(settings);

              if (!(passphrase && salt)) {
                _context2.next = 13;
                break;
              }

              passphraseBuffer = (0, _utils.stringToArrayBuffer)(passphrase);
              _context2.next = 7;
              return this.import(passphraseBuffer, 'PBKDF2');

            case 7:
              passphraseKey = _context2.sent;
              _context2.next = 10;
              return this.derive(passphraseKey.toCryptoKey(), salt);

            case 10:
              cryptoKey = _context2.sent;
              _context2.next = 18;
              break;

            case 13:
              extractable = true;
              algorithm = settings.algorithm, usages = settings.usages;
              _context2.next = 17;
              return crypto.subtle.generateKey(algorithm, extractable, usages);

            case 17:
              cryptoKey = _context2.sent;

            case 18:
              instance.setCryptoKey(cryptoKey);
              return _context2.abrupt('return', instance);

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function generate() {
      return _ref2.apply(this, arguments);
    }

    return generate;
  }();

  return SymmetricKey;
}(_BaseKey3.default);

exports.default = SymmetricKey;