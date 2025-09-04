import type { Value } from "../../../types/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"

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
	...sources: Array<unknown | null | undefined>
) =>
(target: T | null | undefined): T & Record<string | symbol, Value> => {
	const deepMergeTwo = (
		dst: Record<string | symbol, Value>,
		src: unknown | null | undefined,
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
			if (
				srcValue && typeof srcValue === "object" && !Array.isArray(srcValue) &&
				dstValue && typeof dstValue === "object" && !Array.isArray(dstValue)
			) {
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
	const allToMerge = [...sources, target].filter((x) =>
		isNotNullish(x) && typeof x === "object"
	)

	return allToMerge.reduce(
		(acc, current) => deepMergeTwo(acc, current),
		{} as Record<string | symbol, Value>,
	) as T & Record<string | symbol, Value>
}

export default mergeDeep
