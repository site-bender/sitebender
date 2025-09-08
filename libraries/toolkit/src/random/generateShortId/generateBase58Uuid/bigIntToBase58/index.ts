import unfold from "../../../../simple/array/unfold/index.ts"
import reverse from "../../../../simple/array/reverse/index.ts"

const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

//++ Converts a BigInt to Base58 encoded string array
export default function bigIntToBase58(value: bigint): Array<string> {
	function generateDigits(current: bigint): Array<string> {
		return unfold(function nextDigit(remaining: bigint) {
			return remaining > 0n
				? [BASE58_ALPHABET[Number(remaining % 58n)], remaining / 58n]
				: null
		})(current)
	}

	return reverse(generateDigits(value))
}

//?? [EXAMPLE] bigIntToBase58(0n) // []
//?? [EXAMPLE] bigIntToBase58(58n) // ["2", "1"]
//?? [EXAMPLE] bigIntToBase58(3364n) // ["2", "1", "1"]
/*??
 * [GOTCHA] Returns empty array for 0n
 */