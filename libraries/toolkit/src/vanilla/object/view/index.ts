import type { Lens } from "../lens/index.ts"

/**
 * Extracts a value using a lens
 *
 * Uses a lens to extract and return the focused value from a data structure.
 * This is the primary way to read values through lenses. Equivalent to calling
 * lens.get(obj) but provided as a standalone function for composition.
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 * @param lens - The lens to look through
 * @param obj - The object to extract from
 * @returns The value at the lens focus
 * @example
 * // Basic usage with lensProp
 * const nameLens = lensProp("name")
 * view(nameLens)({ name: "Alice", age: 30 })      // "Alice"
 *
 * // Nested path access
 * const cityLens = lensPath(["address", "city"])
 * const user = { address: { city: "NYC" } }
 * view(cityLens)(user)                            // "NYC"
 *
 * // Array index access
 * const firstLens = lensIndex(0)
 * view(firstLens)([10, 20, 30])                   // 10
 *
 * // Custom lens
 * const priceLens = lens(
 *   (item) => item.price,
 *   (price) => (item) => ({ ...item, price })
 * )
 * view(priceLens)({ name: "Widget", price: 99 })  // 99
 *
 * // Missing values return undefined
 * const missingLens = lensPath(["does", "not", "exist"])
 * view(missingLens)({})                           // undefined
 *
 * // Composition with map
 * const scoreLens = lensProp("score")
 * const scores = [{ score: 100 }, { score: 85 }]
 * scores.map(view(scoreLens))                     // [100, 85]
 */
const view = <S, A>(
	lens: Lens<S, A>,
) =>
(
	obj: S,
): A => {
	return lens.get(obj)
}

export default view
