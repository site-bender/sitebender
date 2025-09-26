import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Sorts an array using multiple comparator functions
 |
 | Applies comparator functions in order until one returns a non-zero value,
 | providing multi-level sorting. Each comparator should return negative for
 | less than, positive for greater than, and zero for equal. Useful for
 | complex sorting with primary, secondary, tertiary sort keys, or different
 | sort directions per field.
 */
const sortWith = <T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (comparators.length === 0) {
		return [...array]
	}

	// Create a copy and sort with combined comparator
	return [...array].sort((a, b) => {
		// Apply comparators in order until one returns non-zero
		for (const comparator of comparators) {
			const result = comparator(a, b)
			if (result !== 0) {
				return result
			}
		}
		// All comparators returned 0 (elements are equal)
		return 0
	})
}

export default sortWith

//?? [EXAMPLE] `sortWith([(a: {age: number}, b: {age: number}) => a.age - b.age, (a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name)])([{ name: "Charlie", age: 30 }, { name: "Alice", age: 25 }, { name: "Bob", age: 25 }]) // [{ name: "Alice", age: 25 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 30 }]`
//?? [EXAMPLE] `sortWith([(a: string, b: string) => a.length - b.length, (a: string, b: string) => a.localeCompare(b)])(["cat", "dog", "ox"]) // ["ox", "cat", "dog"]`
//?? [EXAMPLE] `sortWith([])(["b", "a", "c"]) // ["b", "a", "c"] (no sorting)`
//?? [EXAMPLE] `sortWith([(a: number, b: number) => a - b])([3, 1, 2]) // [1, 2, 3]`
//?? [EXAMPLE] `sortWith([(a: number, b: number) => b - a, (a: number, b: number) => a - b])([1, 2, 1, 3]) // [3, 2, 1, 1]`
//?? [EXAMPLE] `sortWith([(a: number, b: number) => a - b])(null) // []`
