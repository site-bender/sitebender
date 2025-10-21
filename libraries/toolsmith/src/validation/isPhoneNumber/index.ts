import type { PhoneNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import {
	PHONE_NUMBER_CLOSE_PAREN_POSITION,
	PHONE_NUMBER_FIRST_HYPHEN_POSITION,
	PHONE_NUMBER_HYPHENATED_LENGTH,
	PHONE_NUMBER_INTERNATIONAL_FIRST_HYPHEN_POSITION,
	PHONE_NUMBER_INTERNATIONAL_LENGTH,
	PHONE_NUMBER_INTERNATIONAL_SECOND_HYPHEN_POSITION,
	PHONE_NUMBER_INTERNATIONAL_THIRD_HYPHEN_POSITION,
	PHONE_NUMBER_LENGTH,
	PHONE_NUMBER_OPEN_PAREN_POSITION,
	PHONE_NUMBER_PARENTHESES_HYPHEN_POSITION,
	PHONE_NUMBER_PARENTHESES_LENGTH,
	PHONE_NUMBER_SECOND_HYPHEN_POSITION,
	PHONE_NUMBER_SPACE_POSITION,
	PHONE_NUMBER_VALID_CHARS,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid US phone number
export default function isPhoneNumber(value: string): value is PhoneNumber {
	return (
		typeof value === "string" &&
		function hasValidLength(): boolean {
			return (
				value.length === PHONE_NUMBER_LENGTH ||
				value.length === PHONE_NUMBER_PARENTHESES_LENGTH ||
				value.length === PHONE_NUMBER_HYPHENATED_LENGTH ||
				value.length === PHONE_NUMBER_INTERNATIONAL_LENGTH
			)
		}() &&
		function hasValidFormat(): boolean {
			if (value.length === PHONE_NUMBER_LENGTH) {
				// 10-digit plain: 1234567890
				return value.split("").reduce(function checkDigits(
					acc: boolean,
					char: string,
				): boolean {
					return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
				}, true)
			} else if (value.length === PHONE_NUMBER_PARENTHESES_LENGTH) {
				// (123) 456-7890 format
				return (
					value.charAt(PHONE_NUMBER_OPEN_PAREN_POSITION) === "(" &&
					value.charAt(PHONE_NUMBER_CLOSE_PAREN_POSITION) === ")" &&
					value.charAt(PHONE_NUMBER_SPACE_POSITION) === " " &&
					value.charAt(PHONE_NUMBER_PARENTHESES_HYPHEN_POSITION) === "-" &&
					function checkAreaCode(): boolean {
						return value.substring(1, 4).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkExchange(): boolean {
						return value.substring(6, 9).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkLineNumber(): boolean {
						return value.substring(10).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}()
				)
			} else if (value.length === PHONE_NUMBER_HYPHENATED_LENGTH) {
				// 123-456-7890 format
				return (
					value.charAt(PHONE_NUMBER_FIRST_HYPHEN_POSITION) === "-" &&
					value.charAt(PHONE_NUMBER_SECOND_HYPHEN_POSITION) === "-" &&
					function checkAreaCode(): boolean {
						return value.substring(0, 3).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkExchange(): boolean {
						return value.substring(4, 7).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkLineNumber(): boolean {
						return value.substring(8).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}()
				)
			} else if (value.length === PHONE_NUMBER_INTERNATIONAL_LENGTH) {
				// +1-123-456-7890 format
				return (
					value.startsWith("+1-") &&
					value.charAt(PHONE_NUMBER_INTERNATIONAL_SECOND_HYPHEN_POSITION) === "-" &&
					value.charAt(PHONE_NUMBER_INTERNATIONAL_THIRD_HYPHEN_POSITION) === "-" &&
					function checkAreaCode(): boolean {
						return value.substring(3, 6).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkExchange(): boolean {
						return value.substring(7, 10).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}() &&
					function checkLineNumber(): boolean {
						return value.substring(11).split("").reduce(function checkDigits(
							acc: boolean,
							char: string,
						): boolean {
							return acc && PHONE_NUMBER_VALID_CHARS.includes(char)
						}, true)
					}()
				)
			}
			return false
		}()
	)
}
