import isNullish from "../../validation/isNullish/index.ts"

//++ Flattens nested arrays to specified depth
const flatten = <T, D extends number = 1>(
	depth: D = 1 as D,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T extends ReadonlyArray<infer U> ? U : T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	return array.flat(depth) as Array<T extends ReadonlyArray<infer U> ? U : T>
}

//?? [EXAMPLE] `flatten(1)([[1, 2], [3, 4]])        // [1, 2, 3, 4]`
//?? [EXAMPLE] `flatten(2)([[[1]], [[2]]])          // [1, 2]`
//?? [EXAMPLE] `flatten(Infinity)([[[1]], [[[2]]]]) // [1, 2]`
//?? [EXAMPLE] `flatten(1)(null)                    // []`
//?? [EXAMPLE] `flatten(1)(undefined)                // []`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Common use: flatten one level
 | const flattenOne = flatten(1)
 | flattenOne([[1, 2], [3], [4, 5]])   // [1, 2, 3, 4, 5]
 | ```
 */

export default flatten
