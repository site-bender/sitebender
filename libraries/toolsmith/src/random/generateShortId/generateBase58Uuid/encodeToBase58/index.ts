import join from "../../../../array/join/index.ts"
import bigIntToBase58 from "../bigIntToBase58/index.ts"
import bytesToBigInt from "../bytesToBigInt/index.ts"
import prependLeadingOnes from "../prependLeadingOnes/index.ts"

//++ Encodes a byte array to a Base58 string with proper leading ones
export default function encodeToBase58(bytes: Uint8Array): string {
	const bigIntValue = bytesToBigInt(bytes)
	const base58Chars = bigIntToBase58(bigIntValue)
	const withLeading = prependLeadingOnes(bytes)(base58Chars)

	return join("")(withLeading) as string
}
