import isNullish from "../../validation/isNullish/index.ts"

//++ Returns adjacent element pairs
const pairwise = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<[T, T]> => {
	if (isNullish(array) || array.length < 2) {
		return []
	}

	return Array.from({ length: array.length - 1 }, (_, i) =>
		[
			array[i],
			array[i + 1],
		] as [T, T])
}

export default pairwise

//?? [EXAMPLE] `pairwise([1, 2, 3, 4, 5]) // [[1, 2], [2, 3], [3, 4], [4, 5]]`
//?? [EXAMPLE] `pairwise([10, 15, 12, 20, 18]).map(([a, b]) => b - a) // [5, -3, 8, -2]`
//?? [EXAMPLE] `pairwise(["idle", "idle", "active", "active", "idle"]).map(([prev, curr]) => prev !== curr ? \`${prev}->${curr}\` : "no change") // ["no change", "idle->active", "no change", "active->idle"]`
//?? [EXAMPLE] `pairwise([]) // []`
//?? [EXAMPLE] `pairwise([42]) // []`
//?? [EXAMPLE] `pairwise([1, 2]) // [[1, 2]]`
//?? [EXAMPLE] `pairwise(null) // []`
