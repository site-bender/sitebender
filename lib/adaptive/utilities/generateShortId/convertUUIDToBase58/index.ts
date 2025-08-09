import convertBigIntToBase58 from "./convertBigIntToBase58/index.ts"

/**
 * Converts a UUID string to base58 format
 *
 * @param uuid - UUID string to convert
 * @returns Base58 encoded string
 */
export default function convertUUIDToBase58(uuid: string): string {
	const bigInt = BigInt(`0x${uuid.replace(/-/g, "")}`)
	return convertBigIntToBase58(bigInt)
}

export { convertUUIDToBase58 }
