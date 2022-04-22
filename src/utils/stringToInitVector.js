export default function stringToInitVector(initVector, appendix = null) {
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
}
