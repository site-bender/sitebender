import convertBigIntToBase58 from "./convertBigIntToBase58/index.ts"

/**
 * Converts a UUID string to base58 format
 *
 * @param uuid - UUID string to convert (with or without hyphens)
 * @returns Base58 encoded string
 * @example
 * ```typescript
 * convertUuidToBase58("550e8400-e29b-41d4-a716-446655440000") // "6R7VqQc7v8Z..."
 * ```
 */
export default function convertUuidToBase58(uuid: string): string {
	const bigInt = BigInt(`0x${uuid.replace(/-/g, "")}`)

	return convertBigIntToBase58(bigInt)
}

export { convertUuidToBase58 }
