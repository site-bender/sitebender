import encodeBase58 from "./encodeBase58/index.ts"

export default function generateShortId(): string {
	// Generate a UUID v4 using crypto API
	const uuid = crypto.randomUUID()

	// Remove dashes and convert to Base58
	const hexString = uuid.replace(/-/g, "")
	const base58Encoded = encodeBase58(hexString)

	// Prepend underscore
	return `_${base58Encoded}`
}
