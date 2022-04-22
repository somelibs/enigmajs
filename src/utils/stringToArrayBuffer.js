export default function stringToArrayBuffer(str) {
  const stringLength = str.length;
  const resultBuffer = new ArrayBuffer(stringLength);
  const resultView = new Uint8Array(resultBuffer);
  for (let i = 0; i < stringLength; i += 1) resultView[i] = str.charCodeAt(i);
  return resultBuffer;
}
