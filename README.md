# 🔐 cipher-vault

A lightweight and secure JavaScript library for encrypting and decrypting text using a substitution cipher. Whether you're safeguarding sensitive data in web applications or adding encryption to your server-side projects, `cipher-vault` is designed to be fast, reliable, and easy to use. ⚡

## 🚀 Quick Start

```javascript
import CipherVault from 'cipher-vault';

// Basic encryption
const result = CipherVault.encrypt("Hello, World!");
console.log(result.encrypted); // Encrypted text
console.log(CipherVault.decrypt(result.encrypted, result.key)); // "Hello, World!"

// Password-based encryption
const encrypted = CipherVault.encryptWithPassword("Secret message", "myPassword");
const decrypted = CipherVault.decryptWithPassword(encrypted.encrypted, "myPassword");
```

## 📦 Installation

```bash
npm install cipher-vault
```

## 🔧 Usage

### Basic Encryption/Decryption

```javascript
import CipherVault from 'cipher-vault';

// Encrypt with auto-generated key
const result = CipherVault.encrypt("Hello, cipher-vault! 🚀");
console.log('Encrypted:', result.encrypted);
console.log('Key:', result.key);

// Decrypt using the key
const decrypted = CipherVault.decrypt(result.encrypted, result.key);
console.log('Decrypted:', decrypted); // "Hello, cipher-vault! 🚀"
```

### Password-Based Encryption

```javascript
// Encrypt with password
const text = "Secret message with password!";
const password = "mySecretPassword123";
const result = CipherVault.encryptWithPassword(text, password);

console.log('Encrypted:', result.encrypted);

// Decrypt with same password
const decrypted = CipherVault.decryptWithPassword(result.encrypted, password);
console.log('Decrypted:', decrypted); // "Secret message with password!"
```

### Custom Key Encryption

```javascript
// Generate a custom key
const customKey = CipherVault.generateKey();

// Encrypt with custom key
const result = CipherVault.encrypt("Custom key message", { key: customKey });
console.log('Encrypted:', result.encrypted);

// Decrypt with the same key
const decrypted = CipherVault.decrypt(result.encrypted, customKey);
console.log('Decrypted:', decrypted);
```

### TypeScript Support

```typescript
import CipherVault, { EncryptionResult, CipherOptions } from 'cipher-vault';

const options: CipherOptions = {
  caseSensitive: true
};

const result: EncryptionResult = CipherVault.encrypt("TypeScript example", options);
const decrypted: string = CipherVault.decrypt(result.encrypted, result.key);
```

## 📚 API Reference

### `CipherVault.encrypt(text, options?)`

Encrypts text using substitution cipher.

**Parameters:**
- `text` (string): Text to encrypt
- `options` (CipherOptions, optional): Encryption options
  - `key` (string): Custom substitution key
  - `caseSensitive` (boolean): Case sensitivity flag

**Returns:** `EncryptionResult`
- `encrypted` (string): Encrypted text
- `key` (string): Substitution key used

### `CipherVault.decrypt(encryptedText, key, options?)`

Decrypts text using substitution cipher.

**Parameters:**
- `encryptedText` (string): Text to decrypt
- `key` (string): Substitution key
- `options` (CipherOptions, optional): Decryption options

**Returns:** `string` - Decrypted text

### `CipherVault.encryptWithPassword(text, password)`

Encrypts text using password-derived key.

**Parameters:**
- `text` (string): Text to encrypt
- `password` (string): Password for key derivation

**Returns:** `EncryptionResult`

### `CipherVault.decryptWithPassword(encryptedText, password)`

Decrypts text using password-derived key.

**Parameters:**
- `encryptedText` (string): Text to decrypt
- `password` (string): Password for key derivation

**Returns:** `string` - Decrypted text

### `CipherVault.generateKey(alphabet?)`

Generates a random substitution key.

**Parameters:**
- `alphabet` (string, optional): Custom alphabet to use

**Returns:** `string` - Random substitution key

### `CipherVault.isValidKey(key)`

Validates if a key is valid for decryption.

**Parameters:**
- `key` (string): Key to validate

**Returns:** `boolean` - True if key is valid

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run the playground script:

```bash
npm run playground
```

## 🔒 Security Notes

- This library uses substitution cipher, which is suitable for basic text obfuscation
- For production applications requiring strong security, consider using established cryptographic libraries
- Password-based key derivation uses a simple hash function - consider proper KDF for sensitive data
- Keys are deterministic when using password-based encryption

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for secure text encryption**