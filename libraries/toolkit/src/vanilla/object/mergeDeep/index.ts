import type { Value } from "../../../types/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"

const isPlainObject = (val: unknown): val is Record<string | symbol, Value> => {
	if (!val || typeof val !== "object") return false
	if (Array.isArray(val)) return false
	if (val instanceof Date) return false
	if (val instanceof RegExp) return false
	if (val instanceof Map) return false
	if (val instanceof Set) return false
	// Temporal types
	if (
		val instanceof Temporal.PlainDate ||
		val instanceof Temporal.PlainTime ||
		val instanceof Temporal.PlainDateTime ||
		val instanceof Temporal.ZonedDateTime
	) return false
	return true
}

/**
 * Deeply merges objects recursively with target properties taking precedence
 *
 * Performs a deep recursive merge where nested objects are merged rather than
 * replaced. Arrays are replaced (not concatenated). Useful for deeply nested
 * configuration objects. Handles circular references safely.
 *
 * @pure
 * @immutable
 * @curried
 * @param sources - Default objects to be recursively merged and overridden by target
 * @param target - The object whose properties take precedence at all levels
 * @returns A new deeply merged object
 * @example
 * ```typescript
 * // Deep merge nested objects
 * mergeDeep({
 *   user: { name: "default", role: "user" },
 *   settings: { theme: "light" }
 * })({ user: { name: "Alice" } })
 * // { user: { name: "Alice", role: "user" }, settings: { theme: "light" } }
 *
 * // Configuration with defaults
 * const withDefaults = mergeDeep({
 *   server: { port: 3000, host: "localhost" },
 *   features: { auth: true }
 * })
 * withDefaults({ server: { port: 8080 } })
 * // { server: { port: 8080, host: "localhost" }, features: { auth: true } }
 *
 * // Arrays are replaced
 * mergeDeep({ tags: ["default"] })({ tags: ["custom"] })
 * // { tags: ["custom"] }
 *
 * // Multiple sources
 * mergeDeep({ a: { x: 1 } }, { a: { y: 2 } })({ a: { z: 3 } })
 * // { a: { x: 1, y: 2, z: 3 } }
 *
 * // Edge cases
 * mergeDeep({ a: 1 })(null) // { a: 1 }
 * mergeDeep({})({}) // {}
 * ```
 */
const mergeDeep = <T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) =>
(target: T | null | undefined): T & Record<string | symbol, Value> => {
	const deepMergeTwo = (
		dst: Record<string | symbol, Value>,
		src: Record<string | symbol, Value> | null | undefined,
	): Record<string | symbol, Value> => {
		if (!src || typeof src !== "object") return dst

		// Get all keys (both string and symbol)
		const allKeys = [
			...Object.keys(src as Record<string, unknown>),
			...Object.getOwnPropertySymbols(src as object),
		]

		// Use reduce to build merged object
		return allKeys.reduce((acc, key) => {
			const srcValue = (src as Record<string | symbol, Value>)[key]
			const dstValue = (acc as Record<string | symbol, Value>)[key]

			// If both values are objects (but not arrays), merge them recursively
			if (isPlainObject(srcValue) && isPlainObject(dstValue)) {
				return {
					...acc,
					[key]: deepMergeTwo(dstValue, srcValue),
				}
			}

			// Otherwise, source value replaces destination value
			return {
				...acc,
				[key]: srcValue,
			}
		}, { ...dst })
	}

	// Merge all sources and target using reduce
	const allToMerge = [...sources, target].filter((
		x,
	): x is Record<string | symbol, Value> =>
		isNotNullish(x) && typeof x === "object"
	)

	return allToMerge.reduce(
		(acc, current) => deepMergeTwo(acc, current),
		{} as Record<string | symbol, Value>,
	) as T & Record<string | symbol, Value>
}

export default mergeDeep
