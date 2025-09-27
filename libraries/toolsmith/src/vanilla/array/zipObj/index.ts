import isNullish from "../../validation/isNullish/index.ts"

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

//?? [EXAMPLE] `zipObj([1, 2, 3])(["a", "b", "c"]) // { a: 1, b: 2, c: 3 }`
//?? [EXAMPLE] `zipObj([1, 2])(["a", "b", "c", "d"]) // { a: 1, b: 2, c: undefined, d: undefined }`
//?? [EXAMPLE] `zipObj([1, 2, 3, 4, 5])(["x", "y", "z"]) // { x: 1, y: 2, z: 3 }`
//?? [EXAMPLE] `zipObj(["dark", 14, true, false])(["theme", "fontSize", "autoSave", "notifications"]) // { theme: "dark", fontSize: 14, autoSave: true, notifications: false }`
//?? [EXAMPLE] `zipObj([1, 2, 3])(null) // {}`
//?? [EXAMPLE] `zipObj(null)(["a", "b"]) // { a: undefined, b: undefined }`
