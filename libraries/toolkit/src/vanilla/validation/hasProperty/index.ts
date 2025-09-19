import isObject from "../isObject/index.ts"
import isNotNull from "../isNotNull/index.ts"

/**
 * Type guard to check if an object has a specific property
 *
 * Safely checks if a value is an object that contains a specific
 * property. Returns a type predicate that narrows the type to ensure
 * the property exists. More precise than the `in` operator alone.
 * Curried with data last for functional composition.
 *
 * @curried (name) => (obj) => boolean
 * @param name - The property name to look for
 * @param obj - The value to check
 * @returns Type predicate indicating if the property exists
 * @pure
 * @safe
 * @example
 * ```typescript
 * hasProperty("year")({ year: 2023, month: 12 })  // true
 * hasProperty("day")({ year: 2023, month: 12 })   // false
 * hasProperty("toString")(null)                    // false
 *
 * // Functional composition
 * const hasYear = hasProperty("year")
 * const objects = [obj1, obj2, obj3].filter(hasYear)
 * ```
 */
export default function hasProperty<T extends string>(
	name: T,
): (obj: unknown) => obj is Record<string, unknown> & { [K in T]: unknown } {
	return (obj: unknown): obj is Record<string, unknown> & { [K in T]: unknown } =>
		isObject(obj) && isNotNull(obj) && name in obj
}
