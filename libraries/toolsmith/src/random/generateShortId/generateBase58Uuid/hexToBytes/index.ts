import map from "../../../../array/map/index.ts"
import extractPairs from "./extractPairs/index.ts"
import parsePair from "./parsePair/index.ts"

//++ Converts a hex string to a Uint8Array of bytes
export default function hexToBytes(hexString: string): Uint8Array {
	const pairs = extractPairs(hexString)
	const bytes = map(parsePair)(pairs)

	//++ [EXCEPTION] Uint8Array constructor permitted in Toolsmith for performance - provides typed array wrapper
	return new Uint8Array(bytes)
}
