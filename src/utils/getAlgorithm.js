export default getAlgorithm = (jwk) => {
  if (jwk.alg || jwk.crv) {
    return (jwk.alg ? jwk.alg : jwk.crv);
  }
  return null;
};
