import reverse from "../../../../array/reverse/index.ts"
import unfold from "../../../../array/unfold/index.ts"
import { BASE58_ALPHABET } from "../constants/index.ts"

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
