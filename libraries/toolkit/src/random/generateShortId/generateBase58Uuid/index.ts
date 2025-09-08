//++ Generates a Base58-encoded UUID v4
export default function generateBase58Uuid(): string {
	const uuid = crypto.randomUUID()
	const hex = uuid.replace(/-/g, "")

	const bytes = new Uint8Array(hex.length / 2)
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
	}

	const alphabet =
		"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

	let value = 0n
	for (const byte of bytes) {
		value = value * 256n + BigInt(byte)
	}

	let result = ""
	const base = BigInt(alphabet.length)

	while (value > 0n) {
		const remainder = Number(value % base)
		result = alphabet[remainder] + result
		value = value / base
	}

	for (const byte of bytes) {
		if (byte === 0) {
			result = alphabet[0] + result
		} else {
			break
		}
	}

	return result
}

//?? [EXAMPLE] generateBase58Uuid() // "4Kh8gTjX9pQ2mN7yR3Wz"
//?? [EXAMPLE] generateBase58Uuid() // "7Bx3mPq5vN2jK8Ht6Yz" (different each time)
/*??
 * [EXAMPLE]
 * const id1 = generateBase58Uuid()
 * const id2 = generateBase58Uuid()
 * console.log(id1 === id2) // false
 *
 * const filename = `upload_${generateBase58Uuid()}.jpg`
 * // "upload_9Ht6Yz3mPq5vN2j.jpg"
 */
