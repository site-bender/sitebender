import type { Value } from "../../../../types/index.ts"

/**
 * Returns an array of an object's own enumerable property values
 * 
 * Retrieves all values from own enumerable properties of an object,
 * excluding symbol properties and prototype properties. Order matches
 * Object.keys() but is not guaranteed across JavaScript engines.
 * 
 * @curried Single parameter - already curried
 * @param obj - The object to extract values from
 * @returns Array of values
 * @example
 * ```typescript
 * // Basic object values
 * values({ a: 1, b: 2, c: 3 })               // [1, 2, 3]
 * values({ name: "John", age: 30 })          // ["John", 30]
 * values({})                                  // []
 * 
 * // Arrays (returns elements)
 * values(["a", "b", "c"])                    // ["a", "b", "c"]
 * values([])                                  // []
 * 
 * // Mixed value types
 * values({ 
 *   str: "text",
 *   num: 42,
 *   bool: true,
 *   obj: { nested: "value" },
 *   arr: [1, 2, 3]
 * })
 * // ["text", 42, true, { nested: "value" }, [1, 2, 3]]
 * 
 * // Functions as values
 * const obj = {
 *   method: () => "result",
 *   property: "value"
 * }
 * values(obj)                                 // [() => "result", "value"]
 * 
 * // Symbol properties are excluded
 * const sym = Symbol("key")
 * values({ [sym]: "symbol", regular: "string" }) // ["string"]
 * 
 * // Null/undefined handling
 * values(null)                                // []
 * values(undefined)                           // []
 * 
 * // Non-objects
 * values(42)                                  // []
 * values("hello")                             // ["h", "e", "l", "l", "o"]
 * values(true)                                // []
 * 
 * // With Object.defineProperty
 * const custom = {}
 * Object.defineProperty(custom, "hidden", {
 *   value: "secret",
 *   enumerable: false
 * })
 * Object.defineProperty(custom, "visible", {
 *   value: "public",
 *   enumerable: true
 * })
 * values(custom)                              // ["public"]
 * 
 * // Partial application for data extraction
 * const getValues = values
 * const data = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ]
 * data.map(getValues)                        // [[1, "Alice"], [2, "Bob"]]
 * ```
 * @property Safe - handles null/undefined gracefully
 * @property Own properties only - excludes prototype chain
 * @property Enumerable only - excludes non-enumerable properties
 */
const values = <T extends Record<string, Value>>(
	obj: T | null | undefined
): Array<T[keyof T]> => {
	if (obj == null) {
		return []
	}
	
	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they return characters
		if (typeof obj === "string") {
			return Array.from(obj) as Array<T[keyof T]>
		}
		return []
	}
	
	return Object.values(obj) as Array<T[keyof T]>
}

export default values