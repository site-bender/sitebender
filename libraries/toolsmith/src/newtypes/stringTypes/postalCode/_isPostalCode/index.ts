import type { PostalCode } from "@sitebender/toolsmith/types/branded/index.ts"

import {
	POSTAL_CODE_HYPHEN_POSITION,
	POSTAL_CODE_VALID_CHARS,
	POSTAL_CODE_ZIP10_LENGTH,
	POSTAL_CODE_ZIP5_LENGTH,
	POSTAL_CODE_ZIP9_LENGTH,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid US ZIP code
export default function _isPostalCode(value: string): value is PostalCode {
	return (
		typeof value === "string" &&
		function hasValidLength(): boolean {
			return (
				value.length === POSTAL_CODE_ZIP5_LENGTH ||
				value.length === POSTAL_CODE_ZIP9_LENGTH ||
				value.length === POSTAL_CODE_ZIP10_LENGTH
			)
		}() &&
		function hasValidFormat(): boolean {
			if (value.length === POSTAL_CODE_ZIP5_LENGTH) {
				// 5-digit ZIP: all digits
				return value.split("").reduce(function checkDigits(
					acc: boolean,
					char: string,
				): boolean {
					return acc && POSTAL_CODE_VALID_CHARS.includes(char)
				}, true)
			} else if (value.length === POSTAL_CODE_ZIP9_LENGTH) {
				// 9-digit ZIP: all digits
				return value.split("").reduce(function checkDigits(
					acc: boolean,
					char: string,
				): boolean {
					return acc && POSTAL_CODE_VALID_CHARS.includes(char)
				}, true)
			} else if (value.length === POSTAL_CODE_ZIP10_LENGTH) {
				// ZIP+4 format: 12345-6789
				return (
					value.charAt(POSTAL_CODE_HYPHEN_POSITION) === "-" &&
					function checkFirstPart(): boolean {
						return value.substring(0, POSTAL_CODE_HYPHEN_POSITION).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && POSTAL_CODE_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkSecondPart(): boolean {
						return value.substring(POSTAL_CODE_HYPHEN_POSITION + 1).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && POSTAL_CODE_VALID_CHARS.includes(char)
						}, true)
					}()
				)
			}
			return false
		}()
	)
}
