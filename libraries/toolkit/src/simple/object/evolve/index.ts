import type { Value } from "../../../types/index.ts"
import type {
	Transformation,
	TransformationSpec,
} from "../../../types/object/index.ts"

/**
 * Recursively evolves an object by applying transformation functions to specific paths
 *
 * Creates a new object by recursively applying a structure of transformation
 * functions to a matching structure in the target object. Each function in the
 * transformations object is applied to the corresponding value in the target.
 * Non-function values in transformations are ignored. Unmatched paths in target
 * are preserved unchanged.
 *
 * @pure
 * @immutable
 * @curried
 * @param transformations - Object matching target structure with functions as values
 * @param obj - Object to evolve
 * @returns A new object with transformations applied
 * @example
 * ```typescript
 * // Simple transformations
 * evolve({
 *   count: (x: number) => x + 1,
 *   name: (s: string) => s.toUpperCase()
 * })({
 *   count: 10,
 *   name: "alice",
 *   unchanged: true
 * })
 * // { count: 11, name: "ALICE", unchanged: true }
 *
 * // Nested transformations
 * evolve({
 *   user: {
 *     age: (x: number) => x + 1,
 *     name: (s: string) => s.trim()
 *   },
 *   scores: (arr: number[]) => arr.map(x => x * 2)
 * })({
 *   user: { age: 30, name: "  Bob  ", id: 123 },
 *   scores: [10, 20, 30],
 *   other: "unchanged"
 * })
 * // { user: { age: 31, name: "Bob", id: 123 }, scores: [20, 40, 60], other: "unchanged" }
 *
 * // Array element transformations
 * evolve({
 *   items: {
 *     0: { price: (p: number) => p * 1.1 },
 *     1: { price: (p: number) => p * 0.9 }
 *   }
 * })({ items: [{ name: "A", price: 100 }, { name: "B", price: 200 }] })
 * // { items: [{ name: "A", price: 110 }, { name: "B", price: 180 }] }
 *
 * // Partial application for configuration  
 * const incrementPatch = evolve({
 *   version: { patch: (x: number) => x + 1 }
 * })
 * incrementPatch({ version: { major: 1, minor: 2, patch: 3 }, name: "app" })
 * // { version: { major: 1, minor: 2, patch: 4 }, name: "app" }
 * ```
 */
const evolve = <T extends Record<string, Value>>(
	transformations: Record<string, TransformationSpec>,
) =>
(obj: T | null | undefined): T => {
	if (obj == null || typeof obj !== "object") {
		return {} as T
	}

	const evolveRecursive = (
		trans: TransformationSpec,
		target: Value | Record<string, Value> | Array<Value>,
	): Value | Record<string, Value> | Array<Value> => {
		// If target is not an object, return it unchanged
		if (target == null || typeof target !== "object") {
			return target
		}

		// If transformations is not an object, return target unchanged
		if (trans == null || typeof trans !== "object") {
			return target
		}

		// Handle arrays
		if (Array.isArray(target)) {
			return target.map((item, index) => {
				const transformation = trans[index]
				if (typeof transformation === "function") {
					return transformation(item)
				} else if (typeof transformation === "object") {
					return evolveRecursive(transformation, item)
				}
				return item
			})
		}

		// Handle objects - combine all keys
		const allKeys = [
			...Object.keys(target),
			...Object.keys(trans),
			...Object.getOwnPropertySymbols(target),
			...Object.getOwnPropertySymbols(trans),
		]

		// Use reduce to build the result object
		return allKeys.reduce((acc, key) => {
			const isSymbol = typeof key === "symbol"
			const targetValue = isSymbol
				? (target as Record<string | symbol, Value>)[key]
				: target[key as string]
			const transformation = isSymbol
				? (trans as Record<string | symbol, TransformationSpec>)[key]
				: trans[key as string]

			// Determine the value for this key
			const newValue = (() => {
				if (typeof transformation === "function" && targetValue !== undefined) {
					return (transformation as Transformation)(targetValue)
				} else if (
					transformation != null && typeof transformation === "object"
				) {
					return evolveRecursive(transformation, targetValue || {})
				} else if (targetValue !== undefined) {
					return targetValue
				}
				return undefined
			})()

			// Only add to result if value is defined
			if (newValue !== undefined) {
				return {
					...acc,
					[key]: newValue,
				}
			}
			return acc
		}, {} as Record<string | symbol, Value>)
	}

	return evolveRecursive(transformations, obj)
}

export default evolve
