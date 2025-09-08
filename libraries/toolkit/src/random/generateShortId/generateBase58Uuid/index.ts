import replaceAll from "../../../simple/string/replaceAll/index.ts"
import reduce from "../../../simple/array/reduce/index.ts"
import unfold from "../../../simple/array/unfold/index.ts"
import takeWhile from "../../../simple/array/takeWhile/index.ts"
import pipe from "../../../simple/combinator/pipe/index.ts"
import reverse from "../../../simple/array/reverse/index.ts"
import join from "../../../simple/array/join/index.ts"
import map from "../../../simple/array/map/index.ts"

//++ Generates a Base58-encoded UUID v4
export default function generateBase58Uuid(): string {
	const BASE58_ALPHABET =
		"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

	function stripHyphens(uuid: string): string {
		return replaceAll("-")("")(uuid)
	}

	function hexToBytes(hexString: string): Uint8Array {
		function extractPairs(hex: string): Array<string> {
			return unfold((remaining: string) => 
				remaining.length >= 2
					? [remaining.slice(0, 2), remaining.slice(2)]
					: null
			)(hex)
		}

		function parsePair(pair: string): number {
			return parseInt(pair, 16)
		}

		const pairs = extractPairs(hexString)
		const bytes = map(parsePair)(pairs)
		return new Uint8Array(bytes)
	}

	function bytesToBigInt(bytes: Uint8Array): bigint {
		return reduce((accumulated: bigint, byte: number): bigint => 
			accumulated * 256n + BigInt(byte)
		)(0n)(Array.from(bytes))
	}

	function bigIntToBase58(value: bigint): Array<string> {
		function generateDigits(current: bigint): Array<string> {
			return unfold((remaining: bigint) =>
				remaining > 0n
					? [BASE58_ALPHABET[Number(remaining % 58n)], remaining / 58n]
					: null
			)(current)
		}

		return reverse(generateDigits(value))
	}

	function prependLeadingOnes(bytes: Uint8Array): (chars: Array<string>) => Array<string> {
		return function withLeadingOnes(chars: Array<string>): Array<string> {
			const leadingZeros = takeWhile((byte: number) => byte === 0)(Array.from(bytes))
			const leadingOnes = map(() => BASE58_ALPHABET[0])(leadingZeros)
			return [...leadingOnes, ...chars]
		}
	}

	return pipe([
		stripHyphens,
		hexToBytes,
		function encodeToBase58(bytes: Uint8Array): string {
			const bigIntValue = bytesToBigInt(bytes)
			const base58Chars = bigIntToBase58(bigIntValue)
			const withLeading = prependLeadingOnes(bytes)(base58Chars)
			return join("")(withLeading)
		}
	])(crypto.randomUUID())
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
