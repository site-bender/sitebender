/**
 * Accumulates data from multiple sources into a single object
 *
 * Collects and combines data from an array of source objects using specified
 * accumulator functions for each key. Allows flexible aggregation strategies
 * per property, such as summing numbers, concatenating arrays, or taking the
 * latest value. Returns a new object without modifying the originals.
 *
 * @pure
 * @immutable
 * @curried
 * @param accumulators - Object mapping keys to accumulator functions
 * @param sources - Array of objects to accumulate from
 * @returns A new object with accumulated values
 * @example
 * ```typescript
 * // Basic usage - sum numbers, concatenate arrays
 * const accumulator = accumulate({
 *   count: (acc: number, val: number) => acc + val,
 *   tags: (acc: Array<string>, val: Array<string>) => [...acc, ...val],
 *   name: (_acc: string, val: string) => val
 * })
 *
 * accumulator([
 *   { count: 10, tags: ["a"], name: "first" },
 *   { count: 20, tags: ["b", "c"], name: "second" },
 *   { count: 15, tags: ["d"], name: "third" }
 * ])
 * // { count: 45, tags: ["a", "b", "c", "d"], name: "third" }
 *
 * // Statistics aggregation
 * const stats = accumulate({
 *   total: (acc: number, val: number) => acc + val,
 *   min: (acc: number, val: number) => Math.min(acc, val),
 *   max: (acc: number, val: number) => Math.max(acc, val)
 * })
 *
 * stats([
 *   { total: 10, min: 10, max: 10 },
 *   { total: 5, min: 5, max: 5 },
 *   { total: 15, min: 15, max: 15 }
 * ])
 * // { total: 30, min: 5, max: 15 }
 *
 * // Merge configuration objects
 * const merge = accumulate({
 *   features: (acc: Set<string>, val: Set<string>) =>
 *     new Set([...acc, ...val]),
 *   settings: (acc: Record<string, any>, val: Record<string, any>) =>
 *     ({ ...acc, ...val })
 * })
 *
 * merge([
 *   { features: new Set(["basic"]), settings: { theme: "light" } },
 *   { features: new Set(["pro"]), settings: { theme: "dark" } }
 * ])
 * // { features: Set(["basic", "pro"]), settings: { theme: "dark" } }
 *
 * // Handle missing keys with default values
 * const safe = accumulate({
 *   required: (acc: number = 0, val: number = 0) => acc + val,
 *   optional: (acc: string = "", val?: string) => val || acc
 * })
 *
 * safe([{ required: 10 }, { optional: "test" }])
 * // { required: 10, optional: "test" }
 * ```
 */
const accumulate = <T extends Record<string, unknown>>(
	accumulators: {
		[K in keyof T]: (accumulated: T[K], value: T[K], index: number) => T[K]
	},
) =>
(
	sources: ReadonlyArray<Partial<T>>,
): T => {
	// Get all keys from the accumulators
	const keys = Object.keys(accumulators) as Array<keyof T>

	// Initialize result with first source or empty object
	const initial = (sources[0] || {}) as T

	// Process each source starting from index 1 if we used first as initial
	const startIndex = sources.length > 0 ? 1 : 0

	return sources.slice(startIndex).reduce<T>((acc, source, index) => {
		// For each key in accumulators
		const updates = keys.reduce((keyAcc, key) => {
			// Get the accumulator function for this key
			const accumulator = accumulators[key]

			// Get current accumulated value
			const currentValue =
				(acc as Record<string, unknown>)[key as string] as T[typeof key]

			// Get new value from source
			const newValue =
				(source as Record<string, unknown>)[key as string] as T[
					typeof key
				]

			// Skip if source doesn't have this key
			if (!(key in source)) {
				return keyAcc
			} // Apply accumulator function

			;(keyAcc as Record<string, unknown>)[key as string] = accumulator(
				currentValue,
				newValue,
				index + startIndex,
			)
			return keyAcc
		}, {} as Record<string, unknown>)

		// Merge updates into accumulator
		return { ...acc, ...(updates as Partial<T>) } as T
	}, initial as T)
}

export default accumulate
