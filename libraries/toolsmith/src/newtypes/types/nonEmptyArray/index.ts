import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeNonEmptyArray from "@sitebender/toolsmith/newtypes/types/nonEmptyArray/unsafeNonEmptyArray/index.ts"

//++ Smart constructor that validates and creates a NonEmptyArray value
//++ Validates that array contains at least one element
export default function nonEmptyArray<T>(
	value: ReadonlyArray<T>,
): Result<ValidationError, NonEmptyArray<T>> {
	if (value.length === 0) {
		return error({
			code: "NON_EMPTY_ARRAY_EMPTY",
			field: "nonEmptyArray",
			messages: [
				"The system needs a non-empty array with at least one element.",
			],
			received: value,
			expected: "Array with at least one element",
			suggestion:
				"Provide an array with at least one item like [1] or ['a', 'b']",
			constraints: { minLength: 1 },
			severity: "requirement",
		})
	}

	return ok(unsafeNonEmptyArray(value))
}

//++ Export the NonEmptyArray branded type
export type { NonEmptyArray }
