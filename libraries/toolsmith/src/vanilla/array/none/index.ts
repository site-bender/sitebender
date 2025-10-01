import isNullish from "../../validation/isNullish/index.ts"

//++ Tests if no elements satisfy a predicate
const none =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T> | null | undefined): boolean => {
		if (isNullish(array) || !Array.isArray(array)) {
			return true
		}
		return !array.some(predicate)
	}

export default none
