import type { Value } from "../../../types/index.ts"

/**
 * Type definition for a lens
 */
export type Lens<S, A> = {
	get: (s: S) => A
	set: (a: A) => (s: S) => S
}

/**
 * Creates a lens for functional property access and modification
 * 
 * A lens is a composable abstraction for accessing and modifying nested data
 * in an immutable way. It consists of a getter and setter that focus on a
 * specific part of a data structure. Lenses can be composed to access deeply
 * nested properties while maintaining immutability.
 * 
 * @curried (getter) => (setter) => lens
 * @param getter - Function to extract the focused value
 * @param setter - Function to set the focused value immutably
 * @returns A lens object with get and set methods
 * @example
 * ```typescript
 * // Basic lens creation
 * const nameLens = lens<{ name: string }, string>(
 *   (obj) => obj.name,
 *   (name) => (obj) => ({ ...obj, name })
 * )
 * 
 * const person = { name: "Alice", age: 30 }
 * nameLens.get(person)                    // "Alice"
 * nameLens.set("Bob")(person)             // { name: "Bob", age: 30 }
 * person                                   // { name: "Alice", age: 30 } (unchanged)
 * 
 * // Nested property lens
 * type User = { profile: { email: string; age: number } }
 * const emailLens = lens<User, string>(
 *   (user) => user.profile.email,
 *   (email) => (user) => ({
 *     ...user,
 *     profile: { ...user.profile, email }
 *   })
 * )
 * 
 * const user = { profile: { email: "old@ex.com", age: 25 } }
 * emailLens.get(user)                     // "old@ex.com"
 * emailLens.set("new@ex.com")(user)       // { profile: { email: "new@ex.com", age: 25 } }
 * 
 * // Array element lens
 * const firstLens = lens<Array<number>, number>(
 *   (arr) => arr[0],
 *   (val) => (arr) => [val, ...arr.slice(1)]
 * )
 * 
 * const numbers = [1, 2, 3, 4]
 * firstLens.get(numbers)                  // 1
 * firstLens.set(10)(numbers)              // [10, 2, 3, 4]
 * 
 * // Lens composition (manual)
 * type Company = { 
 *   address: { 
 *     city: string; 
 *     street: string 
 *   } 
 * }
 * 
 * const addressLens = lens<Company, Company["address"]>(
 *   (company) => company.address,
 *   (address) => (company) => ({ ...company, address })
 * )
 * 
 * const cityLens = lens<Company["address"], string>(
 *   (address) => address.city,
 *   (city) => (address) => ({ ...address, city })
 * )
 * 
 * // Compose lenses manually
 * const companyCityLens = lens<Company, string>(
 *   (company) => cityLens.get(addressLens.get(company)),
 *   (city) => (company) => 
 *     addressLens.set(cityLens.set(city)(addressLens.get(company)))(company)
 * )
 * 
 * const company = { address: { city: "NYC", street: "5th Ave" } }
 * companyCityLens.get(company)            // "NYC"
 * companyCityLens.set("Boston")(company)  // { address: { city: "Boston", street: "5th Ave" } }
 * 
 * // Using lens with map-like operations
 * const priceLens = lens<{ price: number }, number>(
 *   (item) => item.price,
 *   (price) => (item) => ({ ...item, price })
 * )
 * 
 * const applyDiscount = (discount: number) => (price: number) => 
 *   price * (1 - discount)
 * 
 * const item = { name: "Widget", price: 100 }
 * const discounted = priceLens.set(
 *   applyDiscount(0.2)(priceLens.get(item))
 * )(item)
 * // { name: "Widget", price: 80 }
 * 
 * // Optional value lens with default
 * const optionalLens = <T, K extends keyof T>(
 *   key: K,
 *   defaultValue: T[K]
 * ) => lens<T, T[K]>(
 *   (obj) => obj[key] ?? defaultValue,
 *   (val) => (obj) => ({ ...obj, [key]: val })
 * )
 * 
 * const configLens = optionalLens<
 *   { timeout?: number }, 
 *   "timeout"
 * >("timeout", 5000)
 * 
 * configLens.get({})                      // 5000 (default)
 * configLens.get({ timeout: 3000 })       // 3000
 * configLens.set(1000)({})                // { timeout: 1000 }
 * 
 * // Practical lens for form data
 * type FormData = {
 *   fields: {
 *     username: string
 *     email: string
 *     preferences: {
 *       newsletter: boolean
 *     }
 *   }
 * }
 * 
 * const newsletterLens = lens<FormData, boolean>(
 *   (form) => form.fields.preferences.newsletter,
 *   (newsletter) => (form) => ({
 *     ...form,
 *     fields: {
 *       ...form.fields,
 *       preferences: {
 *         ...form.fields.preferences,
 *         newsletter
 *       }
 *     }
 *   })
 * )
 * 
 * const formData: FormData = {
 *   fields: {
 *     username: "alice",
 *     email: "alice@ex.com",
 *     preferences: { newsletter: false }
 *   }
 * }
 * 
 * const updatedForm = newsletterLens.set(true)(formData)
 * // Deep update while maintaining immutability
 * ```
 * @property Composable - lenses can be composed for deep access
 * @property Immutable - all operations return new objects
 * @property Reusable - same lens can be used with multiple objects
 */
const lens = <S, A>(
	getter: (s: S) => A,
) => (
	setter: (a: A) => (s: S) => S,
): Lens<S, A> => ({
	get: getter,
	set: setter,
})

export default lens