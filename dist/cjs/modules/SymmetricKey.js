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
var _Settings = _interopRequireDefault(require("./Settings"));
var _BaseKey2 = _interopRequireDefault(require("./BaseKey"));
var _utils = require("./utils");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var SymmetricKey = /*#__PURE__*/function (_BaseKey) {
  (0, _inherits2["default"])(SymmetricKey, _BaseKey);
  var _super = _createSuper(SymmetricKey);
  function SymmetricKey() {
    var _this;
    (0, _classCallCheck2["default"])(this, SymmetricKey);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "type", 'symmetric');
    return _this;
  }
  (0, _createClass2["default"])(SymmetricKey, null, [{
    key: "derive",
    value: function () {
      var _derive = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(passphraseKey, salt) {
        var _Settings$getAlgorith, algorithm, _Settings$getAlgorith2, derivedAlgorithm, usages;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _Settings$getAlgorith = _Settings["default"].getAlgorithmSettings('PBKDF2'), algorithm = _Settings$getAlgorith.algorithm;
              algorithm.salt = (0, _utils.stringToInitVector)(salt);
              _Settings$getAlgorith2 = _Settings["default"].getAlgorithmSettings('A256GCM'), derivedAlgorithm = _Settings$getAlgorith2.algorithm, usages = _Settings$getAlgorith2.usages;
              return _context.abrupt("return", crypto.subtle.deriveKey(algorithm, passphraseKey, derivedAlgorithm, false, usages));
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function derive(_x, _x2) {
        return _derive.apply(this, arguments);
      }
      return derive;
    }()
  }, {
    key: "generate",
    value: function () {
      var _generate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _ref,
          passphrase,
          salt,
          cryptoKey,
          settings,
          instance,
          passphraseBuffer,
          passphraseKey,
          extractable,
          algorithm,
          usages,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _ref = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, passphrase = _ref.passphrase, salt = _ref.salt;
              settings = _Settings["default"].getAlgorithmSettings('A256GCM');
              instance = new this(settings);
              if (!(passphrase && salt)) {
                _context2.next = 13;
                break;
              }
              passphraseBuffer = (0, _utils.stringToArrayBuffer)(passphrase);
              _context2.next = 7;
              return this["import"](passphraseBuffer, 'PBKDF2');
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
              return _context2.abrupt("return", instance);
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function generate() {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }]);
  return SymmetricKey;
}(_BaseKey2["default"]);
var _default = SymmetricKey;
exports["default"] = _default;