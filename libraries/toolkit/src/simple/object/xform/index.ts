import type { Value } from "../../../types/index.ts"

/**
 * Transforms an object structure recursively
 *
 * Recursively transforms an object and all its nested objects using a
 * transformation function. The transformer receives each object (including
 * nested ones) and can modify its structure. Arrays are traversed but not
 * transformed unless they contain objects.
 *
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
 * removePrivate({ name: "Item", _internal: "hidden", data: { _private: "x", public: "y" } })
 * // { name: "Item", data: { public: "y" } }
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
 * // { product: { name: "Widget", _meta: { version: 1 } }, _meta: { version: 1 } }
 *
 * @pure
 * @curried
 * @immutable
 */
const xform = <T extends Record<string | symbol, Value>>(
	transformer: (obj: any) => any,
) =>
(
	obj: T,
): any => {
	const transformRecursive = (current: any): any => {
		// Handle primitives
		if (
			current === null || current === undefined || typeof current !== "object"
		) {
			return current
		}

		// Handle arrays - traverse but don't transform the array itself
		if (Array.isArray(current)) {
			return current.map(transformRecursive)
		}

		// Transform the current object first
		const transformed = transformer(current)

		// Recursively transform nested values
		return Object.entries(transformed).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: transformRecursive(value),
			}),
			{},
		)
	}

	return transformRecursive(obj)
}

export default xform
