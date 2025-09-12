import join from "../../../array/join/index.ts"
import map from "../../../array/map/index.ts"
import reduce from "../../../array/reduce/index.ts"
import split from "../../../string/split/index.ts"
import test from "../../../string/test/index.ts"

//++ Validates IBAN checksum using mod-97 algorithm
export default function validateMod97(iban: string): boolean {
	const LETTER_PATTERN = /[A-Z]/

	// Move first 4 characters to end
	const rearranged = iban.substring(4) + iban.substring(0, 4)

	// Convert letters to numbers (A=10, B=11, ..., Z=35)
	const chars = split("")(rearranged)
	const mapped = map((char: string) =>
		test(LETTER_PATTERN)(char) ? (char.charCodeAt(0) - 55).toString() : char
	)(chars)
	const numericIban = join("")(mapped)

	// Calculate mod 97 using string arithmetic to handle large numbers
	const digits = split("")(numericIban)
	const remainder = reduce(
		(acc: number, digit: string) => (acc * 10 + parseInt(digit, 10)) % 97,
	)(0)(digits)

	return remainder === 1
}

//?? [EXAMPLE] validateMod97("GB82WEST12345698765432") // true (valid checksum)
//?? [EXAMPLE] validateMod97("GB82WEST12345698765433") // false (invalid checksum)
