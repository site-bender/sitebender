import type { Value } from "../../../../types/index.ts"

/**
 * Merges objects together with target properties taking precedence
 * 
 * Performs a shallow merge where the target object's properties override
 * the source defaults. Useful for applying defaults while allowing overrides.
 * Returns a new object without modifying the originals. Handles null/undefined gracefully.
 * 
 * @curried (...sources) => (target) => result
 * @param sources - Default objects to be overridden by target
 * @param target - The object whose properties take precedence
 * @returns A new object with merged properties
 * @example
 * ```typescript
 * // Basic merging - target overrides source
 * merge({ b: 2, c: 3 })({ a: 1, b: 10 })     // { a: 1, b: 10, c: 3 }
 * merge({ x: "default" })({ x: "custom", y: 2 }) // { x: "custom", y: 2 }
 * 
 * // Multiple defaults (merged left to right, then target overrides)
 * const mergeMany = merge({ b: 2 }, { c: 3 }, { b: 20 })
 * mergeMany({ a: 1 })                        // { a: 1, b: 20, c: 3 }
 * mergeMany({ a: 1, b: 100 })                // { a: 1, b: 100, c: 3 }
 * 
 * // Arrays are replaced, not merged
 * merge({ arr: [3, 4] })({ arr: [1, 2] })    // { arr: [1, 2] }
 * 
 * // Nested objects (shallow merge only)
 * merge({ user: { age: 30 } })({ user: { name: "John", age: 25 } })
 * // { user: { name: "John", age: 25 } } - entire user object from target
 * 
 * // Null/undefined handling
 * merge({ a: 1 })(null)                      // { a: 1 }
 * merge({ a: 1 })(undefined)                 // { a: 1 }
 * merge(null)({ a: 1 })                      // { a: 1 }
 * merge(undefined)({ a: 1 })                 // { a: 1 }
 * 
 * // Empty objects
 * merge({})({ a: 1, b: 2 })                  // { a: 1, b: 2 }
 * merge({ a: 1, b: 2 })({})                  // { a: 1, b: 2 }
 * 
 * // Partial application for defaults
 * const withDefaults = merge({ role: "user", active: true })
 * withDefaults({ name: "Alice" })            // { name: "Alice", role: "user", active: true }
 * withDefaults({ name: "Bob", role: "admin" }) // { name: "Bob", role: "admin", active: true }
 * 
 * // Configuration with defaults
 * const withConfig = merge({ port: 3000, host: "localhost", debug: false })
 * withConfig({ port: 8080 })                 // { port: 8080, host: "localhost", debug: false }
 * withConfig({ host: "0.0.0.0", ssl: true }) // { port: 3000, host: "0.0.0.0", debug: false, ssl: true }
 * ```
 * @property Immutable - creates new object, doesn't modify inputs
 * @property Shallow - only merges top-level properties
 * @property Target precedence - target properties override source defaults
 */
const merge = <T extends Record<string | symbol, Value>>(...sources: Array<Record<string | symbol, Value> | null | undefined>) =>
(target: T | null | undefined): T & Record<string | symbol, Value> => {
	// Start with empty result
	const result: Record<string | symbol, Value> = {}
	
	// First merge all sources together (later sources override earlier ones)
	for (const source of sources) {
		if (source && typeof source === "object") {
			// Copy string keys
			for (const key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					result[key] = source[key]
				}
			}
			// Copy symbol keys
			const symbols = Object.getOwnPropertySymbols(source)
			for (const sym of symbols) {
				const sourceObj = source as Record<string | symbol, Value>
				result[sym] = sourceObj[sym]
			}
		}
	}
	
	// Then apply target properties (target overrides sources)
	if (target && typeof target === "object") {
		// Copy string keys
		for (const key in target) {
			if (Object.prototype.hasOwnProperty.call(target, key)) {
				result[key] = target[key]
			}
		}
		// Copy symbol keys
		const symbols = Object.getOwnPropertySymbols(target)
		for (const sym of symbols) {
			const targetObj = target as Record<string | symbol, Value>
			result[sym] = targetObj[sym]
		}
	}
	
	return result as T & Record<string | symbol, Value>
}

export default merge