import type { Value } from "../../../types/index.ts"

/**
 * Transforms an object structure recursively
 *
 * Recursively transforms an object and all its nested objects using a
 * transformation function. The transformer receives each object (including
 * nested ones) and can modify its structure. Handles circular references
 * by tracking visited objects. Arrays are traversed but not transformed
 * unless they contain objects.
 *
 * @pure
 * @immutable
 * @curried
 * @param transformer - Function to transform each object in the structure
 * @param obj - The object to transform recursively
 * @returns A new object with the transformation applied recursively
 * @example
 * // Basic recursive transformation
 * xform((obj: any) => ({ ...obj, transformed: true }))({
 *   a: 1,
 *   b: { c: 2 }
 * })
 * // { a: 1, b: { c: 2, transformed: true }, transformed: true }
 *
 * // Convert keys to uppercase recursively
 * const toUpper = xform((obj: any) =>
 *   Object.entries(obj).reduce(
 *     (acc, [k, v]) => ({ ...acc, [k.toUpperCase()]: v }),
 *     {}
 *   )
 * )
 * toUpper({ name: "Bob", address: { city: "NYC" } })
 * // { NAME: "Bob", ADDRESS: { CITY: "NYC" } }
 *
 * // Filter properties recursively
 * const removePrivate = xform((obj: any) =>
 *   Object.entries(obj).reduce(
 *     (acc, [k, v]) => k.startsWith("_") ? acc : { ...acc, [k]: v },
 *     {}
 *   )
 * )
 * removePrivate({ name: "Item", _internal: "hidden" })
 * // { name: "Item" }
 *
 * // Arrays with objects
 * xform((obj: any) => ({ ...obj, processed: true }))({
 *   items: [{ id: 1 }, { id: 2 }]
 * })
 * // { items: [{ id: 1, processed: true }, { id: 2, processed: true }], processed: true }
 *
 * // Add metadata to all nested objects
 * const addMeta = xform((obj: any) => ({
 *   ...obj,
 *   _meta: { version: 1 }
 * }))
 * addMeta({ product: { name: "Widget" } })
 * // All objects get _meta property
 *
 * // Clean nulls recursively
 * const cleanData = xform((obj: any) =>
 *   Object.entries(obj).reduce(
 *     (acc, [k, v]) => v == null || v === "" ? acc : { ...acc, [k]: v },
 *     {}
 *   )
 * )
 * cleanData({ name: "Item", value: null, data: { id: 1, empty: "" } })
 * // { name: "Item", data: { id: 1 } }
 */
const xform = <T extends Record<string | symbol, Value>>(
	transformer: (obj: any) => any,
) =>
(
	obj: T,
): any => {
	// Handle primitives and null/undefined
	if (obj === null || obj === undefined || typeof obj !== "object") {
		return obj
	}

	// Track visited objects for circular reference handling
	const visited = new WeakMap()

	const transformRecursive = (current: any): any => {
		// Handle primitives
		if (
			current === null || current === undefined || typeof current !== "object"
		) {
			return current
		}

		// Check for circular reference
		if (visited.has(current)) {
			return visited.get(current)
		}

		// Handle arrays - traverse but don't transform the array itself
		if (Array.isArray(current)) {
			const result = current.map((item) => transformRecursive(item))
			visited.set(current, result)
			return result
		}

		// Transform the object
		const transformed = transformer(current)
		visited.set(current, transformed)

		// Recursively transform nested objects
		const entries = Object.entries(transformed).map(([key, value]) => [
			key,
			transformRecursive(value),
		])

		// Handle symbol keys
		const symbolEntries = Object.getOwnPropertySymbols(transformed).map(
			(sym) => [sym, transformRecursive(transformed[sym])],
		)

		return Object.fromEntries([...entries, ...symbolEntries])
	}

	return transformRecursive(obj)
}

export default xform
