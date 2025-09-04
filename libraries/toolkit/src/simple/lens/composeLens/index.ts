import type { Lens } from "../../object/lens/index.ts"

/**
 * Composes multiple lenses into a single lens
 *
 * Creates a new lens by composing two or more lenses, allowing access to
 * deeply nested properties through a single lens. The composition works
 * left-to-right, where each lens focuses deeper into the structure.
 * This enables modular and reusable access patterns for complex data.
 *
 * @param first - The first lens to apply
 * @param second - The second lens to apply to the result of the first
 * @returns A new lens that composes the two lenses
 * @example
 * ```typescript
 * import lensProp from "../../simple/object/lensProp/index.ts"
 *
 * // Basic lens composition
 * const addressLens = lensProp("address")
 * const cityLens = lensProp("city")
 * const addressCityLens = composeLens(addressLens, cityLens)
 *
 * const user = {
 *   name: "Alice",
 *   address: { city: "New York", zip: "10001" }
 * }
 * addressCityLens.get(user) // "New York"
 * addressCityLens.set("Boston")(user)
 * // { name: "Alice", address: { city: "Boston", zip: "10001" } }
 *
 * // Deep composition
 * const companyLens = lensProp("company")
 * const locationLens = lensProp("location")
 * const countryLens = lensProp("country")
 * const deepLens = composeLens(
 *   composeLens(companyLens, locationLens),
 *   countryLens
 * )
 * ```
 * @pure
 * @immutable
 */
const composeLens = <S, A, B>(
	first: Lens<S, A>,
	second: Lens<A, B>,
): Lens<S, B> => ({
	get: (s: S) => second.get(first.get(s)),
	set: (b: B) => (s: S) => first.set(second.set(b)(first.get(s)))(s),
})

export default composeLens
