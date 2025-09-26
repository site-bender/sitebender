import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Sorts an array based on a mapping function
 |
 | Sorts elements by comparing the values returned by applying a mapping
 | function to each element. The mapping function is called once per element
 | and results are cached for efficiency. Sorts in ascending order by default.
 | For descending order, negate numbers or reverse the result. Useful for
 | sorting objects by property, computed values, or complex sort keys.
 */
const sortBy = <T, U>(
	fn: (value: T) => U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Map each element to [element, sortKey] pairs
	const mapped = array.map((element, index) => ({
		element,
		sortKey: fn(element),
		index, // Preserve original index for stable sort
	}))

	// Sort by the computed keys
	mapped.sort((a, b) => {
		if (a.sortKey < b.sortKey) return -1
		if (a.sortKey > b.sortKey) return 1
		// If keys are equal, maintain original order (stable sort)
		return a.index - b.index
	})

	// Extract the sorted elements
	return mapped.map((item) => item.element)
}

export default sortBy

//?? [EXAMPLE] `sortBy(Math.abs)([-5, 3, -1, 4, -2]) // [-1, -2, 3, 4, -5]`
//?? [EXAMPLE] `sortBy((u: { age: number }) => u.age)([{ name: "Charlie", age: 30 }, { name: "Alice", age: 25 }]) // [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }]`
//?? [EXAMPLE] `sortBy((s: string) => s.length)(["cat", "elephant", "dog"]) // ["cat", "dog", "elephant"]`
//?? [EXAMPLE] `sortBy((item: {price: number, quantity: number}) => item.price * item.quantity)([{ price: 10, quantity: 5 }, { price: 20, quantity: 2 }]) // [{ price: 20, quantity: 2 }, { price: 10, quantity: 5 }]`
//?? [EXAMPLE] `sortBy((x: number) => x)([]) // []`
//?? [EXAMPLE] `sortBy((x: any) => x)(null) // []`
