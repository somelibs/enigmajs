"use strict";

exports.__esModule = true;
exports.stringToInitVector = exports.stringToArrayBuffer = exports.getAlgorithm = exports.arrayBufferToString = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var stringToArrayBuffer = function stringToArrayBuffer(str) {
  var stringLength = str.length;
  var resultBuffer = new ArrayBuffer(stringLength);
  var resultView = new Uint8Array(resultBuffer);
  for (var i = 0; i < stringLength; i += 1) resultView[i] = str.charCodeAt(i);
  return resultBuffer;
};
exports.stringToArrayBuffer = stringToArrayBuffer;
var arrayBufferToString = function arrayBufferToString(buffer) {
  var resultString = '';
  var view = new Uint8Array(buffer);
  var _iterator = _createForOfIteratorHelper(view),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      resultString += String.fromCharCode(element);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return resultString;
};
exports.arrayBufferToString = arrayBufferToString;
var stringToInitVector = function stringToInitVector(initVector) {
  var appendix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!initVector) return null;
  var ivStrings = initVector.split(',');
  if (appendix != null) {
    if (Array.isArray(appendix)) {
      ivStrings.push.apply(ivStrings, appendix);
    } else if (!Number.isNaN(parseInt(appendix, 10))) {
      ivStrings.push(appendix);
    }
  }
  var iv = new Uint8Array(ivStrings.length);
  for (var i = 0; i < ivStrings.length; i += 1) iv[i] = parseInt(ivStrings[i], 10);
  return iv;
};
exports.stringToInitVector = stringToInitVector;
var getAlgorithm = function getAlgorithm(jwk) {
  if (jwk.alg || jwk.crv) {
    return jwk.alg ? jwk.alg : jwk.crv;
  }
  return null;
};
exports.getAlgorithm = getAlgorithm;