"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _extend2 = _interopRequireDefault(require("lodash/extend"));
var _clone2 = _interopRequireDefault(require("lodash/clone"));
var _uuid = require("uuid");
var _Settings = _interopRequireDefault(require("./Settings"));
var BaseKey = /*#__PURE__*/function () {
  function BaseKey() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      type = _ref.type,
      algorithm = _ref.algorithm;
    (0, _classCallCheck2["default"])(this, BaseKey);
    this.uuid = (0, _uuid.v4)();
    this.type = type;
    this.algorithm = algorithm;
  }
  (0, _createClass2["default"])(BaseKey, [{
    key: "toCryptoKey",
    value: function toCryptoKey() {
      return this.cryptoKey;
    }
  }, {
    key: "setCryptoKey",
    value: function setCryptoKey(cryptoKey) {
      this.cryptoKey = cryptoKey;
    }
  }, {
    key: "toJwk",
    value: function () {
      var _toJwk = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return crypto.subtle.exportKey('jwk', this.cryptoKey);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", null);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 6]]);
      }));
      function toJwk() {
        return _toJwk.apply(this, arguments);
      }
      return toJwk;
    }()
  }, {
    key: "getAlgorithm",
    value: function getAlgorithm() {
      return (0, _clone2["default"])((0, _extend2["default"])(this.algorithm, this.cryptoKey.algorithm));
    }
  }], [{
    key: "import",
    value: function () {
      var _import2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(key) {
        var algorithmName,
          settings,
          type,
          keyData,
          usages,
          extractable,
          _settings,
          _settings2,
          algorithm,
          instance,
          cryptoKey,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              algorithmName = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
              if ((0, _isString2["default"])(key) || (0, _isPlainObject2["default"])(key)) {
                keyData = (0, _isString2["default"])(key) ? JSON.parse(key) : key;
                settings = _Settings["default"].getAlgorithmSettings(keyData.alg ? keyData.alg : keyData.crv);
                type = 'jwk';
                usages = keyData.key_ops;
                extractable = true;
              } else {
                keyData = key;
                settings = _Settings["default"].getAlgorithmSettings(algorithmName);
                type = 'raw';
                extractable = false;
                _settings = settings;
                usages = _settings.usages;
              }
              _settings2 = settings, algorithm = _settings2.algorithm;
              instance = new this(settings);
              _context2.next = 6;
              return crypto.subtle.importKey(type, keyData, algorithm, extractable, usages);
            case 6:
              cryptoKey = _context2.sent;
              instance.setCryptoKey(cryptoKey);
              return _context2.abrupt("return", instance);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _import(_x) {
        return _import2.apply(this, arguments);
      }
      return _import;
    }()
  }]);
  return BaseKey;
}();
var _default = BaseKey;
exports["default"] = _default;