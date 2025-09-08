import join from "../../../../simple/array/join/index.ts"
import bytesToBigInt from "../bytesToBigInt/index.ts"
import bigIntToBase58 from "../bigIntToBase58/index.ts"
import prependLeadingOnes from "../prependLeadingOnes/index.ts"

//++ Encodes a byte array to a Base58 string with proper leading ones
export default function encodeToBase58(bytes: Uint8Array): string {
	const bigIntValue = bytesToBigInt(bytes)
	const base58Chars = bigIntToBase58(bigIntValue)
	const withLeading = prependLeadingOnes(bytes)(base58Chars)

	return join("")(withLeading)
}

//?? [EXAMPLE] encodeToBase58(new Uint8Array([0, 0, 255])) // "11JL"
//?? [EXAMPLE] encodeToBase58(new Uint8Array([255, 255, 255])) // "2UzHL"