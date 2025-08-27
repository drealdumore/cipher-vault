// examples/usage.ts
import CipherVault, {
  encrypt,
  decrypt,
  encryptWithPassword,
  decryptWithPassword,
} from "cipher-vault";

// Example 1: Basic encryption with auto-generated key
console.log("=== Basic Encryption ===");
const result = CipherVault.encrypt("Hello, World! 🔒");
console.log("Original:", "Hello, World! 🔒");
console.log("Encrypted:", result.encrypted);
console.log("Key:", result.key);

const decrypted = CipherVault.decrypt(result.encrypted, result.key);
console.log("Decrypted:", decrypted);

// Example 2: Encryption with custom key
console.log("\n=== Custom Key Encryption ===");
const customKey = CipherVault.generateKey();
const customResult = encrypt("Secret message", { key: customKey });
console.log("Original:", "Secret message");
console.log("Encrypted:", customResult.encrypted);
console.log("Decrypted:", decrypt(customResult.encrypted, customKey));

// Example 3: Password-based encryption
console.log("\n=== Password-based Encryption ===");
const password = "mySecurePassword123";
const passwordResult = encryptWithPassword("Top secret data!", password);
console.log("Original:", "Top secret data!");
console.log("Encrypted:", passwordResult.encrypted);
console.log(
  "Decrypted:",
  decryptWithPassword(passwordResult.encrypted, password)
);

// Example 4: Error handling
console.log("\n=== Error Handling ===");
try {
  CipherVault.encrypt("");
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  CipherVault.decrypt("some text", "invalid key");
} catch (error) {
  console.log("Error:", (error as Error).message);
}

