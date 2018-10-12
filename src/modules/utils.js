const stringToArrayBuffer = (str) => {
  const stringLength = str.length;
  const resultBuffer = new ArrayBuffer(stringLength);
  const resultView = new Uint8Array(resultBuffer);
  for (let i = 0; i < stringLength; i++) resultView[i] = str.charCodeAt(i);
  return resultBuffer;
};

const arrayBufferToString = (buffer) => {
  let resultString = '';
  const view = new Uint8Array(buffer);
  for (const element of view) resultString += String.fromCharCode(element);
  return resultString;
};

const stringToInitVector = (initVector, appendix = null) => {
  if (!initVector) return null;
  const ivStrings = initVector.split(',');
  if (appendix != null) {
    if (Array.isArray(appendix)) {
      ivStrings.push(...appendix);
    } else if (!Number.isNaN(parseInt(appendix, 10))) {
      ivStrings.push(appendix);
    }
  }
  const iv = new Uint8Array(ivStrings.length);
  for (let i = 0; i < ivStrings.length; i += 1) iv[i] = parseInt(ivStrings[i], 10);
  return iv;
};

const getAlgorithm = (jwk) => {
  if (jwk.alg || jwk.crv) {
    return (jwk.alg ? jwk.alg : jwk.crv);
  }
  return null;
};

export { stringToArrayBuffer, stringToInitVector, arrayBufferToString, getAlgorithm };
