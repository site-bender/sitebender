import map from "../../../../simple/array/map/index.ts"
import extractPairs from "./extractPairs/index.ts"
import parsePair from "./parsePair/index.ts"

//++ Converts a hex string to a Uint8Array of bytes
export default function hexToBytes(hexString: string): Uint8Array {
	const pairs = extractPairs(hexString)
	const bytes = map(parsePair)(pairs)

	return new Uint8Array(bytes)
}

//?? [EXAMPLE] hexToBytes("ff00") // Uint8Array([255, 0])
//?? [EXAMPLE] hexToBytes("deadbeef") // Uint8Array([222, 173, 190, 239])
//?? [EXAMPLE] hexToBytes("12345") // Uint8Array([18, 52]) - last "5" is dropped
//?? [GOTCHA] Odd-length strings drop the last character
