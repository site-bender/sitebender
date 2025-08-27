import type { Value } from "../../../types/index.ts"

/**
 * Merges objects together with target properties taking precedence
 *
 * Performs a shallow merge where the target object's properties override
 * the source defaults. Useful for applying defaults while allowing overrides.
 * Returns a new object without modifying the originals. Handles null/undefined gracefully.
 *
 * @pure
 * @immutable
 * @curried
 * @param sources - Default objects to be overridden by target
 * @param target - The object whose properties take precedence
 * @returns A new object with merged properties
 * @example
 * ```typescript
 * // Basic merging - target overrides source
 * merge({ b: 2, c: 3 })({ a: 1, b: 10 }) // { a: 1, b: 10, c: 3 }
 *
 * // Multiple sources
 * merge({ a: 1 }, { b: 2 }, { a: 10 })({ c: 3 }) // { a: 10, b: 2, c: 3 }
 *
 * // Partial application for defaults
 * const withDefaults = merge({ role: "user", active: true })
 * withDefaults({ name: "Alice" }) // { name: "Alice", role: "user", active: true }
 * withDefaults({ name: "Bob", role: "admin" }) // { name: "Bob", role: "admin", active: true }
 *
 * // Arrays are replaced, not merged
 * merge({ arr: [3, 4] })({ arr: [1, 2] }) // { arr: [1, 2] }
 *
 * // Null handling
 * merge({ a: 1 })(null) // { a: 1 }
 * merge(null)({ a: 1 }) // { a: 1 }
 * ```
 */
const merge = <T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) =>
(target: T | null | undefined): T & Record<string | symbol, Value> => {
	// Combine all sources and target into one array
	const allObjects = [...sources, target].filter((obj) =>
		obj != null && typeof obj === "object"
	)

	// Use reduce to merge all objects
	return allObjects.reduce((acc, obj) => {
		// Get all keys (both string and symbol)
		const allKeys = [
			...Object.keys(obj),
			...Object.getOwnPropertySymbols(obj),
		]

		// Merge keys into accumulator
		return allKeys.reduce((innerAcc, key) => ({
			...innerAcc,
			[key]: (obj as Record<string | symbol, Value>)[key],
		}), acc)
	}, {} as Record<string | symbol, Value>) as
		& T
		& Record<string | symbol, Value>
}

export default merge
