import { decrypt, encrypt, createSecret, createEncryptionKey, sign } from '../src/index';
import Subtle from './__mocks__/SubtleMock';

global.crypto = { subtle: new Subtle() };
const hexRegex = /[0-9A-F]\b/i;

describe('Encryption and decryption', () => {

  test('encrypt should return an encrypted string in hexadecimal format and the iv string if the key is symmetrical', async () => {
    const encryptionKey = await createSecret();
    const data = 'test';
    const cipher = await encrypt(data, { key: encryptionKey });
    expect(cipher).toHaveProperty('text');
    expect(cipher).toHaveProperty('iv');
    expect(cipher.text.match(hexRegex)).toBeTruthy();
  });

  test('encrypt should return an encrypted string in hexadecimal format if the key is asymmetrical', async () => {
    const { privateKey } = await createEncryptionKey();
    const data = 'test';
    const cipher = await encrypt(data, { key: privateKey });
    expect(cipher).toHaveProperty('text');
    expect(cipher.text.match(hexRegex)).toBeTruthy();
  });

  test('decrypt should return null if cipher.text is undefined', async () => {
    const cipher = {};
    await expect(decrypt(cipher, { key: 'foo' })).resolves.toBe(null);
  });

  test('decrypt should the decrypted string from an encrypted object with a symmetrical key', async () => {
    const encryptionKey = await createSecret();
    const data = 'foobar';
    const cipher = await encrypt(data, { key: encryptionKey });
    await expect(decrypt(cipher, { key: encryptionKey })).resolves.toBe('foobar');
  });

  test('decrypt should the decrypted string from an encrypted object with a asymmetrical key', async () => {
    const { publicKey, privateKey } = await createEncryptionKey();
    const data = 'foobar';
    const cipher = await encrypt(data, { key: privateKey });
    await expect(decrypt(cipher, { key: publicKey })).resolves.toBe('foobar');
  });

  test('sign should return an hexadecimal string signed with the private asymmetrical key', async () => {
    const { privateKey } = await createEncryptionKey();
    const data = 'foobar';
    const signedData = await sign(data, { key: privateKey });
    expect(signedData.match(hexRegex));
  });
});
