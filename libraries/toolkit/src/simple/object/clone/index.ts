import type { Value } from "../../../types/index.ts"

/**
 * Creates a deep clone of an object
 * 
 * Recursively clones an object and all its nested properties, creating
 * new instances of objects and arrays. Handles circular references by
 * tracking visited objects. Preserves special object types like Date,
 * RegExp, Map, and Set. Functions and symbols are copied by reference.
 * 
 * @param obj - The object to clone
 * @returns A deep clone of the object
 * @example
 * ```typescript
 * // Basic object cloning
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = clone(original)
 * cloned.b.c = 3
 * original.b.c // 2 (original unchanged)
 * cloned.b.c   // 3
 * 
 * // Array cloning
 * const arr = [1, [2, 3], { a: 4 }]
 * const clonedArr = clone(arr)
 * clonedArr[1].push(4)
 * arr[1]       // [2, 3] (original unchanged)
 * clonedArr[1] // [2, 3, 4]
 * 
 * // Nested structures
 * const nested = {
 *   user: {
 *     name: "Alice",
 *     settings: {
 *       theme: "dark",
 *       notifications: ["email", "sms"]
 *     }
 *   }
 * }
 * const clonedNested = clone(nested)
 * clonedNested.user.settings.notifications.push("push")
 * nested.user.settings.notifications       // ["email", "sms"]
 * clonedNested.user.settings.notifications // ["email", "sms", "push"]
 * 
 * // Date objects
 * const obj = { created: new Date("2024-01-01") }
 * const clonedObj = clone(obj)
 * clonedObj.created.setFullYear(2025)
 * obj.created.getFullYear()       // 2024 (original unchanged)
 * clonedObj.created.getFullYear() // 2025
 * 
 * // RegExp objects
 * const pattern = { regex: /test/gi }
 * const clonedPattern = clone(pattern)
 * clonedPattern.regex.test("TEST") // true
 * clonedPattern.regex !== pattern.regex // true (different instance)
 * 
 * // Map and Set
 * const data = {
 *   map: new Map([["key1", "value1"], ["key2", "value2"]]),
 *   set: new Set([1, 2, 3])
 * }
 * const clonedData = clone(data)
 * clonedData.map.set("key3", "value3")
 * clonedData.set.add(4)
 * data.map.has("key3")     // false
 * clonedData.map.has("key3") // true
 * data.set.has(4)          // false
 * clonedData.set.has(4)    // true
 * 
 * // Circular references
 * const circular: any = { a: 1 }
 * circular.self = circular
 * const clonedCircular = clone(circular)
 * clonedCircular.self === clonedCircular // true (maintains circular reference)
 * clonedCircular !== circular            // true (different object)
 * 
 * // Functions are copied by reference
 * const withFunc = { 
 *   method: () => "hello",
 *   data: { x: 1 }
 * }
 * const clonedFunc = clone(withFunc)
 * clonedFunc.method === withFunc.method // true (same function reference)
 * clonedFunc.data === withFunc.data     // false (data is cloned)
 * 
 * // Null and undefined
 * clone(null)      // null
 * clone(undefined) // undefined
 * clone({ a: null, b: undefined }) // { a: null, b: undefined }
 * 
 * // Primitives
 * clone(42)        // 42
 * clone("hello")   // "hello"
 * clone(true)      // true
 * ```
 * @property Deep operation - recursively clones all nested structures
 * @property Circular reference safe - handles objects that reference themselves
 * @property Type preservation - maintains special object types
 */
const clone = <T extends Value>(obj: T): T => {
	// Handle primitives and null/undefined
	if (obj === null || obj === undefined || typeof obj !== "object") {
		return obj
	}
	
	// Use a WeakMap to track visited objects for circular reference handling
	const visited = new WeakMap()
	
	const cloneRecursive = (source: Value): Value => {
		// Handle primitives
		if (source === null || source === undefined || typeof source !== "object") {
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
			const cloned = new Map()
			visited.set(source, cloned)
			source.forEach((value, key) => {
				cloned.set(cloneRecursive(key), cloneRecursive(value))
			})
			return cloned
		}
		
		// Handle Set
		if (source instanceof Set) {
			const cloned = new Set()
			visited.set(source, cloned)
			source.forEach(value => {
				cloned.add(cloneRecursive(value))
			})
			return cloned
		}
		
		// Handle Array
		if (Array.isArray(source)) {
			const cloned: Array<Value> = []
			visited.set(source, cloned)
			source.forEach((item, index) => {
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
			...Object.getOwnPropertySymbols(source)
		]
		
		keys.forEach(key => {
			const descriptor = Object.getOwnPropertyDescriptor(source, key)
			if (descriptor) {
				if (descriptor.get || descriptor.set) {
					// Copy getters/setters as-is
					Object.defineProperty(cloned, key, descriptor)
				} else {
					cloned[key] = cloneRecursive((source as Record<string | symbol, Value>)[key])
				}
			}
		})
		
		// Preserve prototype
		Object.setPrototypeOf(cloned, Object.getPrototypeOf(source))
		
		return cloned
	}
	
	return cloneRecursive(obj) as T
}

export default clone