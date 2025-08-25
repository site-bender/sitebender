/**
 * Merges objects with intelligent type-aware conflict resolution
 *
 * Performs a deep merge with smart handling of different data types.
 * Arrays can be concatenated or replaced, objects are recursively merged,
 * and primitive values use customizable conflict resolution. Provides
 * fine-grained control over the merge behavior through strategy options.
 *
 * @curried (strategy) => (...sources) => result
 * @param strategy - Merge strategy configuration
 * @param sources - Objects to merge from left to right
 * @returns A new deeply merged object
 * @example
 * ```typescript
 * // Default strategy (arrays concat, last value wins)
 * const defaultMerge = smartMerge({})
 *
 * defaultMerge(
 *   { a: 1, b: [1, 2], c: { x: 10 } },
 *   { a: 2, b: [3], c: { y: 20 } }
 * )
 * // { a: 2, b: [1, 2, 3], c: { x: 10, y: 20 } }
 *
 * // Replace arrays instead of concatenating
 * const replaceArrays = smartMerge({ arrays: "replace" })
 *
 * replaceArrays(
 *   { items: [1, 2, 3], tags: ["old"] },
 *   { items: [4, 5], tags: ["new"] }
 * )
 * // { items: [4, 5], tags: ["new"] }
 *
 * // Union arrays (unique values only)
 * const unionArrays = smartMerge({ arrays: "union" })
 *
 * unionArrays(
 *   { tags: ["a", "b", "c"] },
 *   { tags: ["b", "c", "d"] }
 * )
 * // { tags: ["a", "b", "c", "d"] }
 *
 * // Custom conflict resolver
 * const customResolver = smartMerge({
 *   resolver: (key: string, left: any, right: any) => {
 *     if (key === "version") return Math.max(left, right)
 *     if (key === "priority") return Math.min(left, right)
 *     return right // default: right wins
 *   }
 * })
 *
 * customResolver(
 *   { version: 1, priority: 10, name: "old" },
 *   { version: 3, priority: 5, name: "new" }
 * )
 * // { version: 3, priority: 5, name: "new" }
 *
 * // Deep merge with nested objects
 * const deepMerge = smartMerge({ depth: 10 })
 *
 * deepMerge(
 *   {
 *     user: {
 *       profile: {
 *         settings: { theme: "light", lang: "en" }
 *       }
 *     }
 *   },
 *   {
 *     user: {
 *       profile: {
 *         settings: { theme: "dark" },
 *         avatar: "user.jpg"
 *       }
 *     }
 *   }
 * )
 * // {
 * //   user: {
 * //     profile: {
 * //       settings: { theme: "dark", lang: "en" },
 * //       avatar: "user.jpg"
 * //     }
 * //   }
 * // }
 *
 * // Configuration merging
 * const mergeConfigs = smartMerge({
 *   arrays: "union",
 *   resolver: (key: string, left: any, right: any) => {
 *     if (key === "enabled") return left || right
 *     if (key === "debug") return left && right
 *     return right
 *   }
 * })
 *
 * const defaultConfig = {
 *   features: ["basic", "search"],
 *   enabled: true,
 *   debug: true,
 *   settings: { timeout: 5000 }
 * }
 *
 * const userConfig = {
 *   features: ["search", "advanced"],
 *   enabled: false,
 *   debug: true,
 *   settings: { timeout: 3000, retries: 3 }
 * }
 *
 * mergeConfigs(defaultConfig, userConfig)
 * // {
 * //   features: ["basic", "search", "advanced"],
 * //   enabled: true,    // OR operation
 * //   debug: true,      // AND operation
 * //   settings: { timeout: 3000, retries: 3 }
 * // }
 *
 * // Multiple source merging
 * const multiMerge = smartMerge({ arrays: "concat" })
 *
 * multiMerge(
 *   { data: [1], meta: { v: 1 } },
 *   { data: [2], meta: { v: 2, author: "A" } },
 *   { data: [3], meta: { v: 3, reviewer: "R" } }
 * )
 * // {
 * //   data: [1, 2, 3],
 * //   meta: { v: 3, author: "A", reviewer: "R" }
 * // }
 *
 * // Schema merging
 * const mergeSchemas = smartMerge({
 *   arrays: "union",
 *   depth: 5
 * })
 *
 * const baseSchema = {
 *   required: ["id", "name"],
 *   properties: {
 *     id: { type: "number" },
 *     name: { type: "string" }
 *   }
 * }
 *
 * const extendedSchema = {
 *   required: ["name", "email"],
 *   properties: {
 *     name: { type: "string", minLength: 1 },
 *     email: { type: "string", format: "email" }
 *   }
 * }
 *
 * mergeSchemas(baseSchema, extendedSchema)
 * // {
 * //   required: ["id", "name", "email"],
 * //   properties: {
 * //     id: { type: "number" },
 * //     name: { type: "string", minLength: 1 },
 * //     email: { type: "string", format: "email" }
 * //   }
 * // }
 *
 * // Shallow merge only (depth = 1)
 * const shallowMerge = smartMerge({ depth: 1 })
 *
 * shallowMerge(
 *   { a: { b: { c: 1 } }, x: 10 },
 *   { a: { d: 2 }, x: 20 }
 * )
 * // { a: { d: 2 }, x: 20 } - nested object replaced, not merged
 *
 * // Null/undefined handling
 * const skipNulls = smartMerge({
 *   resolver: (_key: string, left: any, right: any) =>
 *     right ?? left  // Use right unless it's null/undefined
 * })
 *
 * skipNulls(
 *   { a: 1, b: 2, c: 3 },
 *   { a: null, b: undefined, c: 4 }
 * )
 * // { a: 1, b: 2, c: 4 }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Creates new object, doesn't modify sources
 * @property Deep - Recursively merges nested objects
 * @property Configurable - Flexible merge strategies
 */
type MergeStrategy = {
	arrays?: "concat" | "replace" | "union"
	depth?: number
	resolver?: (key: string, left: any, right: any) => any
}

const smartMerge =
	(strategy: MergeStrategy = {}) =>
	(...sources: Array<Record<string, any>>): Record<string, any> => {
		const {
			arrays = "concat",
			depth = 10,
			resolver = (_key: string, _left: any, right: any) => right,
		} = strategy

		const mergeTwo = (left: any, right: any, currentDepth: number = 0): any => {
			// Handle null/undefined
			if (left == null) return right
			if (right == null) return left

			// Check depth limit
			if (currentDepth >= depth) {
				return right
			}

			// Handle arrays based on strategy
			if (Array.isArray(left) && Array.isArray(right)) {
				switch (arrays) {
					case "replace":
						return [...right]
					case "union":
						return [...new Set([...left, ...right])]
					case "concat":
					default:
						return [...left, ...right]
				}
			}

			// Handle objects (deep merge)
			if (
				typeof left === "object" &&
				typeof right === "object" &&
				!Array.isArray(left) &&
				!Array.isArray(right)
			) {
				const result: Record<string, any> = {}

				// Get all keys from both objects
				const allKeys = new Set([
					...Object.keys(left),
					...Object.keys(right),
				])

				for (const key of allKeys) {
					const leftValue = left[key]
					const rightValue = right[key]

					if (!(key in right)) {
						result[key] = leftValue
					} else if (!(key in left)) {
						result[key] = rightValue
					} else if (
						typeof leftValue === "object" &&
						typeof rightValue === "object" &&
						leftValue !== null &&
						rightValue !== null &&
						!Array.isArray(leftValue) &&
						!Array.isArray(rightValue)
					) {
						// Recursively merge nested objects
						result[key] = mergeTwo(leftValue, rightValue, currentDepth + 1)
					} else if (
						Array.isArray(leftValue) &&
						Array.isArray(rightValue)
					) {
						// Handle arrays according to strategy
						result[key] = mergeTwo(leftValue, rightValue, currentDepth)
					} else {
						// Use resolver for primitive conflicts
						result[key] = resolver(key, leftValue, rightValue)
					}
				}

				return result
			}

			// For primitives and type mismatches, right wins
			return right
		}

		// Merge all sources from left to right
		return sources.reduce((acc, source) => mergeTwo(acc, source, 0), {})
	}

export default smartMerge
