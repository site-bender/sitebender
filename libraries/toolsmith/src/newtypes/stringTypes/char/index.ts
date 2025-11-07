import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Char } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeChar from "@sitebender/toolsmith/newtypes/stringTypes/char/unsafeChar/index.ts"

//++ Smart constructor that validates and creates a Char value
//++ Validates that string contains exactly one Unicode code point (single character)
export default function char(
	value: string,
): Result<ValidationError, Char> {
	//++ [EXCEPTION] Array.from permitted in Toolsmith for performance - provides Char validation wrapper
	//++ Use Array.from to properly count Unicode code points
	//++ This handles multi-byte characters like emojis correctly
	const codePoints = Array.from(value)

	//++ [EXCEPTION] .length and !== permitted in Toolsmith for performance - provides Char validation wrapper
	if (codePoints.length !== 1) {
		return error({
			code: "CHAR_INVALID_LENGTH",
			field: "char",
			messages: ["The system needs exactly one character."],
			received: value,
			expected: "Single Unicode character (exactly one code point)",
			suggestion: "Provide a single character like 'A', 'ñ', or '😀'",
			constraints: { length: 1 },
			severity: "requirement",
		})
	}

	return ok(unsafeChar(value))
}

//++ Export the Char branded type
export type { Char }
