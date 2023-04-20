'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _randomBytes = require('random-bytes');

var _randomBytes2 = _interopRequireDefault(_randomBytes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Random = function () {
  function Random() {
    (0, _classCallCheck3.default)(this, Random);
  }

  Random.iv = function iv() {
    var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;

    return (0, _randomBytes2.default)(bytes);
  };

  Random.string = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var randomIv;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.iv();

            case 2:
              randomIv = _context.sent;
              return _context.abrupt('return', btoa(String.fromCharCode.apply(null, randomIv)));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function string() {
      return _ref.apply(this, arguments);
    }

    return string;
  }();

  Random.ivString = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var iv;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.iv();

            case 2:
              iv = _context2.sent;
              return _context2.abrupt('return', iv.join(','));

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function ivString() {
      return _ref2.apply(this, arguments);
    }

    return ivString;
  }();

  return Random;
}();

exports.default = Random;