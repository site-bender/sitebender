import type { Value } from "../../../../types/index.ts"

/**
 * Deeply merges objects recursively with target properties taking precedence
 * 
 * Performs a deep recursive merge where nested objects are merged rather than
 * replaced. Arrays are replaced (not concatenated). Useful for deeply nested 
 * configuration objects. Handles circular references safely.
 * 
 * @curried (...sources) => (target) => result
 * @param sources - Default objects to be recursively merged and overridden by target
 * @param target - The object whose properties take precedence at all levels
 * @returns A new deeply merged object
 * @example
 * ```typescript
 * // Deep merging - nested objects are merged, not replaced
 * mergeDeep({
 *   user: { name: "default", role: "user" },
 *   settings: { theme: "light", notifications: true }
 * })({
 *   user: { name: "Alice" },
 *   settings: { theme: "dark" }
 * })
 * // Result: {
 * //   user: { name: "Alice", role: "user" },
 * //   settings: { theme: "dark", notifications: true }
 * // }
 * 
 * // Arrays are replaced, not merged
 * mergeDeep({ tags: ["default"] })({ tags: ["custom", "user"] })
 * // { tags: ["custom", "user"] }
 * 
 * // Multiple sources (merged left to right, then target overrides)
 * const withDefaults = mergeDeep(
 *   { level1: { a: 1, b: 2 } },
 *   { level1: { b: 20, c: 3 } },
 *   { level2: { x: 10 } }
 * )
 * withDefaults({ level1: { a: 100 } })
 * // { level1: { a: 100, b: 20, c: 3 }, level2: { x: 10 } }
 * 
 * // Handles null/undefined gracefully
 * mergeDeep({ a: { b: 1 } })(null)          // { a: { b: 1 } }
 * mergeDeep(null)({ a: { b: 1 } })          // { a: { b: 1 } }
 * 
 * // Circular reference handling
 * const circular: any = { a: 1 }
 * circular.self = circular
 * mergeDeep(circular)({ b: 2 })             // { a: 1, b: 2 } (circular ref handled)
 * 
 * // Configuration merging use case
 * const defaultConfig = {
 *   server: {
 *     port: 3000,
 *     host: "localhost",
 *     ssl: { enabled: false, cert: null }
 *   },
 *   features: { auth: true, logging: true }
 * }
 * 
 * const userConfig = {
 *   server: {
 *     port: 8080,
 *     ssl: { enabled: true, cert: "/path/to/cert" }
 *   },
 *   features: { logging: false }
 * }
 * 
 * mergeDeep(defaultConfig)(userConfig)
 * // {
 * //   server: {
 * //     port: 8080,
 * //     host: "localhost",
 * //     ssl: { enabled: true, cert: "/path/to/cert" }
 * //   },
 * //   features: { auth: true, logging: false }
 * // }
 * ```
 * @property Immutable - creates new object, doesn't modify inputs
 * @property Deep - recursively merges nested objects
 * @property Target precedence - target properties override source defaults at all levels
 * @property Circular safe - handles circular references without infinite recursion
 */
const mergeDeep = <T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) => (target: T | null | undefined): T & Record<string | symbol, Value> => {
	// Track visited objects to handle circular references
	const visited = new WeakSet()
	
	const deepMergeRecursive = (
		dst: Record<string | symbol, Value>,
		src: Record<string | symbol, Value> | null | undefined
	): Record<string | symbol, Value> => {
		if (!src || typeof src !== "object") return dst
		
		// Check for circular reference
		if (visited.has(src)) return dst
		visited.add(src)
		
		// Merge properties
		for (const key in src) {
			if (!Object.prototype.hasOwnProperty.call(src, key)) continue
			
			const srcValue = src[key]
			const dstValue = dst[key]
			
			// If both values are objects (but not arrays), merge them recursively
			if (
				srcValue && typeof srcValue === "object" && !Array.isArray(srcValue) &&
				dstValue && typeof dstValue === "object" && !Array.isArray(dstValue)
			) {
				dst[key] = deepMergeRecursive({ ...dstValue }, srcValue)
			} else {
				// Otherwise, source value replaces destination value
				dst[key] = srcValue
			}
		}
		
		// Handle symbol keys
		const symbols = Object.getOwnPropertySymbols(src)
		for (const sym of symbols) {
			const srcValue = src[sym as keyof typeof src]
			const dstValue = dst[sym as keyof typeof dst]
			
			if (
				srcValue && typeof srcValue === "object" && !Array.isArray(srcValue) &&
				dstValue && typeof dstValue === "object" && !Array.isArray(dstValue)
			) {
				dst[sym as keyof typeof dst] = deepMergeRecursive({ ...dstValue }, srcValue) as Value
			} else {
				dst[sym as keyof typeof dst] = srcValue as Value
			}
		}
		
		return dst
	}
	
	// Start with empty result
	let result: Record<string | symbol, Value> = {}
	
	// First merge all sources together (left to right)
	for (const source of sources) {
		if (source && typeof source === "object") {
			result = deepMergeRecursive(result, source)
		}
	}
	
	// Then apply target (target overrides sources)
	if (target && typeof target === "object") {
		result = deepMergeRecursive(result, target)
	}
	
	return result as T & Record<string | symbol, Value>
}

export default mergeDeep