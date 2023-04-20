import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import randomBytes from 'random-bytes';

var Random = function () {
  function Random() {
    _classCallCheck(this, Random);
  }

  Random.iv = function iv() {
    var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;

    return randomBytes(bytes);
  };

  Random.string = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var randomIv;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var iv;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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

export default Random;