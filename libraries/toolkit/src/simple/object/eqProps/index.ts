import type { Value } from "../../../types/index.ts"

/**
 * Checks if two objects have equal values for a specified property
 * 
 * Compares the values of a specific property in two objects using
 * deep equality comparison. Returns true if both values are deeply
 * equal, false otherwise. Handles nested objects, arrays, and special
 * types like Date and RegExp.
 * 
 * @curried (prop) => (obj1) => (obj2) => result
 * @param prop - The property key to compare
 * @param obj1 - The first object
 * @param obj2 - The second object
 * @returns True if the property values are equal, false otherwise
 * @example
 * ```typescript
 * // Basic property comparison
 * eqProps("a")({ a: 1, b: 2 })({ a: 1, c: 3 })    // true
 * eqProps("a")({ a: 1 })({ a: 2 })                // false
 * eqProps("name")({ name: "Alice" })({ name: "Alice" }) // true
 * 
 * // Missing properties
 * eqProps("x")({ a: 1 })({ b: 2 })                // true (both undefined)
 * eqProps("x")({ x: undefined })({ y: 1 })        // true (both undefined)
 * eqProps("x")({ x: null })({ x: undefined })     // false
 * 
 * // Deep equality for objects
 * eqProps("data")(
 *   { data: { x: 1, y: 2 } }
 * )(
 *   { data: { x: 1, y: 2 } }
 * ) // true
 * 
 * eqProps("user")(
 *   { user: { name: "Bob", age: 30 } }
 * )(
 *   { user: { name: "Bob", age: 31 } }
 * ) // false
 * 
 * // Array comparison
 * eqProps("items")({ items: [1, 2, 3] })({ items: [1, 2, 3] }) // true
 * eqProps("items")({ items: [1, 2, 3] })({ items: [1, 3, 2] }) // false
 * eqProps("tags")({ tags: ["a", "b"] })({ tags: ["a", "b"] })  // true
 * 
 * // Nested arrays and objects
 * eqProps("complex")(
 *   { complex: [{ a: 1 }, { b: 2 }] }
 * )(
 *   { complex: [{ a: 1 }, { b: 2 }] }
 * ) // true
 * 
 * // Date objects
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-01")
 * const date3 = new Date("2024-01-02")
 * eqProps("created")({ created: date1 })({ created: date2 }) // true
 * eqProps("created")({ created: date1 })({ created: date3 }) // false
 * 
 * // RegExp objects
 * eqProps("pattern")({ pattern: /test/gi })({ pattern: /test/gi }) // true
 * eqProps("pattern")({ pattern: /test/g })({ pattern: /test/gi })  // false
 * 
 * // Special values
 * eqProps("value")({ value: NaN })({ value: NaN })           // true
 * eqProps("value")({ value: 0 })({ value: -0 })              // true (0 === -0 in JavaScript)
 * eqProps("value")({ value: Infinity })({ value: Infinity }) // true
 * 
 * // Symbol properties
 * const sym = Symbol("key")
 * eqProps(sym)({ [sym]: "value" })({ [sym]: "value" }) // true
 * eqProps(sym)({ [sym]: "value" })({ [sym]: "other" }) // false
 * 
 * // Partial application for validation
 * const haveSameId = eqProps("id")
 * haveSameId({ id: 1, name: "A" })({ id: 1, name: "B" }) // true
 * haveSameId({ id: 1 })({ id: 2 })                       // false
 * 
 * const haveSameStructure = eqProps("schema")
 * const schema = { fields: ["name", "age"], required: true }
 * haveSameStructure({ schema, data: "A" })({ schema, data: "B" }) // true
 * 
 * // Filtering objects with matching properties
 * const users = [
 *   { id: 1, role: "admin" },
 *   { id: 2, role: "user" },
 *   { id: 3, role: "admin" }
 * ]
 * const isAdmin = eqProps("role")({ role: "admin" })
 * users.filter(user => isAdmin(user)) // [{ id: 1, role: "admin" }, { id: 3, role: "admin" }]
 * ```
 * @property Deep equality - recursively compares nested structures
 * @property Type-safe comparison - handles different JavaScript types correctly
 * @property NaN handling - correctly identifies NaN as equal to itself
 */
const eqProps = <K extends string | symbol>(
	prop: K,
) => <T extends Record<string | symbol, Value>>(
	obj1: T,
) => <U extends Record<string | symbol, Value>>(
	obj2: U,
): boolean => {
	// Get the values to compare
	const val1 = obj1?.[prop]
	const val2 = obj2?.[prop]
	
	// Deep equality comparison function
	const deepEqual = (a: Value, b: Value): boolean => {
		// Same reference
		if (a === b) return true
		
		// Handle NaN special case
		if (typeof a === "number" && typeof b === "number" && 
			isNaN(a) && isNaN(b)) return true
		
		// Different types
		if (typeof a !== typeof b) return false
		
		// Null or undefined (already handled by === above if both are same)
		if (a == null || b == null) return false
		
		// Primitives (already handled by === above if equal)
		if (typeof a !== "object" || typeof b !== "object") return false
		
		// Date comparison
		if (a instanceof Date && b instanceof Date) {
			return a.getTime() === b.getTime()
		}
		
		// RegExp comparison
		if (a instanceof RegExp && b instanceof RegExp) {
			return a.source === b.source && a.flags === b.flags
		}
		
		// Array comparison
		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return false
			return a.every((item, index) => deepEqual(item, b[index]))
		}
		
		// Set comparison
		if (a instanceof Set && b instanceof Set) {
			if (a.size !== b.size) return false
			for (const item of a) {
				if (!b.has(item)) return false
			}
			return true
		}
		
		// Map comparison
		if (a instanceof Map && b instanceof Map) {
			if (a.size !== b.size) return false
			for (const [key, value] of a) {
				if (!b.has(key) || !deepEqual(value, b.get(key))) return false
			}
			return true
		}
		
		// Object comparison
		const aKeys = [...Object.keys(a), ...Object.getOwnPropertySymbols(a)]
		const bKeys = [...Object.keys(b), ...Object.getOwnPropertySymbols(b)]
		
		if (aKeys.length !== bKeys.length) return false
		
		return aKeys.every(key => {
			if (!(key in b)) return false
			return deepEqual(
				(a as Record<string | symbol, Value>)[key],
				(b as Record<string | symbol, Value>)[key]
			)
		})
	}
	
	return deepEqual(val1, val2)
}

export default eqProps