import isNullish from "../../validation/isNullish/index.ts"

//++ Replaces all occurrences via function
const replaceAll =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		return array.map((item) => (item === target ? replacer(item) : item))
	}

export default replaceAll
