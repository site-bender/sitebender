import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
