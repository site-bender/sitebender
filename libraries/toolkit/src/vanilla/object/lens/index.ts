// intentionally no imports

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
 * @pure
 * @immutable
 * @curried
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
 * firstLens.get([1, 2, 3, 4])            // 1
 * firstLens.set(10)([1, 2, 3, 4])        // [10, 2, 3, 4]
 *
 * // Using lens with transformations
 * const priceLens = lens<{ price: number }, number>(
 *   (item) => item.price,
 *   (price) => (item) => ({ ...item, price })
 * )
 * const item = { name: "Widget", price: 100 }
 * const discounted = priceLens.set(
 *   priceLens.get(item) * 0.8
 * )(item)
 * // { name: "Widget", price: 80 }
 * ```
 */
const lens = <S, A>(
	getter: (s: S) => A,
) =>
(
	setter: (a: A) => (s: S) => S,
): Lens<S, A> => ({
	get: getter,
	set: setter,
})

export default lens
