import randomBytes from 'random-bytes';

class Random {

  static iv(bytes = 12) {
    return randomBytes(bytes);
  }

  static async string() {
    const randomIv = await this.iv();
    return btoa(String.fromCharCode.apply(null, randomIv));
  }

  static async ivString() {
    const iv = await this.iv();
    return iv.join(',');
  }

}

export default Random;
