import type { Value } from "../../../types/index.ts"

/**
 * Checks if a property equals a specific value
 *
 * Returns true if the specified property of an object equals the given
 * value (using strict equality ===). Returns false if the property doesn't
 * exist or doesn't equal the value. Useful for filtering and validation.
 *
 * @curried (key) => (value) => (obj) => boolean
 * @param key - The property key to check
 * @param value - The value to compare against
 * @param obj - The object to test
 * @returns True if obj[key] === value, false otherwise
 * @example
 * ```typescript
 * // Basic equality checks
 * propEq("name")("Alice")({ name: "Alice", age: 30 })     // true
 * propEq("name")("Bob")({ name: "Alice", age: 30 })       // false
 * propEq("age")(30)({ name: "Alice", age: 30 })           // true
 * propEq("age")(25)({ name: "Alice", age: 30 })           // false
 *
 * // Number comparisons
 * propEq("count")(0)({ count: 0 })                        // true
 * propEq("value")(100)({ value: 100.0 })                  // true
 * propEq("score")(-1)({ score: -1 })                      // true
 *
 * // Boolean checks
 * propEq("active")(true)({ active: true, id: 1 })         // true
 * propEq("active")(false)({ active: true, id: 1 })        // false
 * propEq("enabled")(false)({ enabled: false })            // true
 *
 * // String comparisons (case-sensitive)
 * propEq("status")("ACTIVE")({ status: "ACTIVE" })        // true
 * propEq("status")("active")({ status: "ACTIVE" })        // false
 *
 * // Null and undefined
 * propEq("value")(null)({ value: null })                  // true
 * propEq("value")(undefined)({ value: undefined })        // true
 * propEq("value")(null)({ value: undefined })             // false (strict equality)
 *
 * // Missing properties
 * propEq("missing")("any")({ present: "value" })          // false
 * propEq("missing")(undefined)({ present: "value" })      // true (missing === undefined)
 * propEq("missing")(undefined)({})                        // true
 *
 * // Arrays and objects (reference equality)
 * const arr = [1, 2, 3]
 * propEq("items")(arr)({ items: arr })                    // true (same reference)
 * propEq("items")([1, 2, 3])({ items: [1, 2, 3] })       // false (different arrays)
 *
 * // Symbol keys
 * const sym = Symbol("id")
 * propEq(sym)(123)({ [sym]: 123 })                        // true
 * propEq(sym)(456)({ [sym]: 123 })                        // false
 *
 * // Practical use cases
 *
 * // Filtering arrays
 * const users = [
 *   { id: 1, name: "Alice", role: "admin" },
 *   { id: 2, name: "Bob", role: "user" },
 *   { id: 3, name: "Carol", role: "admin" }
 * ]
 *
 * const isAdmin = propEq("role")("admin")
 * users.filter(isAdmin)
 * // [{ id: 1, name: "Alice", role: "admin" }, { id: 3, name: "Carol", role: "admin" }]
 *
 * const isUser = propEq("role")("user")
 * users.filter(isUser)
 * // [{ id: 2, name: "Bob", role: "user" }]
 *
 * // Finding specific items
 * const products = [
 *   { id: 1, name: "Widget", inStock: true },
 *   { id: 2, name: "Gadget", inStock: false },
 *   { id: 3, name: "Doohickey", inStock: true }
 * ]
 *
 * const inStock = propEq("inStock")(true)
 * const outOfStock = propEq("inStock")(false)
 *
 * products.filter(inStock)     // Items in stock
 * products.filter(outOfStock)   // Items out of stock
 *
 * // Status checking
 * const isActive = propEq("status")("active")
 * const isPending = propEq("status")("pending")
 * const isCompleted = propEq("status")("completed")
 *
 * const tasks = [
 *   { id: 1, status: "active" },
 *   { id: 2, status: "completed" },
 *   { id: 3, status: "active" }
 * ]
 *
 * tasks.filter(isActive)       // Active tasks
 * tasks.some(isPending)         // false (no pending tasks)
 * tasks.every(isCompleted)      // false (not all completed)
 *
 * // Finding by ID
 * const findById = (id: number) => propEq("id")(id)
 *
 * const items = [
 *   { id: 1, name: "Item 1" },
 *   { id: 2, name: "Item 2" },
 *   { id: 3, name: "Item 3" }
 * ]
 *
 * items.find(findById(2))       // { id: 2, name: "Item 2" }
 * items.findIndex(findById(3))  // 2 (index of item with id: 3)
 *
 * // Validation
 * const isVersion2 = propEq("version")(2)
 * const isTypeJSON = propEq("type")("application/json")
 *
 * const configs = [
 *   { version: 1, type: "application/json" },
 *   { version: 2, type: "text/plain" },
 *   { version: 2, type: "application/json" }
 * ]
 *
 * configs.filter((cfg) => isVersion2(cfg) && isTypeJSON(cfg))
 * // [{ version: 2, type: "application/json" }]
 *
 * // Partial application patterns
 * const hasId = (id: number) => propEq("id")(id)
 * const hasName = (name: string) => propEq("name")(name)
 * const hasType = (type: string) => propEq("type")(type)
 *
 * const record = { id: 1, name: "Test", type: "A" }
 * hasId(1)(record)              // true
 * hasName("Test")(record)       // true
 * hasType("B")(record)          // false
 *
 * // State machine transitions
 * const canTransition = (fromState: string) => (toState: string) => (obj: any) =>
 *   propEq("state")(fromState)(obj)
 *
 * const machine = { state: "idle" }
 * const fromIdle = canTransition("idle")
 *
 * fromIdle("running")(machine)  // true (can transition from idle)
 *
 * // Permission checking
 * const hasPermission = (perm: string) => propEq(perm)(true)
 *
 * const user = {
 *   canRead: true,
 *   canWrite: false,
 *   canDelete: false
 * }
 *
 * hasPermission("canRead")(user)   // true
 * hasPermission("canWrite")(user)  // false
 * hasPermission("canDelete")(user) // false
 *
 * // Feature flags
 * const isFeatureEnabled = (feature: string) =>
 *   propEq(feature)(true)
 *
 * const features = {
 *   darkMode: true,
 *   betaFeatures: false,
 *   analytics: true
 * }
 *
 * isFeatureEnabled("darkMode")(features)      // true
 * isFeatureEnabled("betaFeatures")(features)  // false
 * ```
 * @property Strict equality - uses === for comparison
 * @property Safe access - handles missing properties and null/undefined
 * @property Composable - ideal for filter, find, and conditional operations
 */
const propEq = <K extends string | symbol, V extends Value>(
	key: K,
) =>
(
	value: V,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined objects
	if (obj == null) {
		return undefined === value
	}

	// Strict equality check
	return obj[key] === value
}

export default propEq
