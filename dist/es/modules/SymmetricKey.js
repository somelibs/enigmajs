import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Settings from './Settings';
import BaseKey from './BaseKey';
import { stringToInitVector, stringToArrayBuffer } from './utils';

var SymmetricKey = function (_BaseKey) {
  _inherits(SymmetricKey, _BaseKey);

  function SymmetricKey() {
    var _temp, _this, _ret;

    _classCallCheck(this, SymmetricKey);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseKey.call.apply(_BaseKey, [this].concat(args))), _this), _this.type = 'symmetric', _temp), _possibleConstructorReturn(_this, _ret);
  }

  SymmetricKey.derive = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(passphraseKey, salt) {
      var _Settings$getAlgorith, algorithm, _Settings$getAlgorith2, derivedAlgorithm, usages;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Settings$getAlgorith = Settings.getAlgorithmSettings('PBKDF2'), algorithm = _Settings$getAlgorith.algorithm;

              algorithm.salt = stringToInitVector(salt);
              _Settings$getAlgorith2 = Settings.getAlgorithmSettings('A256GCM'), derivedAlgorithm = _Settings$getAlgorith2.algorithm, usages = _Settings$getAlgorith2.usages;
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          passphrase = _ref3.passphrase,
          salt = _ref3.salt;

      var cryptoKey, settings, instance, passphraseBuffer, passphraseKey, extractable, algorithm, usages;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cryptoKey = void 0;
              settings = Settings.getAlgorithmSettings('A256GCM');
              instance = new this(settings);

              if (!(passphrase && salt)) {
                _context2.next = 13;
                break;
              }

              passphraseBuffer = stringToArrayBuffer(passphrase);
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
}(BaseKey);

export default SymmetricKey;