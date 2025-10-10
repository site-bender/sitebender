import type { Isbn10 } from "@sitebender/toolsmith/types/branded/index.ts"

import {
	ISBN10_CHECKSUM_MODULUS,
	ISBN10_LENGTH,
	ISBN10_VALID_CHARS,
	ISBN10_WEIGHTS,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid ISBN-10
export default function _isIsbn10(value: string): value is Isbn10 {
	return (
		typeof value === "string" &&
		value.length === ISBN10_LENGTH &&
		function hasValidChars(): boolean {
			return value.split("").reduce(function checkChars(
				acc: boolean,
				char: string,
				index: number,
			): boolean {
				// X is only allowed in the check digit position (last character)
				const isValidChar = index === 9 ? (char === "X" || /[0-9]/.test(char)) : /[0-9]/.test(char)
				return acc && isValidChar
			}, true)
		}() &&
		function hasValidChecksum(): boolean {
			const digits = value.split("").map(function charToDigit(char: string): number {
				return char === "X" ? 10 : parseInt(char, 10)
			})

			const sum = digits.reduce(function calculateWeightedSum(
				acc: number,
				digit: number,
				index: number,
			): number {
				return acc + digit * ISBN10_WEIGHTS[index]
			}, 0)

			return sum % ISBN10_CHECKSUM_MODULUS === 0
		}()
	)
}
