import type { Lens } from "../lens/index.ts"
import type { Value } from "../../../types/index.ts"

/**
 * Applies a function to a value at a lens focus
 * 
 * Uses a lens to focus on a specific part of a data structure, applies
 * a transformation function to that focused value, and returns a new
 * structure with the transformed value. This is the primary way to
 * modify values through lenses while maintaining immutability.
 * 
 * @curried (lens) => (fn) => (obj) => result
 * @param lens - The lens to focus through
 * @param fn - Function to apply to the focused value
 * @param obj - The object to transform
 * @returns A new object with the focused value transformed
 * @example
 * ```typescript
 * import lens from "../lens/index.ts"
 * import lensProp from "../lensProp/index.ts"
 * import lensPath from "../lensPath/index.ts"
 * import lensIndex from "../lensIndex/index.ts"
 * 
 * // Basic usage with lensProp
 * const ageLens = lensProp("age")
 * const person = { name: "Alice", age: 30 }
 * 
 * over(ageLens)((age: number) => age + 1)(person)
 * // { name: "Alice", age: 31 }
 * 
 * over(ageLens)((age: number) => age * 2)(person)
 * // { name: "Alice", age: 60 }
 * 
 * // String transformation
 * const nameLens = lensProp("name")
 * over(nameLens)((name: string) => name.toUpperCase())(person)
 * // { name: "ALICE", age: 30 }
 * 
 * // With lensPath for nested updates
 * const emailLens = lensPath(["contact", "email"])
 * const user = {
 *   name: "Bob",
 *   contact: {
 *     email: "BOB@EXAMPLE.COM",
 *     phone: "123-456"
 *   }
 * }
 * 
 * over(emailLens)((email: string) => email.toLowerCase())(user)
 * // {
 * //   name: "Bob",
 * //   contact: {
 * //     email: "bob@example.com",
 * //     phone: "123-456"
 * //   }
 * // }
 * 
 * // With lensIndex for array updates
 * const firstLens = lensIndex(0)
 * const numbers = [1, 2, 3, 4, 5]
 * 
 * over(firstLens)((n: number) => n * 10)(numbers)
 * // [10, 2, 3, 4, 5]
 * 
 * const lastLens = lensIndex(-1)
 * over(lastLens)((n: number) => n + 100)(numbers)
 * // [1, 2, 3, 4, 105]
 * 
 * // Custom lens
 * const priceLens = lens<{ price: number }, number>(
 *   (item) => item.price,
 *   (price) => (item) => ({ ...item, price })
 * )
 * 
 * const product = { name: "Widget", price: 100 }
 * over(priceLens)((price: number) => price * 0.9)(product)
 * // { name: "Widget", price: 90 } (10% discount)
 * 
 * // Composing lens operations
 * const addressLens = lensPath(["user", "address"])
 * const cityLens = lensProp("city")
 * 
 * // Manual composition
 * const userCityLens = lens<any, string>(
 *   (obj) => addressLens.get(obj)?.city,
 *   (city) => (obj) => {
 *     const address = addressLens.get(obj) || {}
 *     return addressLens.set({ ...address, city })(obj)
 *   }
 * )
 * 
 * const data = {
 *   user: {
 *     name: "Carol",
 *     address: { city: "NYC", zip: "10001" }
 *   }
 * }
 * 
 * over(userCityLens)((city: string) => city.toLowerCase())(data)
 * // Updates city to "nyc"
 * 
 * // Array of objects
 * const itemsLens = lensProp("items")
 * const cart = {
 *   items: [
 *     { id: 1, quantity: 2 },
 *     { id: 2, quantity: 1 }
 *   ],
 *   total: 3
 * }
 * 
 * over(itemsLens)((items: Array<any>) =>
 *   items.map(item => ({ ...item, quantity: item.quantity + 1 }))
 * )(cart)
 * // All quantities increased by 1
 * 
 * // Boolean toggling
 * const activeLens = lensProp("active")
 * const feature = { name: "Feature", active: true }
 * 
 * over(activeLens)((active: boolean) => !active)(feature)
 * // { name: "Feature", active: false }
 * 
 * // Practical use cases
 * 
 * // Price adjustments
 * const applyDiscount = (percent: number) =>
 *   over(lensProp("price"))((price: number) => 
 *     price * (1 - percent / 100)
 *   )
 * 
 * applyDiscount(20)({ name: "Item", price: 100 })
 * // { name: "Item", price: 80 }
 * 
 * // Text formatting
 * const formatTitle = over(lensProp("title"))(
 *   (title: string) => title.trim().replace(/\s+/g, " ")
 * )
 * 
 * formatTitle({ title: "  Hello   World  ", id: 1 })
 * // { title: "Hello World", id: 1 }
 * 
 * // Counter operations
 * const counterLens = lensPath(["stats", "count"])
 * const increment = over(counterLens)((n: number = 0) => n + 1)
 * const decrement = over(counterLens)((n: number = 0) => Math.max(0, n - 1))
 * 
 * const state = { stats: { count: 5 } }
 * increment(state) // { stats: { count: 6 } }
 * decrement(state) // { stats: { count: 4 } }
 * 
 * // Date manipulation
 * const dueDateLens = lensProp("dueDate")
 * const extendByDays = (days: number) =>
 *   over(dueDateLens)((date: Date) => {
 *     const newDate = new Date(date)
 *     newDate.setDate(newDate.getDate() + days)
 *     return newDate
 *   })
 * 
 * const task = { 
 *   title: "Task", 
 *   dueDate: new Date("2024-01-01") 
 * }
 * extendByDays(7)(task)
 * // Due date extended by 7 days
 * 
 * // Partial application for reusable transformers
 * const double = (n: number) => n * 2
 * const doubleAt = (lens: Lens<any, number>) => over(lens)(double)
 * 
 * const scoreLens = lensProp("score")
 * const game = { player: "Alice", score: 100 }
 * doubleAt(scoreLens)(game) // { player: "Alice", score: 200 }
 * 
 * // Safe operations with defaults
 * const safeIncrement = over(lensProp("value"))(
 *   (val: number | undefined) => (val || 0) + 1
 * )
 * 
 * safeIncrement({ value: 5 })     // { value: 6 }
 * safeIncrement({ value: undefined }) // { value: 1 }
 * safeIncrement({})               // { value: 1 }
 * 
 * // Chaining multiple overs
 * const xLens = lensProp("x")
 * const yLens = lensProp("y")
 * 
 * const point = { x: 10, y: 20 }
 * const transformed = over(yLens)((y: number) => y * 2)(
 *   over(xLens)((x: number) => x + 5)(point)
 * )
 * // { x: 15, y: 40 }
 * ```
 * @property Lens-based - works with any lens (lensProp, lensPath, lensIndex, custom)
 * @property Immutable - returns new structure, preserves original
 * @property Composable - multiple overs can be chained for complex updates
 */
const over = <S, A>(
	lens: Lens<S, A>,
) => (
	fn: (value: A) => A,
) => (
	obj: S,
): S => {
	// Get the current value through the lens
	const currentValue = lens.get(obj)
	
	// Apply the transformation
	const newValue = fn(currentValue)
	
	// Set the new value through the lens
	return lens.set(newValue)(obj)
}

export default over