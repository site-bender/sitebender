import type { Value } from "../../../../types/index.ts"

/**
 * Recursively evolves an object by applying transformation functions to specific paths
 * 
 * Creates a new object by recursively applying a structure of transformation
 * functions to a matching structure in the target object. Each function in the
 * transformations object is applied to the corresponding value in the target.
 * Non-function values in transformations are ignored. Unmatched paths in target
 * are preserved unchanged.
 * 
 * @curried (transformations) => (obj) => result
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
 * // {
 * //   user: { age: 31, name: "Bob", id: 123 },
 * //   scores: [20, 40, 60],
 * //   other: "unchanged"
 * // }
 * 
 * // Deep nesting
 * evolve({
 *   level1: {
 *     level2: {
 *       level3: {
 *         value: (x: number) => x * 10
 *       }
 *     }
 *   }
 * })({
 *   level1: {
 *     level2: {
 *       level3: { value: 5, other: "data" },
 *       sibling: true
 *     },
 *     another: 42
 *   }
 * })
 * // {
 * //   level1: {
 * //     level2: {
 * //       level3: { value: 50, other: "data" },
 * //       sibling: true
 * //     },
 * //     another: 42
 * //   }
 * // }
 * 
 * // Array element transformations
 * evolve({
 *   items: {
 *     0: { price: (p: number) => p * 1.1 },
 *     1: { price: (p: number) => p * 0.9 }
 *   }
 * })({
 *   items: [
 *     { name: "A", price: 100 },
 *     { name: "B", price: 200 },
 *     { name: "C", price: 300 }
 *   ]
 * })
 * // {
 * //   items: [
 * //     { name: "A", price: 110 },
 * //     { name: "B", price: 180 },
 * //     { name: "C", price: 300 }
 * //   ]
 * // }
 * 
 * // Partial application for configuration
 * const incrementVersion = evolve({
 *   version: {
 *     major: (x: number) => x,
 *     minor: (x: number) => x,
 *     patch: (x: number) => x + 1
 *   }
 * })
 * 
 * incrementVersion({
 *   version: { major: 1, minor: 2, patch: 3 },
 *   name: "myapp"
 * })
 * // { version: { major: 1, minor: 2, patch: 4 }, name: "myapp" }
 * 
 * // Non-function values are ignored
 * evolve({
 *   a: (x: number) => x * 2,
 *   b: "not a function", // ignored
 *   c: 42                // ignored
 * })({ a: 5, b: 10, c: 15 })
 * // { a: 10, b: 10, c: 15 }
 * 
 * // Handle null/undefined gracefully
 * evolve({ a: (x: number) => x + 1 })(null)       // {}
 * evolve({ a: (x: number) => x + 1 })(undefined)  // {}
 * ```
 * @property Immutable - returns new object, doesn't modify original
 * @property Deep - recursively applies transformations
 * @property Selective - only transforms specified paths
 * @property Preserving - unspecified paths remain unchanged
 */
type Transformation<T = Value> = (value: T) => Value
type TransformationSpec = Value | Transformation | Record<string, TransformationSpec>

const evolve = <T extends Record<string, Value>>(
	transformations: Record<string, TransformationSpec>
) => (obj: T | null | undefined): T => {
	if (obj == null || typeof obj !== "object") {
		return {} as T
	}
	
	const evolveRecursive = (
		trans: TransformationSpec,
		target: Value | Record<string, Value> | Array<Value>
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
			const result = [...target]
			
			// Apply transformations to array indices if specified
			for (const key in trans) {
				const index = parseInt(key, 10)
				if (!isNaN(index) && index >= 0 && index < result.length) {
					const transformation = trans[key]
					if (typeof transformation === "function") {
						result[index] = transformation(result[index])
					} else if (typeof transformation === "object") {
						result[index] = evolveRecursive(transformation, result[index])
					}
				}
			}
			
			return result
		}
		
		// Handle objects
		const result: Record<string, Value> = {}
		
		// Copy all properties from target
		for (const key in target) {
			if (Object.prototype.hasOwnProperty.call(target, key)) {
				result[key] = target[key]
			}
		}
		
		// Apply transformations
		for (const key in trans) {
			if (Object.prototype.hasOwnProperty.call(trans, key)) {
				const transformation = trans[key]
				
				if (typeof transformation === "function") {
					// Apply function transformation
					if (key in target) {
						result[key] = transformation(target[key])
					}
				} else if (transformation != null && typeof transformation === "object") {
					// Recursively evolve nested objects
					result[key] = evolveRecursive(transformation, target[key] || {})
				}
				// Non-function, non-object values are ignored
			}
		}
		
		// Handle symbol keys in target
		const targetSymbols = Object.getOwnPropertySymbols(target)
		for (const sym of targetSymbols) {
			result[sym as keyof typeof result] = (target as Record<string | symbol, Value>)[sym]
		}
		
		// Apply symbol transformations if any
		const transSymbols = Object.getOwnPropertySymbols(trans)
		for (const sym of transSymbols) {
			const transformation = (trans as Record<string | symbol, TransformationSpec>)[sym]
			if (typeof transformation === "function" && sym in target) {
				result[sym as keyof typeof result] = (transformation as Transformation)((target as Record<string | symbol, Value>)[sym]) as Value
			} else if (transformation != null && typeof transformation === "object") {
				result[sym as keyof typeof result] = evolveRecursive(transformation, (target as Record<string | symbol, Value>)[sym] || {}) as Value
			}
		}
		
		return result
	}
	
	return evolveRecursive(transformations, obj)
}

export default evolve