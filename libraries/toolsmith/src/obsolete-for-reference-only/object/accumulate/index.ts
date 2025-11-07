//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
			const newValue = (source as Record<string, unknown>)[key as string] as T[
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
