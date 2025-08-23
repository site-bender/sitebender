import type { Lens } from "../../simple/object/lens/index.ts"

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
 * import { lens } from "../../simple/object/lens/index.ts"
 * import { lensProp } from "../../simple/object/lensProp/index.ts"
 * 
 * // Basic lens composition
 * const addressLens = lensProp("address")
 * const cityLens = lensProp("city")
 * const addressCityLens = composeLens(addressLens, cityLens)
 * 
 * const user = {
 *   name: "Alice",
 *   address: {
 *     city: "New York",
 *     zip: "10001"
 *   }
 * }
 * 
 * addressCityLens.get(user)                    // "New York"
 * addressCityLens.set("Boston")(user)
 * // { name: "Alice", address: { city: "Boston", zip: "10001" } }
 * 
 * // Three-level composition
 * const companyLens = lensProp("company")
 * const locationLens = lensProp("location")
 * const countryLens = lensProp("country")
 * 
 * const companyCountryLens = composeLens(
 *   composeLens(companyLens, locationLens),
 *   countryLens
 * )
 * 
 * const employee = {
 *   name: "Bob",
 *   company: {
 *     name: "TechCorp",
 *     location: {
 *       country: "USA",
 *       state: "CA"
 *     }
 *   }
 * }
 * 
 * companyCountryLens.get(employee)             // "USA"
 * companyCountryLens.set("Canada")(employee)
 * // Updates country while preserving all other data
 * 
 * // Array and object composition
 * import { lensIndex } from "../../simple/object/lensIndex/index.ts"
 * 
 * const itemsLens = lensProp("items")
 * const firstItemLens = lensIndex(0)
 * const priceLens = lensProp("price")
 * 
 * const firstItemPriceLens = composeLens(
 *   composeLens(itemsLens, firstItemLens),
 *   priceLens
 * )
 * 
 * const order = {
 *   id: "123",
 *   items: [
 *     { name: "Widget", price: 10.99 },
 *     { name: "Gadget", price: 5.99 }
 *   ]
 * }
 * 
 * firstItemPriceLens.get(order)                // 10.99
 * firstItemPriceLens.set(12.99)(order)
 * // Updates first item's price to 12.99
 * 
 * // Composing custom lenses
 * const nullableLens = <T>(defaultValue: T) => lens<T | null, T>(
 *   (value) => value ?? defaultValue,
 *   (newValue) => () => newValue
 * )
 * 
 * const settingsLens = lensProp("settings")
 * const themeLens = lensProp("theme")
 * const safeThemeLens = composeLens(
 *   composeLens(settingsLens, nullableLens({})),
 *   composeLens(themeLens, nullableLens("light"))
 * )
 * 
 * const config1 = { settings: { theme: "dark" } }
 * const config2 = { settings: null }
 * const config3 = {}
 * 
 * safeThemeLens.get(config1)                   // "dark"
 * safeThemeLens.get(config2)                   // "light" (default)
 * 
 * // Reusable lens combinations
 * const userProfileLens = composeLens(
 *   lensProp("user"),
 *   lensProp("profile")
 * )
 * 
 * const userEmailLens = composeLens(
 *   userProfileLens,
 *   lensProp("email")
 * )
 * 
 * const userPhoneLens = composeLens(
 *   userProfileLens,
 *   lensProp("phone")
 * )
 * 
 * const app = {
 *   user: {
 *     profile: {
 *       email: "user@example.com",
 *       phone: "555-1234"
 *     }
 *   }
 * }
 * 
 * userEmailLens.get(app)                       // "user@example.com"
 * userPhoneLens.get(app)                       // "555-1234"
 * 
 * // Type-safe composition
 * type Person = {
 *   name: string
 *   contact: {
 *     email: string
 *     address: {
 *       street: string
 *       city: string
 *     }
 *   }
 * }
 * 
 * const contactLens: Lens<Person, Person["contact"]> = 
 *   lensProp("contact")
 * const addressLens2: Lens<Person["contact"], Person["contact"]["address"]> = 
 *   lensProp("address")
 * const streetLens: Lens<Person["contact"]["address"], string> = 
 *   lensProp("street")
 * 
 * const fullStreetLens = composeLens(
 *   composeLens(contactLens, addressLens2),
 *   streetLens
 * )
 * 
 * const person: Person = {
 *   name: "Charlie",
 *   contact: {
 *     email: "charlie@example.com",
 *     address: {
 *       street: "123 Main St",
 *       city: "Springfield"
 *     }
 *   }
 * }
 * 
 * fullStreetLens.get(person)                   // "123 Main St"
 * fullStreetLens.set("456 Oak Ave")(person)
 * // Updates street while preserving entire structure
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input lenses
 * @property Composable - Result can be further composed
 */
const composeLens = <S, A, B>(
	first: Lens<S, A>,
	second: Lens<A, B>
): Lens<S, B> => ({
	get: (s: S) => second.get(first.get(s)),
	set: (b: B) => (s: S) => first.set(second.set(b)(first.get(s)))(s)
})

export default composeLens