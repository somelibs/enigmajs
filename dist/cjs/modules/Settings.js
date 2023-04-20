'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Settings = function () {
  function Settings() {
    (0, _classCallCheck3.default)(this, Settings);
  }

  Settings.getAlgorithmSettings = function getAlgorithmSettings(algorithm) {
    if (algorithm === 'A256GCM') {
      return this.options.aesGcm;
    }if (algorithm === 'RSA-OAEP') {
      return this.options.rsaOaep;
    }if (algorithm === 'ECDSA' || algorithm === 'P-384') {
      return this.options.ecdsa;
    }if (algorithm === 'PBKDF2') {
      return this.options.pbkdf2;
    }
    return {};
  };

  return Settings;
}();

Settings.options = {
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
      hash: { name: 'SHA-1' }
    }
  },
  ecdsa: {
    type: 'asymmetric',
    usages: ['sign', 'verify'],
    algorithm: {
      name: 'ECDSA',
      namedCurve: 'P-384',
      hash: { name: 'SHA-256' }
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
};
exports.default = Settings;