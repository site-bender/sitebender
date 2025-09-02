import type { Value } from "../../../types/index.ts"

import assocPath from "../assocPath/index.ts"
import path from "../path/index.ts"

/**
 * Modifies a nested property value using a function
 *
 * Creates a new object with the value at the specified path transformed
 * by the provided function. Creates any missing intermediate objects along
 * the path. If the path doesn't exist, the function receives undefined.
 * The original object and all nested objects are not modified (immutable).
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 * @param pathArray - Array of keys representing the path to the property
 * @param fn - Function to transform the value at the path
 * @param obj - The object to modify
 * @returns A new object with the nested value transformed
 * @example
 * ```typescript
 * // Basic nested modification
 * modifyPath(["user", "age"])((age: number) => age + 1)({ user: { age: 30 } })
 * // { user: { age: 31 } }
 *
 * // Deep nesting
 * modifyPath(["a", "b", "c"])((n: number) => n * 2)({ a: { b: { c: 5 } } })
 * // { a: { b: { c: 10 } } }
 *
 * // Path doesn't exist - creates intermediate objects
 * modifyPath(["x", "y"])((v: any) => v || "default")({ a: 1 })
 * // { a: 1, x: { y: "default" } }
 *
 * // Array indices in path
 * modifyPath(["items", 0, "qty"])((q: number) => q + 1)({
 *   items: [{ qty: 2 }, { qty: 5 }]
 * })
 * // { items: [{ qty: 3 }, { qty: 5 }] }
 *
 * // Partial application
 * const incrementAge = modifyPath(["user", "age"])((a: number) => a + 1)
 * incrementAge({ user: { age: 25 } }) // { user: { age: 26 } }
 *
 * // Edge cases
 * modifyPath([])((o: any) => ({ ...o, x: 1 }))({ a: 2 }) // { a: 2, x: 1 }
 * modifyPath(["x"])((v: any) => v)(null) // { x: undefined }
 * ```
 */
const modifyPath = <V extends Value, R extends Value>(
	pathArray: Array<string | number | symbol>,
) =>
(
	fn: (value: V) => R,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path modifies the entire object
	if (pathArray.length === 0) {
		return fn(obj as any)
	}

	// Get current value at path (may be undefined)
	const currentValue = path(pathArray)(obj) as V

	// Apply transformation
	const newValue = fn(currentValue)

	// Set the new value at path
	return assocPath(pathArray)(newValue)(
		obj || {},
	)
}

export default modifyPath
