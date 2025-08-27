export interface CipherOptions {
  key?: string;
  caseSensitive?: boolean;
}

export interface EncryptionResult {
  encrypted: string;
  key: string;
}

export class CipherVault {
  private static readonly DEFAULT_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  static generateKey(alphabet: string = CipherVault.DEFAULT_ALPHABET): string {
    const chars = alphabet.split("");
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
  }

  private static createCipherMap(
    originalAlphabet: string,
    keyAlphabet: string
  ): Map<string, string> {
    const map = new Map<string, string>();
    for (let i = 0; i < originalAlphabet.length; i++) {
      map.set(originalAlphabet[i], keyAlphabet[i] || originalAlphabet[i]);
    }
    return map;
  }

  static encrypt(text: string, options: CipherOptions = {}): EncryptionResult {
    if (!text) {
      throw new Error("Text cannot be empty");
    }

    const alphabet = CipherVault.DEFAULT_ALPHABET;
    const key = options.key || CipherVault.generateKey(alphabet);

    if (key.length !== alphabet.length) {
      throw new Error("Key must be the same length as the alphabet");
    }

    const cipherMap = CipherVault.createCipherMap(alphabet, key);
    let encrypted = "";
    
    for (const char of text) {
      if (options.caseSensitive === false) {
        const lowerChar = char.toLowerCase();
        const upperChar = char.toUpperCase();
        if (cipherMap.has(lowerChar)) {
          encrypted += cipherMap.get(lowerChar)!;
        } else if (cipherMap.has(upperChar)) {
          encrypted += cipherMap.get(upperChar)!;
        } else {
          encrypted += char;
        }
      } else {
        encrypted += cipherMap.get(char) || char;
      }
    }

    return { encrypted, key };
  }

  static decrypt(
    encryptedText: string,
    key: string,
    options: CipherOptions = {}
  ): string {
    if (!encryptedText || !key) {
      throw new Error("Encrypted text and key are required");
    }

    const alphabet = CipherVault.DEFAULT_ALPHABET;
    if (key.length !== alphabet.length) {
      throw new Error("Invalid key length");
    }

    const reverseCipherMap = CipherVault.createCipherMap(key, alphabet);
    let decrypted = "";
    
    for (const char of encryptedText) {
      if (options.caseSensitive === false) {
        const lowerChar = char.toLowerCase();
        const upperChar = char.toUpperCase();
        if (reverseCipherMap.has(lowerChar)) {
          decrypted += reverseCipherMap.get(lowerChar)!;
        } else if (reverseCipherMap.has(upperChar)) {
          decrypted += reverseCipherMap.get(upperChar)!;
        } else {
          decrypted += char;
        }
      } else {
        decrypted += reverseCipherMap.get(char) || char;
      }
    }

    return decrypted;
  }

  static encryptWithPassword(text: string, password: string): EncryptionResult {
    if (!password) {
      throw new Error("Password is required");
    }
    const key = CipherVault.deriveKeyFromPassword(password);
    return CipherVault.encrypt(text, { key });
  }

  static decryptWithPassword(encryptedText: string, password: string): string {
    if (!password) {
      throw new Error("Password is required");
    }
    const key = CipherVault.deriveKeyFromPassword(password);
    return CipherVault.decrypt(encryptedText, key);
  }

  private static deriveKeyFromPassword(password: string): string {
    const alphabet = CipherVault.DEFAULT_ALPHABET;
    let hash = 0;
    
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    const seededRandom = CipherVault.seededRandomGenerator(Math.abs(hash));
    const chars = alphabet.split("");
    
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join("");
  }

  private static seededRandomGenerator(seed: number): () => number {
    return function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  static isValidKey(key: string): boolean {
    const alphabet = CipherVault.DEFAULT_ALPHABET;
    return key.length === alphabet.length && new Set(key).size === key.length;
  }
}

export default CipherVault;
export const encrypt = CipherVault.encrypt;
export const decrypt = CipherVault.decrypt;
export const generateKey = CipherVault.generateKey;
export const encryptWithPassword = CipherVault.encryptWithPassword;
export const decryptWithPassword = CipherVault.decryptWithPassword;
