import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if an array is non-empty
export default function isNonEmptyArray<T>(
	value: ReadonlyArray<T>,
): value is NonEmptyArray<T> {
	//++ [EXCEPTION] .length and > permitted in Toolsmith for performance - provides non-empty array validation wrapper
	return value.length > 0
}
