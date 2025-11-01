import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a NonEmptyArray to extract the raw readonly array value
export default function unwrapNonEmptyArray<T>(
	value: NonEmptyArray<T>,
): ReadonlyArray<T> {
	return value as ReadonlyArray<T>
}
