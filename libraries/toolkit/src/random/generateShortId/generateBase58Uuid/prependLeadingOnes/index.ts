import takeWhile from "../../../../simple/array/takeWhile/index.ts"
import map from "../../../../simple/array/map/index.ts"
import { BASE58_ALPHABET } from "../constants/index.ts"

//++ Prepends '1' characters for leading zero bytes in Base58 encoding
export default function prependLeadingOnes(bytes: Uint8Array) {
	return function withLeadingOnes(chars: Array<string>): Array<string> {
		const leadingZeros = takeWhile(function isZero(byte: number) {
			return byte === 0
		})(Array.from(bytes))
		
		const leadingOnes = map(function toOne() {
			return BASE58_ALPHABET[0]
		})(leadingZeros)
		
		return [...leadingOnes, ...chars]
	}
}

//?? [EXAMPLE] prependLeadingOnes(new Uint8Array([0, 0, 255]))(["F", "F"]) // ["1", "1", "F", "F"]
//?? [EXAMPLE] prependLeadingOnes(new Uint8Array([255]))(["F", "F"]) // ["F", "F"]
//?? [GOTCHA] Base58 convention requires '1' for each leading zero byte