import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Base58 } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeBase58 from "@sitebender/toolsmith/newtypes/stringTypes/base58/unsafeBase58/index.ts"

//++ Base58 alphabet (Bitcoin/IPFS style) - excludes 0, O, I, l to avoid confusion
const BASE58_ALPHABET =
	"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

//++ Smart constructor that validates and creates a Base58 value
//++ Validates Base58 encoding using Bitcoin/IPFS alphabet (no 0OIl characters)
export default function base58(
	value: string,
): Result<ValidationError, Base58> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides Base58 validation wrapper
	if (value.length === 0) {
		return error({
			code: "BASE58_EMPTY",
			field: "base58",
			messages: ["The system needs a non-empty Base58 string."],
			received: value,
			expected: "Non-empty Base58-encoded string",
			suggestion:
				"Provide a Base58 string like '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] Array.from, .filter(), !, and .includes() permitted in Toolsmith for performance - provides Base58 validation wrapper
	const chars = Array.from(value)
	const invalidChars = chars.filter(function filterInvalidChars(ch) {
		return !BASE58_ALPHABET.includes(ch)
	})

	//++ [EXCEPTION] .length and > permitted in Toolsmith for performance - provides Base58 validation wrapper
	if (invalidChars.length > 0) {
		return error({
			code: "BASE58_INVALID_CHARACTERS",
			field: "base58",
			messages: [
				"The system needs a Base58 string with only valid alphabet characters.",
			],
			received: value,
			expected:
				"Base58 characters (123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz)",
			suggestion:
				"Remove invalid characters like 0, O, I, l which are excluded from Base58",
			constraints: { invalidCharacters: invalidChars },
			severity: "requirement",
		})
	}

	return ok(unsafeBase58(value))
}

//++ Export the Base58 branded type
export type { Base58 }
