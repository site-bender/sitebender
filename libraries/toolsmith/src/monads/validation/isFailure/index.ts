import type { Result } from "../../../types/fp/result/index.ts"
import type { Failure, Validation } from "../../../types/fp/validation/index.ts"

/*++
 + Type guard that checks if a Validation is Failure
 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
 + This is a primitive type guard operation with no higher-level abstraction available
 */
export default function isFailure<E, T>(
	value: Result<E, T> | Validation<E, T>,
): value is Failure<E> {
	return value._tag === "Failure"
}
