import _Number$isNaN from 'babel-runtime/core-js/number/is-nan';
import _getIterator from 'babel-runtime/core-js/get-iterator';
var stringToArrayBuffer = function stringToArrayBuffer(str) {
  var stringLength = str.length;
  var resultBuffer = new ArrayBuffer(stringLength);
  var resultView = new Uint8Array(resultBuffer);
  for (var i = 0; i < stringLength; i += 1) {
    resultView[i] = str.charCodeAt(i);
  }return resultBuffer;
};

var arrayBufferToString = function arrayBufferToString(buffer) {
  var resultString = '';
  var view = new Uint8Array(buffer);
  for (var _iterator = view, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var element = _ref;
    resultString += String.fromCharCode(element);
  }return resultString;
};

var stringToInitVector = function stringToInitVector(initVector) {
  var appendix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!initVector) return null;
  var ivStrings = initVector.split(',');
  if (appendix != null) {
    if (Array.isArray(appendix)) {
      ivStrings.push.apply(ivStrings, appendix);
    } else if (!_Number$isNaN(parseInt(appendix, 10))) {
      ivStrings.push(appendix);
    }
  }
  var iv = new Uint8Array(ivStrings.length);
  for (var i = 0; i < ivStrings.length; i += 1) {
    iv[i] = parseInt(ivStrings[i], 10);
  }return iv;
};

var getAlgorithm = function getAlgorithm(jwk) {
  if (jwk.alg || jwk.crv) {
    return jwk.alg ? jwk.alg : jwk.crv;
  }
  return null;
};

export { stringToArrayBuffer, stringToInitVector, arrayBufferToString, getAlgorithm };