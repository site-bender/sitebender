import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Gets all elements except the first from a NonEmptyArray
//++ Returns a regular readonly array (which may be empty if original had only one element)
export default function tailNonEmptyArray<T>(
	value: NonEmptyArray<T>,
): ReadonlyArray<T> {
	const [, ...rest] = value
	return rest
}
