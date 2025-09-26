import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Creates a deep clone of an object
 *
 * Recursively clones an object and all its nested properties, creating
 * new instances of objects and arrays. Handles circular references by
 * tracking visited objects. Preserves special object types like Date,
 * RegExp, Map, and Set. Functions and symbols are copied by reference.
 *
 * @pure
 * @immutable
 * @param obj - The object to clone
 * @returns A deep clone of the object
 * @example
 * ```typescript
 * // Basic object cloning
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = clone(original)
 * // Original remains unchanged when mutating clone
 * original.b.c // 2
 *
 * // Array cloning
 * const arr = [1, [2, 3], { a: 4 }]
 * const clonedArr = clone(arr)
 * // Deep structures are fully cloned
 *
 * // Date objects preserved
 * const obj = { created: new Date("2024-01-01") }
 * const clonedObj = clone(obj)
 * clonedObj.created instanceof Date // true
 *
 * // Map and Set support
 * const data = {
 *   map: new Map([["key1", "value1"]]),
 *   set: new Set([1, 2, 3])
 * }
 * const clonedData = clone(data)
 * clonedData.map instanceof Map // true
 *
 * // Circular references handled
 * const circular: any = { a: 1 }
 * circular.self = circular
 * const clonedCircular = clone(circular)
 * clonedCircular.self === clonedCircular // true
 *
 * // Functions copied by reference
 * const withFunc = { method: () => "hello", data: { x: 1 } }
 * const clonedFunc = clone(withFunc)
 * clonedFunc.method === withFunc.method // true
 * clonedFunc.data === withFunc.data     // false
 * ```
 */
export default function clone<T extends Value>(obj: T): T {
	// Handle primitives and null/undefined
	if (isNullish(obj) || typeof obj !== "object") {
		return obj
	}

	// Use a WeakMap to track visited objects for circular reference handling
	const visited = new WeakMap()

	function cloneRecursive(source: Value): Value {
		// Handle primitives
		if (isNullish(source) || typeof source !== "object") {
			return source
		}

		// Check for circular reference
		if (visited.has(source)) {
			return visited.get(source)
		}

		// Handle Date
		if (source instanceof Date) {
			const cloned = new Date(source.getTime())
			visited.set(source, cloned)
			return cloned
		}

		// Handle RegExp
		if (source instanceof RegExp) {
			const cloned = new RegExp(source.source, source.flags)
			visited.set(source, cloned)
			return cloned
		}

		// Handle Map
		if (source instanceof Map) {
			const cloned = new Map<string, Value>()
			visited.set(source, cloned)
			Array.from(source.entries()).forEach(
				function cloneMapEntry([key, value]) {
					const k = String(key)
					cloned.set(k, cloneRecursive(value))
				},
			)
			return cloned
		}

		// Handle Set
		if (source instanceof Set) {
			const cloned = new Set<Value>()
			visited.set(source, cloned)
			Array.from(source.values()).forEach(function cloneSetValue(value) {
				cloned.add(cloneRecursive(value))
			})
			return cloned
		}

		// Handle Array
		if (Array.isArray(source)) {
			const cloned: Array<Value> = []
			visited.set(source, cloned)
			source.forEach(function cloneArrayItem(item, index) {
				cloned[index] = cloneRecursive(item)
			})
			return cloned
		}

		// Handle plain objects
		const cloned: Record<string | symbol, Value> = {}
		visited.set(source, cloned)

		// Clone all own properties (including symbols)
		const keys = [
			...Object.keys(source),
			...Object.getOwnPropertySymbols(source),
		]

		keys.forEach(function cloneProperty(key) {
			const descriptor = Object.getOwnPropertyDescriptor(source, key)
			if (descriptor) {
				if (descriptor.get || descriptor.set) {
					// Copy getters/setters as-is
					Object.defineProperty(cloned, key, descriptor)
				} else {
					cloned[key] = cloneRecursive(
						(source as Record<string | symbol, Value>)[key],
					)
				}
			}
		})

		// Preserve prototype
		Object.setPrototypeOf(cloned, Object.getPrototypeOf(source))

		return cloned
	}

	return cloneRecursive(obj) as T
}
