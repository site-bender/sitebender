//++ Example: Error constructor helper function
//++ Demonstrates reusable, fully curried error creation

import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

type LengthType = "minimum" | "maximum" | "exact"

//++ Creates ValidationError for string length violations
//++ Fully curried - one parameter per function
export default function createLengthError(field: string) {
	return function createLengthErrorForField(lengthType: LengthType) {
		return function createLengthErrorForFieldAndType(expectedLength: number) {
			return function createLengthErrorForFieldAndTypeAndLength(
				received: string,
			): ValidationError {
				const actualLength = received.length

				const messageMap = {
					minimum: `The system needs a ${field} at least ${expectedLength} characters long.`,
					maximum: `The system needs a ${field} no more than ${expectedLength} characters long.`,
					exact: `The system needs a ${field} exactly ${expectedLength} characters long.`,
				}

				const expectedMap = {
					minimum: `At least ${expectedLength} characters`,
					maximum: `At most ${expectedLength} characters`,
					exact: `Exactly ${expectedLength} characters`,
				}

				const suggestionMap = {
					minimum: actualLength === 0
						? `Provide a ${field}`
						: `Add ${expectedLength - actualLength} more characters`,
					maximum: `Remove ${actualLength - expectedLength} characters`,
					exact: actualLength < expectedLength
						? `Add ${expectedLength - actualLength} more characters`
						: `Remove ${actualLength - expectedLength} characters`,
				}

				const codeMap = {
					minimum: `${field.toUpperCase()}_TOO_SHORT`,
					maximum: `${field.toUpperCase()}_TOO_LONG`,
					exact: `${field.toUpperCase()}_INVALID_LENGTH`,
				}

				return {
					code: codeMap[lengthType],
					field,
					messages: [messageMap[lengthType]],
					received,
					expected: expectedMap[lengthType],
					suggestion: suggestionMap[lengthType],
					constraints: {
						expectedLength,
						actualLength,
						lengthType,
					},
					severity: "requirement",
				}
			}
		}
	}
}

//++ Usage examples:

//++ Create minimum length error for username
const usernameMinError = createLengthError("username")("minimum")(3)
const error1 = usernameMinError("ab")
// error1 = {
//   code: "USERNAME_TOO_SHORT",
//   field: "username",
//   messages: ["The system needs a username at least 3 characters long."],
//   received: "ab",
//   expected: "At least 3 characters",
//   suggestion: "Add 1 more characters",
//   constraints: { expectedLength: 3, actualLength: 2, lengthType: "minimum" },
//   severity: "requirement",
// }

//++ Create maximum length error for password
const passwordMaxError = createLengthError("password")("maximum")(64)
const error2 = passwordMaxError("a".repeat(100))
// error2 = {
//   code: "PASSWORD_TOO_LONG",
//   field: "password",
//   messages: ["The system needs a password no more than 64 characters long."],
//   ...
// }

//++ Create exact length error for PIN
const pinExactError = createLengthError("pin")("exact")(4)
const error3 = pinExactError("123")
// error3 = {
//   code: "PIN_INVALID_LENGTH",
//   field: "pin",
//   messages: ["The system needs a pin exactly 4 characters long."],
//   ...
// }

//++ Reusable across different fields
const emailMinError = createLengthError("email")("minimum")(5)
const bioMaxError = createLengthError("bio")("maximum")(500)
