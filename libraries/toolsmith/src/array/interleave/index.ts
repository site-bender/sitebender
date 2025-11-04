import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Alternates elements from multiple arrays
const interleave = <T>(
	...arrays: Array<Array<T> | null | undefined>
): Array<T> => {
	if (arrays.length === 0) return []

	// Filter out null/undefined arrays and use only valid arrays
	const validArrays = arrays.filter((arr) => not(isNullish(arr))) as Array<
		Array<T>
	>

	if (validArrays.length === 0) return []

	const maxLength = Math.max(...validArrays.map((arr) => arr.length))

	return Array.from({ length: maxLength }, (_, i) =>
		validArrays
			.filter((arr) => i < arr.length)
			.map((arr) => arr[i])).flat()
}

export default interleave
