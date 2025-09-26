import not from "../../logic/not/index.ts"
import is from "../../validation/is/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Removes consecutive duplicate elements from an array
export default function dropRepeats<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	return array.reduce(function dropRepeat(acc: Array<T>, curr, index) {
		if (index === 0 || not(is(curr)(array[index - 1]))) {
			return [...acc, curr]
		}
		return acc
	}, [])
}

//?? [EXAMPLE] `dropRepeats([1, 1, 2, 3, 3, 3, 4]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `dropRepeats([1, 2, 2, 1, 1])       // [1, 2, 1]`
//?? [EXAMPLE] `dropRepeats(["a", "a", "b", "a"])  // ["a", "b", "a"]`
//?? [EXAMPLE] `dropRepeats([])                    // []`
//?? [EXAMPLE] `dropRepeats(null)                  // []`
//?? [EXAMPLE] `dropRepeats([1, 2, 1, 2]) // [1, 2, 1, 2] (preserves non-consecutive duplicates)`
