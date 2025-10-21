import type { Error, Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

//++ Type guard that checks if a Result is an Error
export default function isError<E, T>(
	result: Result<E, T>,
): result is Error<E> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return result._tag === "Error"
}
