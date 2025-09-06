import isNotNull from "../../validation/isNotNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

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
 * // Default: arrays concat, last value wins
 * const defaultMerge = smartMerge({})
 * defaultMerge(
 *   { a: 1, b: [1, 2], c: { x: 10 } },
 *   { a: 2, b: [3], c: { y: 20 } }
 * )
 * // { a: 2, b: [1, 2, 3], c: { x: 10, y: 20 } }
 *
 * // Array strategies
 * const replaceArrays = smartMerge({ arrays: "replace" })
 * replaceArrays({ items: [1, 2] }, { items: [3, 4] })
 * // { items: [3, 4] }
 *
 * const unionArrays = smartMerge({ arrays: "union" })
 * unionArrays({ tags: ["a", "b"] }, { tags: ["b", "c"] })
 * // { tags: ["a", "b", "c"] }
 *
 * // Custom conflict resolver
 * const custom = smartMerge({
 *   resolver: (key, left, right) => {
 *     if (key === "version") return Math.max(left, right)
 *     return right
 *   }
 * })
 * custom({ version: 1 }, { version: 3 })
 * // { version: 3 }
 *
 * // Deep nested merge
 * const deep = smartMerge({ depth: 10 })
 * deep(
 *   { user: { profile: { theme: "light" } } },
 *   { user: { profile: { lang: "en" } } }
 * )
 * // { user: { profile: { theme: "light", lang: "en" } } }
 *
 * // Multiple sources
 * const multi = smartMerge({})
 * multi(
 *   { a: 1 },
 *   { b: 2 },
 *   { c: 3 }
 * )
 * // { a: 1, b: 2, c: 3 }
 *
 * // Shallow merge (depth = 1)
 * const shallow = smartMerge({ depth: 1 })
 * shallow({ a: { b: 1 } }, { a: { c: 2 } })
 * // { a: { c: 2 } } - nested object replaced
 * ```
 * @pure
 * @immutable
 * @curried
 */
type MergeStrategy = {
	arrays?: "concat" | "replace" | "union"
	depth?: number
	resolver?: (key: string, left: unknown, right: unknown) => unknown
}

const smartMerge =
	(strategy: MergeStrategy = {}) =>
	(...sources: Array<Record<string, unknown>>): Record<string, unknown> => {
		const {
			arrays = "concat",
			depth = 10,
			resolver = (_key: string, _left: unknown, right: unknown) => right,
		} = strategy

		const mergeTwo = (
			left: unknown,
			right: unknown,
			currentDepth: number = 0,
		): unknown => {
			// Handle null/undefined
			if (isNullish(left)) return right
			if (isNullish(right)) return left

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
						return [...new Set<unknown>([...left, ...right])]
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
				// Get all keys from both objects
				const lObj = left as Record<string, unknown>
				const rObj = right as Record<string, unknown>
				const allKeys = [
					...new Set([...Object.keys(lObj), ...Object.keys(rObj)]),
				]

				return allKeys.reduce<Record<string, unknown>>(
					(result, key) => {
						const leftValue = lObj[key]
						const rightValue = rObj[key]

						const value = !(key in right)
							? leftValue
							: !(key in left)
							? rightValue
							: (typeof leftValue === "object" &&
									typeof rightValue === "object" &&
									isNotNull(leftValue) &&
									isNotNull(rightValue) &&
									!Array.isArray(leftValue) &&
									!Array.isArray(rightValue))
							? mergeTwo(leftValue, rightValue, currentDepth + 1)
							: (Array.isArray(leftValue) &&
									Array.isArray(rightValue))
							? mergeTwo(leftValue, rightValue, currentDepth)
							: resolver(key, leftValue, rightValue)

						return { ...result, [key]: value }
					},
					{} as Record<string, unknown>,
				)
			}

			// For primitives and type mismatches, right wins
			return right
		}

		// Merge all sources from left to right
		return sources.reduce<Record<string, unknown>>(
			(acc, source) =>
				mergeTwo(acc, source, 0) as Record<string, unknown>,
			{},
		)
	}

export default smartMerge
