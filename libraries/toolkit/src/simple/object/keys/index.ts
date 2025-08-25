/**
 * Returns an array of an object's own enumerable property names
 *
 * Retrieves all own enumerable string keys from an object, excluding
 * symbol keys and prototype properties. Order is not guaranteed to be
 * consistent across JavaScript engines.
 *
 * @curried Single parameter - already curried
 * @param obj - The object to extract keys from
 * @returns Array of string keys
 * @example
 * ```typescript
 * // Basic object keys
 * keys({ a: 1, b: 2, c: 3 })                 // ["a", "b", "c"]
 * keys({ name: "John", age: 30 })            // ["name", "age"]
 * keys({})                                    // []
 *
 * // Arrays (returns index strings)
 * keys(["a", "b", "c"])                      // ["0", "1", "2"]
 * keys([])                                    // []
 *
 * // Functions and objects with methods
 * const obj = {
 *   prop: "value",
 *   method() { return this.prop }
 * }
 * keys(obj)                                   // ["prop", "method"]
 *
 * // Symbol keys are excluded
 * const sym = Symbol("key")
 * keys({ [sym]: "symbol", regular: "string" }) // ["regular"]
 *
 * // Prototype properties are excluded
 * class Parent { parentProp = "parent" }
 * class Child extends Parent { childProp = "child" }
 * const instance = new Child()
 * keys(instance)                              // ["parentProp", "childProp"]
 *
 * // Null/undefined handling
 * keys(null)                                  // []
 * keys(undefined)                             // []
 *
 * // Non-objects
 * keys(42)                                    // []
 * keys("string")                              // ["0", "1", "2", "3", "4", "5"]
 * keys(true)                                  // []
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
 * keys(custom)                                // ["visible"]
 * ```
 * @property Safe - handles null/undefined gracefully
 * @property Own properties only - excludes prototype chain
 * @property Enumerable only - excludes non-enumerable properties
 */
const keys = <T extends object>(
	obj: T | null | undefined,
): Array<keyof T & string> => {
	if (obj == null) {
		return []
	}

	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they have enumerable indices
		if (typeof obj === "string") {
			return Array.from(
				{ length: (obj as string).length },
				(_, i) => String(i),
			) as Array<keyof T & string>
		}
		return []
	}

	return Object.keys(obj) as Array<keyof T & string>
}

export default keys
