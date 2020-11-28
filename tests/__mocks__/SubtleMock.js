class CryptoKey {

  constructor(type, extractable, algorithm, usages) {
    this.type = type;
    this.extractable = extractable;
    this.algorithm = algorithm;
    this.usages = usages;
  }

}

class CryptoKeyPair {

  constructor(extractable, algorithm, usages) {
    this.publicKey = new CryptoKey('public', extractable, algorithm, usages);
    this.privateKey = new CryptoKey('private', extractable, algorithm, usages);
  }

}

function generateCryptoKey(algo, extractable, keyUsages) {
  return Promise.resolve(new CryptoKey('secret', extractable, algo, keyUsages));
}

function generateCryptoKeyPair(algo, extractable, keyUsages) {
  return Promise.resolve(new CryptoKeyPair(extractable, algo, keyUsages));
}

function generateKey(type, algorithm, extractable, keyUsages) {
  if (type === 'asymmetric') {
    return generateCryptoKeyPair(algorithm, extractable, keyUsages);
  } if (type === 'symmetric') {
    return generateCryptoKey(algorithm, extractable, keyUsages);
  }
}

class Subtle {

  static algorithmType = {
    ECDSA: { type: 'asymmetric' },
    'RSA-OAEP': { type: 'asymmetric' },
    'AES-GCM': { type: 'symmetric' },
    PBKDF2: { type: 'symmetric' }, // used to derivate a symmetric key here
  };

  generateKey(algorithm, extractable, keyUsages) {
    const type = this.getAlgorithmType(algorithm.name);
    return generateKey(type, algorithm, extractable, keyUsages);
  }

  encrypt(algorithm, key, data) {
    return Promise.resolve(Buffer.from(data));
  }

  decrypt(algorithm, key, data) {
    return Promise.resolve(Buffer.from(data));
  }

  getAlgorithmType(algoName) {
    return Subtle.algorithmType[algoName].type;
  }

  importKey(format, keyData, algorithm, extractable, keyUsages) {
    const type = this.getAlgorithmType(algorithm.name);
    return generateKey(type, algorithm, extractable, keyUsages);
  }

  deriveKey(algorithm, masterKey, derivedKeyAlgorithm, extractable, keyUsages) {
    const type = this.getAlgorithmType(algorithm.name);
    return generateKey(type, algorithm, extractable, keyUsages);
  }

  exportKey(format, key) {
    return Promise.resolve('this is an exported key');
  }

  sign(algorithm, key, data) {
    return Promise.resolve(Buffer.from(data));
  }

}

export default Subtle;
export { CryptoKey };
