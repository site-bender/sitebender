/**
 * Base58 alphabet (excludes 0, O, I, l to avoid confusion)
 */
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const len = BigInt(BASE58.length)

/**
 * Recursively converts a BigInt to base58 string
 *
 * @param bigInt - The BigInt to convert
 * @param out - Accumulator for the output string
 * @returns Base58 encoded string
 */
export default function convertBigIntToBase58(
	bigInt: bigint,
	out = "",
): string {
	return bigInt > 0
		? convertBigIntToBase58(
			bigInt / len,
			BASE58[parseInt((bigInt % len).toString(), 10)] + out,
		)
		: out
}

export { convertBigIntToBase58 }
