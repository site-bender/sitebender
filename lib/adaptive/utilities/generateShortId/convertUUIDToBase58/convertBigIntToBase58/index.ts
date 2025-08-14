/**
 * Base58 alphabet (excludes 0, O, I, l to avoid confusion)
 */
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const len = BigInt(BASE58.length)

/**
 * Converts a BigInt to base58 string
 *
 * @param bigInt - The BigInt to convert
 * @returns Base58 encoded string
 * @example
 * ```typescript
 * convertBigIntToBase58(123456789n) // "BukQL93"
 * convertBigIntToBase58(0n) // ""
 * ```
 */
export default function convertBigIntToBase58(bigInt: bigint): string {
	const convert = (n: bigint, out: string): string => {
		return n > 0
			? convert(
				n / len,
				BASE58[parseInt((n % len).toString(), 10)] + out
			)
			: out
	}
	return convert(bigInt, "")
}

export { convertBigIntToBase58 }
