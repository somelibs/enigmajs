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

var _BaseKey2 = require('./BaseKey');

var _BaseKey3 = _interopRequireDefault(_BaseKey2);

var _Settings = require('./Settings');

var _Settings2 = _interopRequireDefault(_Settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsymmetricKey = function (_BaseKey) {
  (0, _inherits3.default)(AsymmetricKey, _BaseKey);

  function AsymmetricKey() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AsymmetricKey);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _BaseKey.call.apply(_BaseKey, [this].concat(args))), _this), _this.type = 'asymmetric', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AsymmetricKey.generate = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(type) {
      var settings, extractable, _settings, algorithm, usages, publicKey, privateKey, keyPair;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              settings = void 0;

              if (type === 'SIGN_VERIFY') {
                settings = _Settings2.default.getAlgorithmSettings('ECDSA');
              } else if (type === 'ENCRYPT_DECRYPT') {
                settings = _Settings2.default.getAlgorithmSettings('RSA-OAEP');
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
}(_BaseKey3.default);

exports.default = AsymmetricKey;