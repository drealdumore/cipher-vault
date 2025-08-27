
/**
 * CipherVault - A lightweight and secure JavaScript library for text encryption
 * Uses substitution cipher with customizable key generation
 */

export interface CipherOptions {
  key?: string;
  shuffle?: boolean;
  caseSensitive?: boolean;
}

export interface EncryptionResult {
  encrypted: string;
  key: string;
}

export class CipherVault {
  private static readonly DEFAULT_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  /**
   * Generate a random substitution key
   */
  static generateKey(alphabet: string = CipherVault.DEFAULT_ALPHABET): string {
    const chars = alphabet.split("");

    // Fisher-Yates shuffle algorithm
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join("");
  }

  /**
   * Create substitution cipher mapping
   */
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

  /**
   * Encrypt text using substitution cipher
   */
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

    return {
      encrypted,
      key,
    };
  }

  /**
   * Decrypt text using substitution cipher
   */
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

    // Create reverse cipher map (key -> original)
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

  /**
   * Encrypt with a password-based key (simplified key derivation)
   */
  static encryptWithPassword(text: string, password: string): EncryptionResult {
    if (!password) {
      throw new Error("Password is required");
    }

    // Simple key derivation from password (you might want to use a proper KDF in production)
    const key = CipherVault.deriveKeyFromPassword(password);

    return CipherVault.encrypt(text, { key });
  }

  /**
   * Decrypt with a password-based key
   */
  static decryptWithPassword(encryptedText: string, password: string): string {
    if (!password) {
      throw new Error("Password is required");
    }

    const key = CipherVault.deriveKeyFromPassword(password);

    return CipherVault.decrypt(encryptedText, key);
  }

  /**
   * Simple password-based key derivation (use proper KDF in production)
   */
  private static deriveKeyFromPassword(password: string): string {
    const alphabet = CipherVault.DEFAULT_ALPHABET;

    // Simple hash-like transformation of password
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Use hash as seed for reproducible "random" key generation
    const seededRandom = CipherVault.seededRandomGenerator(Math.abs(hash));
    const chars = alphabet.split("");

    // Seeded Fisher-Yates shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join("");
  }

  /**
   * Simple seeded random number generator
   */
  private static seededRandomGenerator(seed: number): () => number {
    return function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  /**
   * Validate if a string can be decrypted with given key
   */
  static isValidKey(key: string): boolean {
    const alphabet = CipherVault.DEFAULT_ALPHABET;
    return key.length === alphabet.length && new Set(key).size === key.length;
  }
}

// Export default instance methods for convenience
export default CipherVault;

// Additional utility functions
export const encrypt = CipherVault.encrypt;
export const decrypt = CipherVault.decrypt;
export const generateKey = CipherVault.generateKey;
export const encryptWithPassword = CipherVault.encryptWithPassword;
export const decryptWithPassword = CipherVault.decryptWithPassword;
