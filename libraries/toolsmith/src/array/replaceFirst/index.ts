import isNullish from "../../validation/isNullish/index.ts"

//++ Replaces first occurrence via function
const replaceFirst =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const idx = (array as Array<T>).indexOf(target)
		if (idx === -1) return [...array]
		const out = [...array]
		out[idx] = replacer(out[idx] as T)
		return out
	}

export default replaceFirst
