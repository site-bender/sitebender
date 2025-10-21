import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"

/*++
 + Example: Using array isNotEmpty instead of .length checks
 + Demonstrates readable array state checking with happy path first
 */
export default function processItems<T>(
	items: ReadonlyArray<T>,
): Result<ValidationError, ReadonlyArray<T>> {
	/*++
	 + Happy path first: check if array has items
	 + Reads as: "if is not empty items"
	 + Compare to: if (items.length > 0) - requires mental arithmetic
	 */
	if (isNotEmpty(items)) {
		return ok(items)
	}

	// Sad path: array is empty
	return error({
		code: "EMPTY_ITEMS",
		field: "items",
		messages: ["Items array cannot be empty"],
		received: items as never,
		expected: "non-empty array",
		suggestion: "Provide at least one item",
		severity: "requirement",
	})
}
