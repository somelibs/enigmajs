import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import BaseKey from './BaseKey';
import Settings from './Settings';

var AsymmetricKey = function (_BaseKey) {
  _inherits(AsymmetricKey, _BaseKey);

  function AsymmetricKey() {
    var _temp, _this, _ret;

    _classCallCheck(this, AsymmetricKey);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseKey.call.apply(_BaseKey, [this].concat(args))), _this), _this.type = 'asymmetric', _temp), _possibleConstructorReturn(_this, _ret);
  }

  AsymmetricKey.generate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(type) {
      var settings, extractable, _settings, algorithm, usages, publicKey, privateKey, keyPair;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              settings = void 0;

              if (type === 'SIGN_VERIFY') {
                settings = Settings.getAlgorithmSettings('ECDSA');
              } else if (type === 'ENCRYPT_DECRYPT') {
                settings = Settings.getAlgorithmSettings('RSA-OAEP');
              }
              extractable = true;
              _settings = settings, algorithm = _settings.algorithm, usages = _settings.usages;
              publicKey = new AsymmetricKey(settings);
              privateKey = new AsymmetricKey(settings);
              _context.next = 8;
              return crypto.subtle.generateKey(algorithm, extractable, usages);

            case 8:
              keyPair = _context.sent;

              publicKey.setCryptoKey(keyPair.publicKey);
              privateKey.setCryptoKey(keyPair.privateKey);
              return _context.abrupt('return', { publicKey: publicKey, privateKey: privateKey });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function generate(_x) {
      return _ref.apply(this, arguments);
    }

    return generate;
  }();

  return AsymmetricKey;
}(BaseKey);

export default AsymmetricKey;