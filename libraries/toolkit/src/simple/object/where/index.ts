import type { Value } from "../../../types/index.ts"

/**
 * Checks if an object satisfies a specification of predicates
 * 
 * Tests whether an object satisfies a specification object where each property
 * is a predicate function. Returns true only if all predicates return true for
 * their corresponding properties in the test object. Missing properties fail
 * their predicates unless the predicate explicitly handles undefined.
 * 
 * @curried (spec) => (obj) => boolean
 * @param spec - Object mapping keys to predicate functions
 * @param obj - The object to test
 * @returns True if all predicates are satisfied, false otherwise
 * @example
 * ```typescript
 * // Basic predicate checking
 * where({
 *   age: (x: number) => x >= 18,
 *   name: (x: string) => x.length > 0
 * })({
 *   age: 25,
 *   name: "Alice"
 * })  // true
 * 
 * where({
 *   age: (x: number) => x >= 18,
 *   name: (x: string) => x.length > 0
 * })({
 *   age: 16,
 *   name: "Bob"
 * })  // false (age fails)
 * 
 * // Multiple predicates
 * where({
 *   x: (n: number) => n > 0,
 *   y: (n: number) => n > 0,
 *   z: (n: number) => n > 0
 * })({
 *   x: 10,
 *   y: 20,
 *   z: 30
 * })  // true (all positive)
 * 
 * // String predicates
 * where({
 *   email: (s: string) => s.includes("@"),
 *   password: (s: string) => s.length >= 8
 * })({
 *   email: "user@example.com",
 *   password: "secure123"
 * })  // true
 * 
 * // Array predicates
 * where({
 *   items: (arr: Array<any>) => arr.length > 0,
 *   tags: (arr: Array<string>) => arr.includes("important")
 * })({
 *   items: [1, 2, 3],
 *   tags: ["urgent", "important"]
 * })  // true
 * 
 * // Missing properties fail predicates
 * where({
 *   required: (x: any) => x !== undefined
 * })({
 *   other: "value"
 * })  // false (required is missing)
 * 
 * // Handling undefined explicitly
 * where({
 *   optional: (x: any) => x === undefined || x > 10
 * })({
 *   other: "value"
 * })  // true (undefined is acceptable)
 * 
 * // Nested object validation
 * where({
 *   user: (u: any) => u && u.id && u.name,
 *   timestamp: (t: number) => t > Date.now() - 86400000
 * })({
 *   user: { id: 1, name: "Alice" },
 *   timestamp: Date.now()
 * })  // true
 * 
 * // Type checking
 * where({
 *   name: (x: any) => typeof x === "string",
 *   age: (x: any) => typeof x === "number",
 *   active: (x: any) => typeof x === "boolean"
 * })({
 *   name: "Bob",
 *   age: 30,
 *   active: true
 * })  // true
 * 
 * // Practical use cases
 * 
 * // User validation
 * const isValidUser = where({
 *   age: (age: number) => age >= 18 && age <= 120,
 *   email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
 *   username: (name: string) => name.length >= 3 && name.length <= 20
 * })
 * 
 * isValidUser({
 *   age: 25,
 *   email: "alice@example.com",
 *   username: "alice"
 * })  // true
 * 
 * isValidUser({
 *   age: 150,
 *   email: "invalid",
 *   username: "ab"
 * })  // false
 * 
 * // Product filtering
 * const products = [
 *   { name: "Widget", price: 50, inStock: true },
 *   { name: "Gadget", price: 150, inStock: false },
 *   { name: "Doohickey", price: 75, inStock: true }
 * ]
 * 
 * const isAffordableAndAvailable = where({
 *   price: (p: number) => p <= 100,
 *   inStock: (s: boolean) => s === true
 * })
 * 
 * products.filter(isAffordableAndAvailable)
 * // [{ name: "Widget", price: 50, inStock: true }, { name: "Doohickey", price: 75, inStock: true }]
 * 
 * // Range validation
 * const inRange = where({
 *   x: (n: number) => n >= -100 && n <= 100,
 *   y: (n: number) => n >= -100 && n <= 100
 * })
 * 
 * inRange({ x: 50, y: 75 })    // true
 * inRange({ x: 150, y: 50 })   // false
 * inRange({ x: 50 })           // false (y is missing)
 * 
 * // Configuration validation
 * const isValidConfig = where({
 *   port: (p: number) => p > 0 && p <= 65535,
 *   host: (h: string) => h.length > 0,
 *   ssl: (s: boolean) => typeof s === "boolean"
 * })
 * 
 * isValidConfig({
 *   port: 3000,
 *   host: "localhost",
 *   ssl: true
 * })  // true
 * 
 * // Date validation
 * const isRecentActivity = where({
 *   lastLogin: (d: Date) => d > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
 *   sessionsCount: (n: number) => n > 0
 * })
 * 
 * isRecentActivity({
 *   lastLogin: new Date(),
 *   sessionsCount: 5
 * })  // true
 * 
 * // Complex business rules
 * const canPurchase = where({
 *   age: (a: number) => a >= 18,
 *   balance: (b: number) => b > 0,
 *   verified: (v: boolean) => v === true,
 *   restrictions: (r: Array<string>) => !r.includes("purchases")
 * })
 * 
 * canPurchase({
 *   age: 21,
 *   balance: 100,
 *   verified: true,
 *   restrictions: []
 * })  // true
 * 
 * // Form validation
 * const isValidForm = where({
 *   username: (u: string) => u.length >= 3,
 *   password: (p: string) => p.length >= 8,
 *   confirmPassword: (c: string) => c.length >= 8,
 *   terms: (t: boolean) => t === true
 * })
 * 
 * // Combining with other functions
 * const hasRequiredFields = where({
 *   id: (x: any) => x !== undefined,
 *   name: (x: any) => x !== undefined && x !== "",
 *   type: (x: any) => ["A", "B", "C"].includes(x)
 * })
 * 
 * const records = [
 *   { id: 1, name: "First", type: "A" },
 *   { id: 2, name: "", type: "B" },
 *   { id: 3, name: "Third", type: "D" }
 * ]
 * 
 * records.filter(hasRequiredFields)
 * // [{ id: 1, name: "First", type: "A" }]
 * 
 * // Partial application patterns
 * const minimumValue = (min: number) => (x: number) => x >= min
 * const maximumLength = (max: number) => (s: string) => s.length <= max
 * 
 * const validateLimits = where({
 *   score: minimumValue(60),
 *   name: maximumLength(50)
 * })
 * 
 * validateLimits({ score: 75, name: "John" })  // true
 * validateLimits({ score: 45, name: "John" })  // false
 * ```
 * @property All must pass - returns true only if all predicates pass
 * @property Missing fails - missing properties fail their predicates
 * @property Flexible predicates - each property can have custom validation
 */
const where = <S extends Record<string, (value: any) => boolean>>(
	spec: S,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		// Check if any predicates exist
		return Object.keys(spec).length === 0
	}
	
	// Check each predicate in the spec
	for (const key in spec) {
		if (Object.prototype.hasOwnProperty.call(spec, key)) {
			const predicate = spec[key]
			const value = obj[key]
			
			// Run predicate and check result
			try {
				if (!predicate(value)) {
					return false
				}
			} catch {
				// If predicate throws, consider it failed
				return false
			}
		}
	}
	
	// All predicates passed
	return true
}

export default where