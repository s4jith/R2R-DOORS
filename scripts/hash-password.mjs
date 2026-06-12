#!/usr/bin/env node
/**
 * Generates a bcrypt hash for the admin password, or verifies a password against a hash.
 *
 * Usage:
 *   npm run hash-password -- "your-strong-password"
 *   npm run hash-password -- "password" "base64-encoded-hash"   # verify mode
 *   npm run hash-password            # prompts for input
 *
 * IMPORTANT: The hash must be base64-encoded before adding to .env!
 * Bcrypt hashes start with $2b$... which breaks dotenv parsing.
 * Copy the BASE64 hash printed below into ADMIN_PASSWORD_HASH.
 */
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const SALT_ROUNDS = 12;

async function getPassword(prompt = "Enter admin password: ") {
  const rl = createInterface({ input: stdin, output: stdout });
  const answer = await rl.question(prompt);
  rl.close();
  return answer;
}

const args = process.argv.slice(2);
const password = args[0];
const hashToVerify = args[1];

// Verify mode: check password against existing hash
if (password && hashToVerify) {
  try {
    // Assume input is base64-encoded hash, decode it first
    let hashToCheck = hashToVerify;
    try {
      hashToCheck = Buffer.from(hashToVerify, 'base64').toString('utf-8');
    } catch {
      // If not valid base64, use as-is
    }
    const matches = await bcrypt.compare(password, hashToCheck);
    console.log(
      matches
        ? "\n✓ Password matches the hash.\n"
        : "\n✗ Password does NOT match the hash.\n"
    );
    process.exit(matches ? 0 : 1);
  } catch {
    console.error("Error: invalid hash format.");
    process.exit(1);
  }
}

// Generate mode
const plainPassword = password || (await getPassword());

if (!plainPassword?.trim()) {
  console.error("Error: password must not be empty.");
  process.exit(1);
}

const hash = await bcrypt.hash(plainPassword.trim(), SALT_ROUNDS);
const base64Hash = Buffer.from(hash).toString('base64');

console.log("\n✓ Bcrypt Hash (bcrypt format):\n" + hash);
console.log("\n✓ Base64-Encoded (for .env):\nADMIN_PASSWORD_HASH=" + base64Hash);
console.log(
  "\nℹ  The base64 version is required in .env because bcrypt hashes start with $2b$ which breaks dotenv parsing."
);

// Show that verification works with the generated hash
const verified = await bcrypt.compare(plainPassword.trim(), hash);
if (verified) {
  console.log("✓ Hash verified successfully with the password.\n");
}
