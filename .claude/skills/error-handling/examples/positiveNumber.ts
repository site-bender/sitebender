//++ Example: Smart constructor using Result monad
//++ Demonstrates fail-fast validation with ValidationError

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Branded type for positive numbers
type PositiveNumber = number & { readonly __brand: "PositiveNumber" }

//++ Smart constructor for PositiveNumber
//++ Returns Result with ValidationError if not positive
export default function positiveNumber(
	n: number,
): Result<ValidationError, PositiveNumber> {
	if (n > 0 && Number.isFinite(n)) {
		return ok(n as PositiveNumber)
	}

	return error({
		code: "NUMBER_NOT_POSITIVE",
		field: "positiveNumber",
		messages: ["The system needs a positive number greater than zero."],
		received: n,
		expected: "Positive finite number",
		suggestion: "Provide a number greater than zero",
		constraints: {
			min: 0,
			exclusive: true,
		},
		severity: "requirement",
		examples: [1, 0.5, 42, 100.25],
	})
}

//++ Usage examples:

//++ Success case
const valid = positiveNumber(42)
// valid = Ok { _tag: "Ok", value: 42 }

//++ Error case: zero
const zero = positiveNumber(0)
// zero = Error { _tag: "Error", error: { code: "NUMBER_NOT_POSITIVE", ... } }

//++ Error case: negative
const negative = positiveNumber(-5)
// negative = Error { _tag: "Error", error: { code: "NUMBER_NOT_POSITIVE", ... } }

//++ Error case: infinity
const infinity = positiveNumber(Infinity)
// infinity = Error { _tag: "Error", error: { code: "NUMBER_NOT_POSITIVE", ... } }
