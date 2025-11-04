import isNullish from "../../predicates/isNullish/index.ts"

//++ Removes duplicates by custom equality
const nubBy = <T>(
	equalityFn: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	const findDuplicates = (
		remaining: ReadonlyArray<T>,
		result: Array<T>,
	): Array<T> => {
		if (remaining.length === 0) {
			return result
		}

		const [head, ...tail] = remaining
		const isDuplicate = result.some((existing) => equalityFn(existing, head))

		return findDuplicates(
			tail,
			isDuplicate ? result : [...result, head],
		)
	}

	return findDuplicates(array, [])
}

export default nubBy
