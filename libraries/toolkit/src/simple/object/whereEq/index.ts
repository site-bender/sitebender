import type { Value } from "../../../types/index.ts"

/**
 * Checks if an object satisfies a specification using strict equality
 *
 * Like where, but instead of predicates, uses direct values for comparison
 * with strict equality (===). Returns true only if all specified properties
 * in the test object strictly equal the corresponding values in the spec.
 * Missing properties are considered not equal.
 *
 * @curried (spec) => (obj) => boolean
 * @param spec - Object mapping keys to expected values
 * @param obj - The object to test
 * @returns True if all properties match their expected values, false otherwise
 * @example
 * ```typescript
 * // Basic equality checking
 * whereEq({
 *   age: 25,
 *   name: "Alice"
 * })({
 *   age: 25,
 *   name: "Alice",
 *   city: "NYC"
 * })  // true (extra properties ignored)
 *
 * whereEq({
 *   age: 25,
 *   name: "Alice"
 * })({
 *   age: 26,
 *   name: "Alice"
 * })  // false (age doesn't match)
 *
 * // Partial matching
 * whereEq({
 *   status: "active"
 * })({
 *   id: 1,
 *   status: "active",
 *   created: "2024-01-01"
 * })  // true (only checks status)
 *
 * // Missing properties fail
 * whereEq({
 *   required: "value"
 * })({
 *   other: "data"
 * })  // false (required is missing)
 *
 * // Strict equality (no type coercion)
 * whereEq({
 *   count: 0
 * })({
 *   count: "0"
 * })  // false (different types)
 *
 * whereEq({
 *   value: null
 * })({
 *   value: undefined
 * })  // false (null !== undefined)
 *
 * // Boolean matching
 * whereEq({
 *   active: true,
 *   verified: false
 * })({
 *   active: true,
 *   verified: false,
 *   admin: false
 * })  // true
 *
 * // Array and object values (reference equality)
 * const arr = [1, 2, 3]
 * whereEq({
 *   items: arr
 * })({
 *   items: arr
 * })  // true (same reference)
 *
 * whereEq({
 *   items: [1, 2, 3]
 * })({
 *   items: [1, 2, 3]
 * })  // false (different arrays)
 *
 * // Empty spec always passes
 * whereEq({})({ anything: "here" })  // true
 *
 * // Practical use cases
 *
 * // Filtering by exact values
 * const users = [
 *   { id: 1, role: "admin", active: true },
 *   { id: 2, role: "user", active: true },
 *   { id: 3, role: "admin", active: false },
 *   { id: 4, role: "user", active: true }
 * ]
 *
 * const isActiveAdmin = whereEq({
 *   role: "admin",
 *   active: true
 * })
 *
 * users.filter(isActiveAdmin)
 * // [{ id: 1, role: "admin", active: true }]
 *
 * const isInactiveUser = whereEq({
 *   role: "user",
 *   active: false
 * })
 *
 * users.filter(isInactiveUser)
 * // [] (no inactive users)
 *
 * // Status checking
 * const orders = [
 *   { id: 1, status: "pending", priority: "high" },
 *   { id: 2, status: "shipped", priority: "normal" },
 *   { id: 3, status: "pending", priority: "normal" },
 *   { id: 4, status: "delivered", priority: "high" }
 * ]
 *
 * const isPendingHigh = whereEq({
 *   status: "pending",
 *   priority: "high"
 * })
 *
 * orders.filter(isPendingHigh)
 * // [{ id: 1, status: "pending", priority: "high" }]
 *
 * // Configuration matching
 * const configs = [
 *   { env: "production", debug: false, port: 3000 },
 *   { env: "development", debug: true, port: 3000 },
 *   { env: "production", debug: false, port: 8080 }
 * ]
 *
 * const isProdStandard = whereEq({
 *   env: "production",
 *   port: 3000
 * })
 *
 * configs.find(isProdStandard)
 * // { env: "production", debug: false, port: 3000 }
 *
 * // Finding specific records
 * const findByIdAndType = (id: number, type: string) =>
 *   whereEq({ id, type })
 *
 * const records = [
 *   { id: 1, type: "A", value: 100 },
 *   { id: 2, type: "B", value: 200 },
 *   { id: 1, type: "B", value: 150 }
 * ]
 *
 * records.find(findByIdAndType(1, "B"))
 * // { id: 1, type: "B", value: 150 }
 *
 * // State matching
 * const isInitialState = whereEq({
 *   loading: false,
 *   error: null,
 *   data: null
 * })
 *
 * isInitialState({
 *   loading: false,
 *   error: null,
 *   data: null,
 *   timestamp: Date.now()
 * })  // true
 *
 * // Permission checking
 * const hasFullAccess = whereEq({
 *   canRead: true,
 *   canWrite: true,
 *   canDelete: true
 * })
 *
 * const permissions = [
 *   { user: "alice", canRead: true, canWrite: true, canDelete: true },
 *   { user: "bob", canRead: true, canWrite: false, canDelete: false },
 *   { user: "carol", canRead: true, canWrite: true, canDelete: false }
 * ]
 *
 * permissions.filter(hasFullAccess)
 * // [{ user: "alice", ... }]
 *
 * // Feature flag checking
 * const hasFeatures = whereEq({
 *   darkMode: true,
 *   betaFeatures: false,
 *   analytics: true
 * })
 *
 * hasFeatures({
 *   darkMode: true,
 *   betaFeatures: false,
 *   analytics: true,
 *   version: "2.0"
 * })  // true
 *
 * // Partial application patterns
 * const matchesType = (type: string) => whereEq({ type })
 * const matchesStatus = (status: string) => whereEq({ status })
 *
 * const isTypeA = matchesType("A")
 * const isPending = matchesStatus("pending")
 *
 * isTypeA({ type: "A", value: 1 })       // true
 * isPending({ status: "pending", id: 1 }) // true
 *
 * // Combining conditions
 * const matchesAll = (...specs: Array<Record<string, any>>) => (obj: any) =>
 *   specs.every(spec => whereEq(spec)(obj))
 *
 * const isActiveAdminInUS = matchesAll(
 *   { role: "admin" },
 *   { active: true },
 *   { country: "US" }
 * )
 *
 * isActiveAdminInUS({
 *   role: "admin",
 *   active: true,
 *   country: "US",
 *   name: "Alice"
 * })  // true
 *
 * // Testing for specific combinations
 * const scenarios = [
 *   { input: "A", output: "X" },
 *   { input: "B", output: "Y" },
 *   { input: "A", output: "Y" }
 * ]
 *
 * const isScenarioAX = whereEq({ input: "A", output: "X" })
 * scenarios.filter(isScenarioAX)
 * // [{ input: "A", output: "X" }]
 * ```
 * @property Strict equality - uses === for all comparisons
 * @property Partial matching - only checks properties in spec
 * @property Simple API - direct values instead of predicate functions
 */
const whereEq = <S extends Record<string, Value>>(
	spec: S,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		// Check if spec is empty
		return Object.keys(spec).length === 0
	}

	// Check each property in the spec
	for (const key in spec) {
		if (Object.prototype.hasOwnProperty.call(spec, key)) {
			// Strict equality check
			if (obj[key] !== spec[key]) {
				return false
			}
		}
	}

	// All properties match
	return true
}

export default whereEq
