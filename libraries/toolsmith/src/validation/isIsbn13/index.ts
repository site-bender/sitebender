import type { Isbn13 } from "@sitebender/toolsmith/types/branded/index.ts"

import {
	ISBN13_CHECKSUM_MODULUS,
	ISBN13_LENGTH,
	ISBN13_VALID_CHARS,
	ISBN13_VALID_PREFIXES,
	ISBN13_WEIGHTS,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid ISBN-13
export default function isIsbn13(value: string): value is Isbn13 {
	return (
		typeof value === "string" &&
		value.length === ISBN13_LENGTH &&
		function hasValidPrefix(): boolean {
			return ISBN13_VALID_PREFIXES.some(function isValidPrefix(prefix: string): boolean {
				return value.startsWith(prefix)
			})
		}() &&
		function hasValidChars(): boolean {
			return value.split("").reduce(function checkChars(
				acc: boolean,
				char: string,
				index: number,
			): boolean {
				return acc && ISBN13_VALID_CHARS.includes(char)
			}, true)
		}() &&
		function hasValidChecksum(): boolean {
			const digits = value.split("").map(function charToDigit(char: string): number {
				return parseInt(char, 10)
			})

			const sum = digits.slice(0, 12).reduce(function calculateWeightedSum(
				acc: number,
				digit: number,
				index: number,
			): number {
				return acc + digit * ISBN13_WEIGHTS[index]
			}, 0)

			const checkDigit = (ISBN13_CHECKSUM_MODULUS - (sum % ISBN13_CHECKSUM_MODULUS)) % ISBN13_CHECKSUM_MODULUS

			return checkDigit === digits[12]
		}()
	)
}
