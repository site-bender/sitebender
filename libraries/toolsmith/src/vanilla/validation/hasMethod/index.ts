import hasProperty from "../hasProperty/index.ts"
import isFunction from "../isFunction/index.ts"
import isNotNull from "../isNotNull/index.ts"
import isObject from "../isObject/index.ts"

/**
 * Type guard to check if an object has a method property
 *
 * Safely checks if a value is an object that contains a specific
 * method (function property). Returns a type predicate that narrows
 * the type to ensure the method exists and is callable.
 * Curried with data last for functional composition.
 *
 * @curried (name) => (obj) => boolean
 * @param name - The method name to look for
 * @param obj - The value to check
 * @returns Type predicate indicating if the method exists
 * @pure
 * @safe
 * @example
 * ```typescript
 * hasMethod("toString")({ toString: () => "test" })  // true
 * hasMethod("toString")({ year: 2023 })              // false
 * hasMethod("parse")(null)                           // false
 *
 * // Functional composition
 * const hasToString = hasMethod("toString")
 * const objects = [obj1, obj2, obj3].filter(hasToString)
 * ```
 */
export default function hasMethod<T extends string>(
	name: T,
): (
	obj: unknown,
) => obj is
	& Record<string, unknown>
	& { [K in T]: (...args: Array<unknown>) => unknown } {
	return (
		obj: unknown,
	): obj is
		& Record<string, unknown>
		& { [K in T]: (...args: Array<unknown>) => unknown } =>
		isObject(obj) && isNotNull(obj) && hasProperty(name)(obj) &&
		isFunction((obj as Record<string, unknown>)[name])
}
