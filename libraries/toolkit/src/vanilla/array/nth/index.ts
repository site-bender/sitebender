import isNullish from "../../validation/isNullish/index.ts"

//++ nth(index)(array) — safe accessor with negative indices; undefined if out of bounds
const nth = (index: number) =>
<T>(
	array: Array<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || !Array.isArray(array)) {
		return undefined
	}
	return array.at(index)
}

export default nth

//?? [EXAMPLE] nth(1)([1,2,3]) // 2
//?? [EXAMPLE] nth(-1)([1,2,3]) // 3
//?? [EXAMPLE] nth(10)([1,2,3]) // undefined
