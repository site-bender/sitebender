/**
 * Generates a Base58-encoded UUID v4
 *
 * Creates a cryptographically secure random UUID and converts it to Base58
 * encoding for a more compact and readable representation. Base58 excludes
 * similar-looking characters (0, O, I, l) making it ideal for user-facing
 * identifiers. The result is shorter than the standard UUID format while
 * maintaining uniqueness and randomness.
 *
 * ⚠️ IMPURE: This function is non-deterministic and depends on the crypto API.
 * It will return a different value each time it's called.
 *
 * @returns Base58-encoded UUID string
 * @example
 * ```typescript
 * // Basic usage
 * generateBase58Uuid()  // "4Kh8gTjX9pQ2mN7yR3Wz"
 * generateBase58Uuid()  // "7Bx3mPq5vN2jK8Ht6Yz" (different each time)
 * 
 * // Each call produces unique identifier
 * const id1 = generateBase58Uuid()
 * const id2 = generateBase58Uuid()
 * console.log(id1 === id2) // false
 * 
 * // Use for unique filenames
 * const filename = `upload_${generateBase58Uuid()}.jpg`
 * // "upload_9Ht6Yz3mPq5vN2j.jpg"
 * ```
 * @impure
 */
const generateBase58Uuid = (): string => {
	// Generate a cryptographically secure UUID v4
	const uuid = crypto.randomUUID()

	// Remove hyphens and convert to hex buffer
	const hex = uuid.replace(/-/g, "")

	// Convert hex string to bytes
	const bytes = new Uint8Array(hex.length / 2)
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
	}

	// Base58 alphabet (Bitcoin alphabet - excludes 0, O, I, l)
	const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

	// Convert bytes to big integer
	let value = 0n
	for (const byte of bytes) {
		value = value * 256n + BigInt(byte)
	}

	// Convert to Base58
	let result = ""
	const base = BigInt(alphabet.length)

	while (value > 0n) {
		const remainder = Number(value % base)
		result = alphabet[remainder] + result
		value = value / base
	}

	// Handle leading zeros in the byte array
	for (const byte of bytes) {
		if (byte === 0) {
			result = alphabet[0] + result
		} else {
			break
		}
	}

	return result
}

export default generateBase58Uuid
