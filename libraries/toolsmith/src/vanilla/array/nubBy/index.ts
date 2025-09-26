import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Removes duplicate elements from an array using a custom equality function
 |
 | Like nub but uses a custom equality function to determine which elements
 | are considered duplicates. Returns a new array with duplicates removed,
 | keeping only the first occurrence of each unique element according to
 | the equality function. Order is preserved based on first occurrence.
 | This is the customizable version of nub/unique.
 */
const nubBy = <T>(
	equalityFn: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	const findDuplicates = (
		remaining: ReadonlyArray<T>,
		result: Array<T>,
	): Array<T> => {
		if (remaining.length === 0) {
			return result
		}

		const [head, ...tail] = remaining
		const isDuplicate = result.some((existing) => equalityFn(existing, head))

		return findDuplicates(
			tail,
			isDuplicate ? result : [...result, head],
		)
	}

	return findDuplicates(array, [])
}

export default nubBy

//?? [EXAMPLE] `nubBy((a: string, b: string) => a.toLowerCase() === b.toLowerCase())(["Hello", "HELLO", "world"]) // ["Hello", "world"]`
//?? [EXAMPLE] `nubBy((a: { id: number }, b: { id: number }) => a.id === b.id)([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 1, name: "Alicia" }]) // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]`
//?? [EXAMPLE] `nubBy((a: number, b: number) => Math.abs(a - b) < 0.1)([1.0, 1.05, 1.5, 1.48, 2.0]) // [1.0, 1.5, 2.0]`
//?? [EXAMPLE] `nubBy((a, b) => a === b)([]) // []`
//?? [EXAMPLE] `nubBy((a, b) => a === b)(null) // []`
//?? [EXAMPLE] `nubBy(() => true)([1, 2, 3]) // [1]`
