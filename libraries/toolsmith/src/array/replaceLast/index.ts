import isNullish from "../../validation/isNullish/index.ts"
import replaceAt from "../replaceAt/index.ts"

//++ Replaces last occurrence via function
const replaceLast =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		return replaceAt<T>(array.lastIndexOf(target))(replacer)(array)
	}

export default replaceLast
