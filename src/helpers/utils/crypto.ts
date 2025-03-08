import CryptoJS from 'crypto-js';

/**
 * 密码加密工具
 */
export const cryptoUtils = {
  /**
   * MD5加密
   * @param text 需要加密的文本
   * @returns 加密后的字符串
   */
  md5: (text: string): string => {
    return CryptoJS.MD5(text).toString();
  },

  /**
   * AES加密
   * @param text 需要加密的文本
   * @param secretKey 密钥
   * @returns 加密后的字符串
   */
  encryptAES: (text: string, secretKey: string): string => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  },

  /**
   * AES解密
   * @param ciphertext 密文
   * @param secretKey 密钥
   * @returns 解密后的字符串
   */
  decryptAES: (ciphertext: string, secretKey: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  },

  /**
   * SHA256加密
   * @param text 需要加密的文本
   * @returns 加密后的字符串
   */
  sha256: (text: string): string => {
    return CryptoJS.SHA256(text).toString();
  },
};
