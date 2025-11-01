import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a NonEmptyArray without validation
//++ INTERNAL USE ONLY - caller must guarantee array has at least one element
export default function unsafeNonEmptyArray<T>(
	value: ReadonlyArray<T>,
): NonEmptyArray<T> {
	return value as NonEmptyArray<T>
}
