export default arrayBufferToString = (buffer) => {
  let resultString = '';
  const view = new Uint8Array(buffer);
  for (const element of view) resultString += String.fromCharCode(element);
  return resultString;
};
