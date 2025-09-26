import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Tests whether no elements in an array satisfy a predicate function
 |
 | Returns true if predicate returns falsy for every element, or true for empty array.
 | Equivalent to !some(predicate). Short-circuits on first truthy result.
 */
const none =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T> | null | undefined): boolean => {
		if (isNullish(array) || !Array.isArray(array)) {
			return true
		}
		return !array.some(predicate)
	}

export default none

//?? [EXAMPLE] `none((n: number) => n < 0)([1, 2, 3]) // true`
//?? [EXAMPLE] `none((n: number) => n > 2)([1, 2, 3]) // false`
//?? [EXAMPLE] `none((n: number) => n < 0)([1, -2, 3]) // false`
//?? [EXAMPLE] `none((s: string) => s === "")(["hello", "world"]) // true`
//?? [EXAMPLE] `none((n: number) => n > 0)([]) // true (vacuous truth)`
//?? [EXAMPLE] `none((x: number) => x > 0)(null) // true`
//?? [EXAMPLE] `none((x: number) => x > 0)(undefined) // true`
