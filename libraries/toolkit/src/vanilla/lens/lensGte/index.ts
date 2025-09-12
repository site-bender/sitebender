import type { Lens } from "../../object/lens/index.ts"

/**
 * Checks if value at lens focus is greater than or equal to another
 *
 * Creates a predicate function that checks if the value at the lens focus
 * is greater than or equal to a given value. Works with numbers, strings,
 * dates, and any comparable values. Useful for filtering, validation, and
 * range checks on nested properties.
 *
 * @curried
 * @param lens - Lens to focus on a property
 * @param value - Value to compare against
 * @param subject - Object to check
 * @returns True if focused value is >= the given value
 * @example
 * ```typescript
 * import lensProp from "../../vanilla/object/lensProp/index.ts"
 *
 * // Number comparison
 * const ageLens = lensProp("age")
 * const isAdult = lensGte(ageLens)(18)
 * isAdult({ name: "Alice", age: 25 }) // true
 * isAdult({ name: "Bob", age: 17 }) // false
 * isAdult({ name: "Charlie", age: 18 }) // true
 *
 * // Filter with lens
 * const scoreLens = lensProp("score")
 * const isPassing = lensGte(scoreLens)(60)
 * const students = [
 *   { name: "Alice", score: 85 },
 *   { name: "Bob", score: 55 },
 *   { name: "Charlie", score: 60 }
 * ]
 * students.filter(isPassing)
 * // [{ name: "Alice", score: 85 }, { name: "Charlie", score: 60 }]
 *
 * // String comparison
 * const nameLens = lensProp("name")
 * const isAfterM = lensGte(nameLens)("M")
 * isAfterM({ name: "Nancy" }) // true
 * isAfterM({ name: "Alice" }) // false
 * ```
 * @pure
 * @curried
 * @predicate
 */
const lensGte =
	<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S): boolean =>
		lens.get(subject) >= value

export default lensGte
