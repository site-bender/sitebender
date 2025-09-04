import type { Lens } from "../../object/lens/index.ts"

/**
 * Checks if value at lens focus is less than or equal to another
 *
 * Creates a predicate function that checks if the value at the lens focus
 * is less than or equal to a given value. Works with numbers, strings,
 * dates, and any comparable values. Useful for filtering, validation, and
 * range checks on nested properties.
 *
 * @curried
 * @param lens - Lens to focus on a property
 * @param value - Value to compare against
 * @param subject - Object to check
 * @returns True if focused value is <= the given value
 * @example
 * ```typescript
 * import lensProp from "../../simple/object/lensProp/index.ts"
 *
 * // Number comparison
 * const ageLens = lensProp("age")
 * const isChild = lensLte(ageLens)(12)
 * isChild({ name: "Alice", age: 10 }) // true
 * isChild({ name: "Bob", age: 15 }) // false
 * isChild({ name: "Charlie", age: 12 }) // true
 *
 * // Filter with lens
 * const priceLens = lensProp("price")
 * const isAffordable = lensLte(priceLens)(50)
 * const products = [
 *   { name: "Widget", price: 25 },
 *   { name: "Gadget", price: 75 },
 *   { name: "Tool", price: 50 }
 * ]
 * products.filter(isAffordable)
 * // [{ name: "Widget", price: 25 }, { name: "Tool", price: 50 }]
 *
 * // String comparison
 * const nameLens = lensProp("name")
 * const isBeforeN = lensLte(nameLens)("M")
 * isBeforeN({ name: "Alice" }) // true
 * isBeforeN({ name: "Nancy" }) // false
 * ```
 * @pure
 * @curried
 * @predicate
 */
const lensLte =
	<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S): boolean =>
		lens.get(subject) <= value

export default lensLte
