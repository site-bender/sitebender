import type { Lens } from "../../simple/object/lens/index.ts"

/**
 * Checks equality at lens focus
 *
 * Creates a predicate function that checks if the value at the lens focus
 * equals a given value. Useful for filtering, validation, and conditional
 * logic based on nested property values without manually accessing them.
 *
 * @curried
 * @param lens - Lens to focus on a property
 * @param value - Value to compare against
 * @param subject - Object to check
 * @returns True if focused value equals the given value
 * @example
 * ```typescript
 * import lensProp from "../../simple/object/lensProp/index.ts"
 *
 * // Basic equality check
 * const nameLens = lensProp("name")
 * const isAlice = lensEq(nameLens)("Alice")
 * isAlice({ name: "Alice", age: 30 }) // true
 * isAlice({ name: "Bob", age: 25 }) // false
 *
 * // Filter with lens
 * const ageLens = lensProp("age")
 * const is30 = lensEq(ageLens)(30)
 * const users = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 }
 * ]
 * users.filter(is30) // [{ name: "Alice", age: 30 }]
 *
 * // Partial application
 * const typeLens = lensProp("type")
 * const checkType = lensEq(typeLens)
 * const isError = checkType("error")
 * const isWarning = checkType("warning")
 * ```
 * @pure
 * @curried
 * @predicate
 */
const lensEq =
	<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S): boolean =>
		lens.get(subject) === value

export default lensEq
