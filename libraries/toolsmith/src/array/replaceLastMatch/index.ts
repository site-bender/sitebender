import isNullish from "../../validation/isNullish/index.ts"
import findLastIndex from "../findLastIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

//++ Replaces last element matching pattern
const replaceLastMatch =
	<T>(pattern: RegExp | string) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern)
		const index = findLastIndex((item: T) => regex.test(String(item)))(
			array,
		)

		return index === undefined
			? [...array]
			: replaceAt<T>(index)(replacer)(array)
	}

export default replaceLastMatch
