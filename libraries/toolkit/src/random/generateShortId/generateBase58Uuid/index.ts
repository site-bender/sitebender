import pipe from "../../../simple/combinator/pipe/index.ts"
import join from "../../../simple/array/join/index.ts"
import stripHyphens from "./stripHyphens/index.ts"
import hexToBytes from "./hexToBytes/index.ts"
import bytesToBigInt from "./bytesToBigInt/index.ts"
import bigIntToBase58 from "./bigIntToBase58/index.ts"
import prependLeadingOnes from "./prependLeadingOnes/index.ts"

//++ Generates a Base58-encoded UUID v4
export default function generateBase58Uuid(): string {
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
