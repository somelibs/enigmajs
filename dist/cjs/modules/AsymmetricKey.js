"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _BaseKey2 = _interopRequireDefault(require("./BaseKey"));
var _Settings = _interopRequireDefault(require("./Settings"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var AsymmetricKey = /*#__PURE__*/function (_BaseKey) {
  (0, _inherits2["default"])(AsymmetricKey, _BaseKey);
  var _super = _createSuper(AsymmetricKey);
  function AsymmetricKey() {
    var _this;
    (0, _classCallCheck2["default"])(this, AsymmetricKey);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "type", 'asymmetric');
    return _this;
  }
  (0, _createClass2["default"])(AsymmetricKey, null, [{
    key: "generate",
    value: function () {
      var _generate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(type) {
        var settings, extractable, _settings, algorithm, usages, publicKey, privateKey, keyPair;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (type === 'SIGN_VERIFY') {
                settings = _Settings["default"].getAlgorithmSettings('ECDSA');
              } else if (type === 'ENCRYPT_DECRYPT') {
                settings = _Settings["default"].getAlgorithmSettings('RSA-OAEP');
              }
              extractable = true;
              _settings = settings, algorithm = _settings.algorithm, usages = _settings.usages;
              publicKey = new AsymmetricKey(settings);
              privateKey = new AsymmetricKey(settings);
              _context.next = 7;
              return crypto.subtle.generateKey(algorithm, extractable, usages);
            case 7:
              keyPair = _context.sent;
              publicKey.setCryptoKey(keyPair.publicKey);
              privateKey.setCryptoKey(keyPair.privateKey);
              return _context.abrupt("return", {
                publicKey: publicKey,
                privateKey: privateKey
              });
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function generate(_x) {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }]);
  return AsymmetricKey;
}(_BaseKey2["default"]);
var _default = AsymmetricKey;
exports["default"] = _default;