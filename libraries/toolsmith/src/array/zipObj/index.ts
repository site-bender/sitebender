import isNullish from "../../predicates/isNullish/index.ts"

//++ Creates object from keys and values arrays
const zipObj = <T>(
	values: ReadonlyArray<T> | null | undefined,
) =>
(
	keys: ReadonlyArray<string | number> | null | undefined,
): Record<string | number, T | undefined> => {
	if (isNullish(keys) || !Array.isArray(keys)) {
		return {}
	}

	if (isNullish(values) || !Array.isArray(values)) {
		const result: Record<string | number, T | undefined> = {}
		for (const key of keys) {
			result[key] = undefined
		}
		return result
	}

	// Recursively build object from keys and values
	const buildObject = (
		remainingKeys: ReadonlyArray<string | number>,
		acc: Record<string | number, T | undefined> = {},
	): Record<string | number, T | undefined> => {
		if (remainingKeys.length === 0) {
			return acc
		}

		const [currentKey, ...restKeys] = remainingKeys
		const currentIndex = keys.length - remainingKeys.length
		const currentValue = currentIndex < values.length
			? values[currentIndex]
			: undefined

		return buildObject(restKeys, {
			...acc,
			[currentKey]: currentValue,
		})
	}

	return buildObject(keys)
}

export default zipObj
