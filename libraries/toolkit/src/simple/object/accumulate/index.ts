/**
 * Accumulates data from multiple sources into a single object
 * 
 * Collects and combines data from an array of source objects using specified
 * accumulator functions for each key. Allows flexible aggregation strategies
 * per property, such as summing numbers, concatenating arrays, or taking the
 * latest value. Returns a new object without modifying the originals.
 * 
 * @curried (accumulators) => (sources) => result
 * @param accumulators - Object mapping keys to accumulator functions
 * @param sources - Array of objects to accumulate from
 * @returns A new object with accumulated values
 * @example
 * ```typescript
 * // Sum numbers, concatenate arrays, take last string
 * const accumulators = {
 *   count: (acc: number, val: number) => acc + val,
 *   tags: (acc: Array<string>, val: Array<string>) => [...acc, ...val],
 *   name: (_acc: string, val: string) => val
 * }
 * 
 * const accumulator = accumulate(accumulators)
 * 
 * accumulator([
 *   { count: 10, tags: ["a"], name: "first" },
 *   { count: 20, tags: ["b", "c"], name: "second" },
 *   { count: 15, tags: ["d"], name: "third" }
 * ])
 * // { count: 45, tags: ["a", "b", "c", "d"], name: "third" }
 * 
 * // Statistics accumulation
 * const statsAccumulator = accumulate({
 *   total: (acc: number, val: number) => acc + val,
 *   min: (acc: number, val: number) => Math.min(acc, val),
 *   max: (acc: number, val: number) => Math.max(acc, val),
 *   count: (acc: number) => acc + 1,
 *   values: (acc: Array<number>, val: number) => [...acc, val]
 * })
 * 
 * statsAccumulator([
 *   { total: 10, min: 10, max: 10, count: 0, values: [] },
 *   { total: 5, min: 5, max: 5, count: 0, values: [] },
 *   { total: 15, min: 15, max: 15, count: 0, values: [] }
 * ])
 * // { total: 30, min: 5, max: 15, count: 3, values: [10, 5, 15] }
 * 
 * // Order aggregation
 * const orderAccumulator = accumulate({
 *   items: (acc: Array<any>, val: Array<any>) => [...acc, ...val],
 *   subtotal: (acc: number, val: number) => acc + val,
 *   discount: (acc: number, val: number) => Math.max(acc, val),
 *   customer: (_acc: any, val: any) => val || _acc
 * })
 * 
 * const orders = [
 *   { items: [{ id: 1 }], subtotal: 100, discount: 10, customer: null },
 *   { items: [{ id: 2 }], subtotal: 50, discount: 5, customer: { id: "C1" } },
 *   { items: [{ id: 3 }], subtotal: 75, discount: 15, customer: null }
 * ]
 * 
 * orderAccumulator(orders)
 * // {
 * //   items: [{ id: 1 }, { id: 2 }, { id: 3 }],
 * //   subtotal: 225,
 * //   discount: 15,
 * //   customer: { id: "C1" }
 * // }
 * 
 * // Event aggregation
 * const eventAccumulator = accumulate({
 *   events: (acc: Array<string>, val: string) => [...acc, val],
 *   timestamp: (_acc: number, val: number) => val,
 *   errors: (acc: number, val: number) => acc + val,
 *   warnings: (acc: number, val: number) => acc + val
 * })
 * 
 * const logs = [
 *   { events: ["start"], timestamp: 1000, errors: 0, warnings: 1 },
 *   { events: ["process"], timestamp: 2000, errors: 1, warnings: 0 },
 *   { events: ["end"], timestamp: 3000, errors: 0, warnings: 2 }
 * ]
 * 
 * eventAccumulator(logs)
 * // {
 * //   events: ["start", "process", "end"],
 * //   timestamp: 3000,
 * //   errors: 1,
 * //   warnings: 3
 * // }
 * 
 * // Configuration merging with priorities
 * const configAccumulator = accumulate({
 *   features: (acc: Set<string>, val: Set<string>) => 
 *     new Set([...acc, ...val]),
 *   settings: (acc: Record<string, any>, val: Record<string, any>) => 
 *     ({ ...acc, ...val }),
 *   version: (_acc: string, val: string) => val
 * })
 * 
 * const configs = [
 *   { 
 *     features: new Set(["basic"]), 
 *     settings: { theme: "light" }, 
 *     version: "1.0" 
 *   },
 *   { 
 *     features: new Set(["advanced"]), 
 *     settings: { lang: "en" }, 
 *     version: "1.1" 
 *   },
 *   { 
 *     features: new Set(["pro"]), 
 *     settings: { theme: "dark" }, 
 *     version: "2.0" 
 *   }
 * ]
 * 
 * configAccumulator(configs)
 * // {
 * //   features: Set(["basic", "advanced", "pro"]),
 * //   settings: { theme: "dark", lang: "en" },
 * //   version: "2.0"
 * // }
 * 
 * // Score tracking
 * const scoreAccumulator = accumulate({
 *   scores: (acc: Array<number>, val: number) => [...acc, val],
 *   total: (acc: number, val: number) => acc + val,
 *   attempts: (acc: number) => acc + 1,
 *   best: (acc: number, val: number) => Math.max(acc, val)
 * })
 * 
 * const gameScores = [
 *   { scores: [], total: 100, attempts: 0, best: 100 },
 *   { scores: [], total: 150, attempts: 0, best: 150 },
 *   { scores: [], total: 120, attempts: 0, best: 120 }
 * ]
 * 
 * scoreAccumulator(gameScores)
 * // {
 * //   scores: [100, 150, 120],
 * //   total: 370,
 * //   attempts: 3,
 * //   best: 150
 * // }
 * 
 * // Missing keys handling
 * const safeAccumulator = accumulate({
 *   required: (acc: number = 0, val: number = 0) => acc + val,
 *   optional: (acc: string = "", val?: string) => val || acc
 * })
 * 
 * safeAccumulator([
 *   { required: 10 },
 *   { optional: "test" },
 *   { required: 5, optional: "final" }
 * ])
 * // { required: 15, optional: "final" }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Creates new object, doesn't modify sources
 * @property Flexible - Different accumulation strategy per property
 * @property Curried - Accumulators can be partially applied for reuse
 */
const accumulate = <T extends Record<string, any>>(
	accumulators: {
		[K in keyof T]: (accumulated: T[K], value: T[K], index: number) => T[K]
	}
) => (
	sources: Array<Partial<T>>
): T => {
	// Get all keys from the accumulators
	const keys = Object.keys(accumulators) as Array<keyof T>
	
	// Initialize result with first source or empty object
	const initial = sources[0] || {}
	
	// Process each source starting from index 1 if we used first as initial
	const startIndex = sources.length > 0 ? 1 : 0
	
	return sources.slice(startIndex).reduce((acc, source, index) => {
		// For each key in accumulators
		const updates = keys.reduce((keyAcc, key) => {
			// Get the accumulator function for this key
			const accumulator = accumulators[key]
			
			// Get current accumulated value
			const currentValue = acc[key]
			
			// Get new value from source
			const newValue = source[key]
			
			// Skip if source doesn't have this key
			if (!(key in source)) {
				return keyAcc
			}
			
			// Apply accumulator function
			const accumulated = accumulator(
				currentValue,
				newValue as T[typeof key],
				index + startIndex
			)
			
			return {
				...keyAcc,
				[key]: accumulated
			}
		}, {} as Partial<T>)
		
		// Merge updates into accumulator
		return { ...acc, ...updates }
	}, initial as T)
}