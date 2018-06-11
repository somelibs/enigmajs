import { stringToArrayBuffer, stringToInitVector, arrayBufferToString, getAlgorithm } from '../src/modules/utils';
import Subtle from './__mocks__/SubtleMock';

global.__DEV__ = false;
global.crypto = { subtle: new Subtle() };

describe('utils test', () => {
  test('stringToArrayBuffer should convert the string to an Uint8Array', () => {
    const buffer = stringToArrayBuffer('foobar');
    expect(buffer).toBeInstanceOf(Uint8Array);
    expect(buffer.toString()).toEqual('102,111,111,98,97,114');
  });

  test('arrayBufferToString should convert the Uint8Array to a string', () => {
    const string = arrayBufferToString(Buffer.from('foobar'));
    expect(string).toEqual('foobar');
  });

  test('stringToInitVector should return an UintArray from the init vector string without appendix', () => {
    const iv = stringToInitVector('2,47,89,25');
    expect(iv).toBeInstanceOf(Uint8Array);
    expect(iv.toString()).toEqual('2,47,89,25');
  });

  test('stringToInitVector should return an UintArray from the init vector string with appendix array', () => {
    const iv = stringToInitVector('2,47,89,25', [12, 25]);
    expect(iv).toBeInstanceOf(Uint8Array);
    expect(iv.toString()).toEqual('2,47,89,25,12,25');
  });

  test('stringToInitVector should return an UintArray from the init vector string with appendix number', () => {
    const iv = stringToInitVector('2,47,89,25', 26);
    expect(iv).toBeInstanceOf(Uint8Array);
    expect(iv.toString()).toEqual('2,47,89,25,26');
  });

  test('stringToInitVector should return null with and undefined initVector', () => {
    expect(stringToInitVector()).toBe(null);
  });

  test('getAlgorithm should return the alg from the jwk if jwk.alg and jwk.crv are present', () => {
    expect(getAlgorithm({ alg: 'foo', crv: 'bar' })).toEqual('foo');
  });

  test('getAlgorithm should return the crv from the jwk if jwk.alg is not present', () => {
    expect(getAlgorithm({ crv: 'bar' })).toEqual('bar');
  });

  test('getAlgorithm should return null if jwk.alg and jwk.crv are not present', () => {
    expect(getAlgorithm({ })).toBe(null);
  });
});
