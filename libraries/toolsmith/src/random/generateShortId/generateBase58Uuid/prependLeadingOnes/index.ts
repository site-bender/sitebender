import map from "../../../../array/map/index.ts"
import takeWhile from "../../../../array/takeWhile/index.ts"
import { BASE58_ALPHABET } from "../constants/index.ts"

//++ Prepends '1' characters for leading zero bytes in Base58 encoding
export default function prependLeadingOnes(bytes: Uint8Array) {
	return function withLeadingOnes(chars: Array<string>): Array<string> {
		//++ [EXCEPTION] === operator permitted in Toolsmith for performance - provides zero byte checking wrapper
		const leadingZeros = takeWhile(function isZero(byte: number) {
			return byte === 0
			//++ [EXCEPTION] Array.from permitted in Toolsmith for performance - provides Uint8Array to array conversion wrapper
		})(Array.from(bytes))

		//++ [EXCEPTION] [] operator permitted in Toolsmith for performance - provides array indexing wrapper
		const leadingOnes = map(function toOne() {
			return BASE58_ALPHABET[0]
		})(leadingZeros)

		return [...leadingOnes, ...chars]
	}
}
