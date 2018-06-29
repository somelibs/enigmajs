class Settings {

  static options = {
    aesGcm: {
      type: 'symmetric',
      usages: ['encrypt', 'decrypt'],
      extractable: false,
      algorithm: {
        name: 'AES-GCM',
        length: 256,
        secretLength: 256,
        ivLength: 12,
        tagLength: 128,
      },
    },
    rsaOaep: {
      type: 'asymmetric',
      usages: ['encrypt', 'decrypt'],
      extractable: false,
      algorithm: {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-1' },
      },
    },
    ecdsa: {
      type: 'asymmetric',
      usages: ['sign', 'verify'],
      extractable: false,
      algorithm: {
        name: 'ECDSA',
        namedCurve: 'P-384',
        hash: { name: 'SHA-256' },
      },
    },
    pbkdf2: {
      type: 'derivation',
      usages: ['deriveKey', 'deriveBits'],
      extractable: false,
      algorithm: {
        name: 'PBKDF2',
        iterations: 800,
        hash: 'SHA-256',
      },
    },
  };

  static getAlgorithmSettings(algorithm) {
    if (algorithm === 'A256GCM') {
      return this.options.aesGcm;
    } if (algorithm === 'RSA-OAEP') {
      return this.options.rsaOaep;
    } if (algorithm === 'ECDSA' || algorithm === 'P-384') {
      return this.options.ecdsa;
    } if (algorithm === 'PBKDF2') {
      return this.options.pbkdf2;
    }
    return {};

  }

}

export default Settings;
