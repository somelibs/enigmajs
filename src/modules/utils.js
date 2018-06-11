const stringToArrayBuffer = (string) => {
  // Chrome and Firefox
  if ('TextDecoder' in window) {
    const enc = new TextEncoder();
    return enc.encode(string);
  }

  // Edge
  const strUtf8 = unescape(encodeURIComponent(string));
  const ab = new Uint8Array(strUtf8.length);
  for (let i = 0; i < strUtf8.length; i += 1) {
    ab[i] = strUtf8.charCodeAt(i);
  }
  return ab;

};

const arrayBufferToString = (arrayBuffer) => {
  // Chrome and Firefox
  if ('TextDecoder' in window) {
    const decoder = new TextDecoder();
    return decoder.decode(arrayBuffer);
  }

  // Edge
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = '';
  for (let i = 0; i < byteArray.byteLength; i += 1) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  return decodeURIComponent(byteString);

};

const stringToInitVector = (initVector, appendix = null) => {
  if (!initVector) {
    return null;
  }
  const ivStrings = initVector.split(',');
  if (appendix != null) {
    if (Array.isArray(appendix)) {
      ivStrings.push(...appendix);
    } else if (!Number.isNaN(parseInt(appendix, 10))) {
      ivStrings.push(appendix);
    }
  }
  const iv = new Uint8Array(ivStrings.length);
  for (let i = 0; i < ivStrings.length; i += 1) {
    iv[i] = parseInt(ivStrings[i], 10);
  }
  return iv;
};

const getAlgorithm = (jwk) => {
  if (jwk.alg || jwk.crv) {
    return (jwk.alg ? jwk.alg : jwk.crv);
  }
  return null;
};

export { stringToArrayBuffer, stringToInitVector, arrayBufferToString, getAlgorithm };
