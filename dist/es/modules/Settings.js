"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var Settings = /*#__PURE__*/function () {
  function Settings() {
    (0, _classCallCheck2["default"])(this, Settings);
  }
  (0, _createClass2["default"])(Settings, null, [{
    key: "getAlgorithmSettings",
    value: function getAlgorithmSettings(algorithm) {
      if (algorithm === 'A256GCM') {
        return this.options.aesGcm;
      }
      if (algorithm === 'RSA-OAEP') {
        return this.options.rsaOaep;
      }
      if (algorithm === 'ECDSA' || algorithm === 'P-384') {
        return this.options.ecdsa;
      }
      if (algorithm === 'PBKDF2') {
        return this.options.pbkdf2;
      }
      return {};
    }
  }]);
  return Settings;
}();
(0, _defineProperty2["default"])(Settings, "options", {
  aesGcm: {
    type: 'symmetric',
    usages: ['encrypt', 'decrypt'],
    algorithm: {
      name: 'AES-GCM',
      length: 256,
      secretLength: 256,
      ivLength: 12,
      tagLength: 128
    }
  },
  rsaOaep: {
    type: 'asymmetric',
    usages: ['encrypt', 'decrypt'],
    algorithm: {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {
        name: 'SHA-1'
      }
    }
  },
  ecdsa: {
    type: 'asymmetric',
    usages: ['sign', 'verify'],
    algorithm: {
      name: 'ECDSA',
      namedCurve: 'P-384',
      hash: {
        name: 'SHA-256'
      }
    }
  },
  pbkdf2: {
    type: 'derivation',
    usages: ['deriveKey', 'deriveBits'],
    algorithm: {
      name: 'PBKDF2',
      iterations: 800,
      hash: 'SHA-256'
    }
  }
});
var _default = Settings;
exports["default"] = _default;