/**
 * Performs strict equality comparison using the === operator
 * 
 * Checks if two values are strictly equal without any type coercion. This is
 * a curried function for creating reusable identity checks. Unlike equals which
 * performs deep structural comparison, identical only returns true if the values
 * are the same primitive value or the same object reference.
 * 
 * Comparison rules:
 * - Primitives: must be same type and value
 * - Objects/Arrays: must be same reference (not structural equality)
 * - NaN: NaN === NaN returns false (use Number.isNaN or equals for NaN)
 * - +0 and -0: considered identical (both === 0)
 * - No type coercion (unlike == operator)
 * 
 * @curried (a) => (b) => boolean
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if values are strictly equal (===), false otherwise
 * @example
 * ```typescript
 * // Primitive comparisons
 * identical(5)(5)              // true
 * identical("hello")("hello")  // true
 * identical(true)(true)        // true
 * identical(null)(null)        // true
 * identical(undefined)(undefined) // true
 * 
 * // Type matters - no coercion
 * identical(5)("5")            // false (different types)
 * identical(0)(false)          // false (different types)
 * identical(1)(true)           // false (different types)
 * identical(null)(undefined)   // false (different values)
 * 
 * // NaN behavior (differs from equals)
 * identical(NaN)(NaN)          // false (NaN !== NaN)
 * identical(0/0)(0/0)          // false
 * const nan = NaN
 * identical(nan)(nan)          // false (still false)
 * 
 * // +0 and -0 are considered identical
 * identical(0)(-0)             // true (both === 0)
 * identical(+0)(-0)            // true
 * 
 * // Object reference equality (not structural)
 * const obj1 = { a: 1 }
 * const obj2 = { a: 1 }
 * const obj3 = obj1
 * 
 * identical(obj1)(obj2)        // false (different objects)
 * identical(obj1)(obj3)        // true (same reference)
 * identical(obj1)(obj1)        // true (same reference)
 * 
 * // Array reference equality
 * const arr1 = [1, 2, 3]
 * const arr2 = [1, 2, 3]
 * const arr3 = arr1
 * 
 * identical(arr1)(arr2)        // false (different arrays)
 * identical(arr1)(arr3)        // true (same reference)
 * 
 * // Function reference equality
 * const fn1 = () => 42
 * const fn2 = () => 42
 * const fn3 = fn1
 * 
 * identical(fn1)(fn2)          // false (different functions)
 * identical(fn1)(fn3)          // true (same reference)
 * 
 * // Partial application for constants
 * const isNull = identical(null)
 * isNull(null)                // true
 * isNull(undefined)            // false
 * isNull(0)                    // false
 * 
 * const isTrue = identical(true)
 * isTrue(true)                // true
 * isTrue(1)                    // false (no coercion)
 * isTrue("true")               // false
 * 
 * const isEmptyString = identical("")
 * isEmptyString("")            // true
 * isEmptyString(" ")           // false
 * isEmptyString(null)          // false
 * 
 * // Filtering exact matches
 * const values = [1, "1", 2, "2", 3, "3"]
 * const onlyNumbers = values.filter(identical(2))
 * // [2] (not "2")
 * 
 * const mixed = [true, 1, "true", "1", false, 0, "", null]
 * const onlyTrue = mixed.filter(identical(true))
 * // [true] (not 1 or "true")
 * 
 * // State comparison in React/Redux
 * const state1 = { count: 0, items: [] }
 * const state2 = { count: 0, items: [] }
 * const state3 = state1
 * 
 * const hasStateChanged = !identical(state1)
 * hasStateChanged(state2)     // true (new object)
 * hasStateChanged(state3)     // false (same reference)
 * 
 * // Singleton pattern checking
 * class Singleton {
 *   private static instance: Singleton
 *   static getInstance() {
 *     if (!this.instance) {
 *       this.instance = new Singleton()
 *     }
 *     return this.instance
 *   }
 * }
 * 
 * const instance1 = Singleton.getInstance()
 * const instance2 = Singleton.getInstance()
 * identical(instance1)(instance2)  // true (same instance)
 * 
 * // Enum value checking
 * enum Status {
 *   PENDING = "PENDING",
 *   ACTIVE = "ACTIVE",
 *   COMPLETE = "COMPLETE"
 * }
 * 
 * const isPending = identical(Status.PENDING)
 * isPending(Status.PENDING)    // true
 * isPending("PENDING")         // true (same string value)
 * isPending(Status.ACTIVE)     // false
 * 
 * // Symbol comparisons
 * const sym1 = Symbol("test")
 * const sym2 = Symbol("test")
 * const sym3 = sym1
 * 
 * identical(sym1)(sym2)        // false (different symbols)
 * identical(sym1)(sym3)        // true (same symbol)
 * 
 * const globalSym1 = Symbol.for("global")
 * const globalSym2 = Symbol.for("global")
 * identical(globalSym1)(globalSym2)  // true (same global symbol)
 * 
 * // Caching/memoization keys
 * const cache = new Map()
 * const getCached = <T>(key: T, compute: () => T) => {
 *   const existing = Array.from(cache.keys()).find(identical(key))
 *   if (existing !== undefined) {
 *     return cache.get(existing)
 *   }
 *   const value = compute()
 *   cache.set(key, value)
 *   return value
 * }
 * 
 * // Event handler comparison
 * const button = document.querySelector("button")
 * const handler1 = () => console.log("clicked")
 * const handler2 = () => console.log("clicked")
 * 
 * button?.addEventListener("click", handler1)
 * // Later, checking if specific handler is attached
 * const isHandler1 = identical(handler1)
 * isHandler1(handler1)         // true
 * isHandler1(handler2)         // false (different function)
 * 
 * // Switch case alternative
 * const executeAction = (action: string) => {
 *   if (identical("SAVE")(action)) return save()
 *   if (identical("DELETE")(action)) return delete()
 *   if (identical("UPDATE")(action)) return update()
 *   return null
 * }
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Strict - No type coercion, requires exact type and value match
 * @property Curried - Can be partially applied for reusable identity checks
 * @property Fast - O(1) comparison, no deep traversal
 */
const identical = <T>(a: T) => <U>(b: U): boolean => 
	a === b

export default identical