import CipherVault from "./src/index";

console.log("🔐 Testing cipher-vault...\n");

console.log("=== Test 1: Basic Encryption ===");
const text1 = "Hello, cipher-vault! 🚀";
const result1 = CipherVault.encrypt(text1);
console.log(`Original: ${text1}`);
console.log(`Encrypted: ${result1.encrypted}`);
console.log(`Decrypted: ${CipherVault.decrypt(result1.encrypted, result1.key)}`);
console.log(`Match: ${CipherVault.decrypt(result1.encrypted, result1.key) === text1 ? "✅" : "❌"}\n`);

console.log("=== Test 2: Password Encryption ===");
const text2 = "Secret message with password!";
const password = "mySecretPassword123";
const result2 = CipherVault.encryptWithPassword(text2, password);
console.log(`Original: ${text2}`);
console.log(`Password: ${password}`);
console.log(`Encrypted: ${result2.encrypted}`);
console.log(`Decrypted: ${CipherVault.decryptWithPassword(result2.encrypted, password)}`);
console.log(`Match: ${CipherVault.decryptWithPassword(result2.encrypted, password) === text2 ? "✅" : "❌"}\n`);

console.log("=== Test 3: Password Consistency ===");
const result3a = CipherVault.encryptWithPassword("Same text", "samePassword");
const result3b = CipherVault.encryptWithPassword("Same text", "samePassword");
console.log(`First encryption: ${result3a.encrypted}`);
console.log(`Second encryption: ${result3b.encrypted}`);
console.log(`Keys match: ${result3a.key === result3b.key ? "✅" : "❌"}`);
console.log(`Results match: ${result3a.encrypted === result3b.encrypted ? "✅" : "❌"}\n`);

console.log("=== Test 4: Special Characters ===");
const specialText = "Hello! @#$%^&*()_+{}[]|;:,.<>? 123";
const result4 = CipherVault.encrypt(specialText);
const decrypted4 = CipherVault.decrypt(result4.encrypted, result4.key);
console.log(`Original: ${specialText}`);
console.log(`Encrypted: ${result4.encrypted}`);
console.log(`Decrypted: ${decrypted4}`);
console.log(`Match: ${decrypted4 === specialText ? "✅" : "❌"}\n`);

console.log("🎉 Testing complete!");