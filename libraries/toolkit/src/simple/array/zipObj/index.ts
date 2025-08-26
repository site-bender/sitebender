/**
 * Creates an object from arrays of keys and values
 *
 * Takes two arrays - one of keys and one of values - and creates an object
 * where each key is paired with its corresponding value by index position.
 * If arrays have different lengths, extra keys get undefined values, and
 * extra values are ignored. Keys must be strings or numbers. Useful for
 * creating objects from parallel arrays, configuration building, or
 * transforming tabular data.
 *
 * @curried
 * @pure
 * @immutable
 * @safe
 * @param values - Array of values for the object
 * @param keys - Array of keys for the object
 * @returns Object with keys mapped to corresponding values
 * @example
 * ```typescript
 * // Basic usage
 * zipObj([1, 2, 3])(["a", "b", "c"])
 * // { a: 1, b: 2, c: 3 }
 *
 * // More keys than values
 * zipObj([1, 2])(["a", "b", "c", "d"])
 * // { a: 1, b: 2, c: undefined, d: undefined }
 *
 * // More values than keys (extra values ignored)
 * zipObj([1, 2, 3, 4, 5])(["x", "y", "z"])
 * // { x: 1, y: 2, z: 3 }
 *
 * // Configuration object from arrays
 * const settingNames = ["theme", "fontSize", "autoSave", "notifications"]
 * const settingValues = ["dark", 14, true, false]
 * zipObj(settingValues)(settingNames)
 * // { theme: "dark", fontSize: 14, autoSave: true, notifications: false }
 *
 * // Handle null/undefined gracefully
 * zipObj([1, 2, 3])(null)       // {}
 * zipObj(null)(["a", "b"])      // { a: undefined, b: undefined }
 * ```
 */
const zipObj = <T>(
	values: ReadonlyArray<T> | null | undefined,
) =>
(
	keys: ReadonlyArray<string | number> | null | undefined,
): Record<string | number, T | undefined> => {
	if (keys == null || !Array.isArray(keys)) {
		return {}
	}

	if (values == null || !Array.isArray(values)) {
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
