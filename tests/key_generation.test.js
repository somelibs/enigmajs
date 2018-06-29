import { createVerificationKey, createSecret, createEncryptionKey, deriveKey } from '../src/index';
import AsymmetricKey from '../src/modules/AsymmetricKey';
import SymmetricKey from '../src/modules/SymmetricKey';

import Subtle, { CryptoKey } from './__mocks__/SubtleMock';

global.crypto = { subtle: new Subtle() };

describe('Key creations', () => {

  test('createVerificationKey should return an asymmetric key with sign/verify usage', async () => {
    const { publicKey, privateKey } = await createVerificationKey();
    expect(publicKey).toBeInstanceOf(AsymmetricKey);
    expect(privateKey).toBeInstanceOf(AsymmetricKey);
    expect(publicKey.toCryptoKey()).toBeInstanceOf(CryptoKey);
    expect(privateKey.toCryptoKey()).toBeInstanceOf(CryptoKey);
    expect(publicKey.toCryptoKey()).toHaveProperty('type', 'public');
    expect(privateKey.toCryptoKey()).toHaveProperty('type', 'private');
    const expectedUsages = ['sign', 'verify'];
    expect(publicKey.toCryptoKey()).toHaveProperty('usages', expectedUsages);
    expect(privateKey.toCryptoKey()).toHaveProperty('usages', expectedUsages);
  });

  test('createVerificationKey should return an asymmetric key with encrypt decrypt usage', async () => {
    const { publicKey, privateKey } = await createEncryptionKey();
    expect(publicKey).toBeInstanceOf(AsymmetricKey);
    expect(privateKey).toBeInstanceOf(AsymmetricKey);
    expect(publicKey.toCryptoKey()).toBeInstanceOf(CryptoKey);
    expect(privateKey.toCryptoKey()).toBeInstanceOf(CryptoKey);
    expect(publicKey.toCryptoKey()).toHaveProperty('type', 'public');
    expect(privateKey.toCryptoKey()).toHaveProperty('type', 'private');
    const expectedUsages = ['encrypt', 'decrypt'];
    expect(publicKey.toCryptoKey()).toHaveProperty('usages', expectedUsages);
    expect(privateKey.toCryptoKey()).toHaveProperty('usages', expectedUsages);
  });

  test('createSecret should return a Promise to a symmetric key', async () => {
    const key = await createSecret();
    expect(key).toBeInstanceOf(SymmetricKey);
    expect(key.toCryptoKey()).toBeInstanceOf(CryptoKey);
    expect(key.toCryptoKey()).toHaveProperty('type', 'secret');
    const expectedUsages = ['encrypt', 'decrypt'];
    expect(key.toCryptoKey()).toHaveProperty('usages', expectedUsages);
  });

  test('deriveKey should generate a symmetric key', async () => {
    const key = await deriveKey({ passphrase: 'test', salt: 'foobar' });
    expect(key.toCryptoKey()).toBeInstanceOf(CryptoKey);
    expect(key.toCryptoKey()).toHaveProperty('type', 'secret');
    const expectedUsages = ['encrypt', 'decrypt'];
    expect(key.toCryptoKey()).toHaveProperty('usages', expectedUsages);
  });

});
