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
var _randomBytes = _interopRequireDefault(require("random-bytes"));
var Random = /*#__PURE__*/function () {
  function Random() {
    (0, _classCallCheck2["default"])(this, Random);
  }
  (0, _createClass2["default"])(Random, null, [{
    key: "iv",
    value: function iv() {
      var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
      return (0, _randomBytes["default"])(bytes);
    }
  }, {
    key: "string",
    value: function () {
      var _string = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var randomIv;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.iv();
            case 2:
              randomIv = _context.sent;
              return _context.abrupt("return", btoa(String.fromCharCode.apply(null, randomIv)));
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function string() {
        return _string.apply(this, arguments);
      }
      return string;
    }()
  }, {
    key: "ivString",
    value: function () {
      var _ivString = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var iv;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.iv();
            case 2:
              iv = _context2.sent;
              return _context2.abrupt("return", iv.join(','));
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function ivString() {
        return _ivString.apply(this, arguments);
      }
      return ivString;
    }()
  }]);
  return Random;
}();
var _default = Random;
exports["default"] = _default;