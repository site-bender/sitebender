import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import nothing from "../nothing/index.ts"

/**
 * Converts a Just to Nothing if its value doesn't satisfy a predicate
 *
 * Filters the value inside a Maybe based on a predicate function. If the
 * Maybe is Just and the predicate returns true, the Just is preserved.
 * If the predicate returns false, the Just becomes Nothing. Nothing values
 * always remain Nothing. This enables conditional propagation of values
 * through a computation chain.
 *
 * @curried (predicate) => (maybe) => result
 * @param predicate - Function to test the Just value
 * @param maybe - The Maybe to filter
 * @returns The original Just if predicate passes, otherwise Nothing
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic filtering
 * const isPositive = (n: number) => n > 0
 *
 * filter(isPositive)(just(5))    // Just(5)
 * filter(isPositive)(just(-3))   // Nothing
 * filter(isPositive)(nothing())  // Nothing
 *
 * // Chaining filters for multiple conditions
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 *
 * const isEven = (n: number) => n % 2 === 0
 * const isLessThan100 = (n: number) => n < 100
 *
 * pipe(
 *   just(42),
 *   filter(isPositive),     // Just(42) - passes
 *   filter(isEven),         // Just(42) - passes
 *   filter(isLessThan100)   // Just(42) - passes
 * )
 *
 * pipe(
 *   just(101),
 *   filter(isPositive),     // Just(101) - passes
 *   filter(isEven),         // Nothing - fails (101 is odd)
 *   filter(isLessThan100)   // Nothing - already Nothing
 * )
 *
 * // String validation
 * const isNonEmpty = (s: string) => s.length > 0
 * const isEmail = (s: string) => s.includes("@")
 * const isShort = (s: string) => s.length <= 50
 *
 * const validateEmail = (email: Maybe<string>): Maybe<string> =>
 *   pipe(
 *     email,
 *     filter(isNonEmpty),
 *     filter(isEmail),
 *     filter(isShort)
 *   )
 *
 * validateEmail(just("user@example.com"))  // Just("user@example.com")
 * validateEmail(just("invalid"))           // Nothing - no @
 * validateEmail(just(""))                  // Nothing - empty
 * validateEmail(nothing())                 // Nothing
 *
 * // Object property validation
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   isActive: boolean
 * }
 *
 * const isAdult = (user: User) => user.age >= 18
 * const isActive = (user: User) => user.isActive
 * const hasLongName = (user: User) => user.name.length >= 3
 *
 * const validateUser = (maybeUser: Maybe<User>): Maybe<User> =>
 *   pipe(
 *     maybeUser,
 *     filter(isAdult),
 *     filter(isActive),
 *     filter(hasLongName)
 *   )
 *
 * validateUser(just({
 *   id: 1,
 *   name: "Alice",
 *   age: 25,
 *   isActive: true
 * }))  // Just(user)
 *
 * validateUser(just({
 *   id: 2,
 *   name: "Bob",
 *   age: 16,
 *   isActive: true
 * }))  // Nothing - underage
 *
 * // Partial application for reusable filters
 * const filterPositive = filter((n: number) => n > 0)
 * const filterEven = filter((n: number) => n % 2 === 0)
 *
 * filterPositive(just(5))   // Just(5)
 * filterPositive(just(-5))  // Nothing
 * filterEven(just(4))       // Just(4)
 * filterEven(just(3))       // Nothing
 *
 * // Combining with map and chain
 * import { map } from "../map/index.ts"
 * import { chain } from "../chain/index.ts"
 *
 * const processNumber = (input: string): Maybe<number> =>
 *   pipe(
 *     just(input),
 *     chain(s => {
 *       const n = parseInt(s, 10)
 *       return isNaN(n) ? nothing() : just(n)
 *     }),
 *     filter(n => n > 0),           // Must be positive
 *     map(n => n * 2),               // Double it
 *     filter(n => n <= 100)          // Must not exceed 100
 *   )
 *
 * processNumber("25")   // Just(50)
 * processNumber("60")   // Nothing - 60 * 2 = 120 > 100
 * processNumber("-5")   // Nothing - negative
 * processNumber("abc")  // Nothing - not a number
 *
 * // Array filtering within Maybe
 * const numbers: Maybe<Array<number>> = just([1, 2, 3, 4, 5, 6])
 *
 * const keepOddNumbers = pipe(
 *   numbers,
 *   map(arr => arr.filter(n => n % 2 === 1)),
 *   filter(arr => arr.length > 0)  // Ensure non-empty
 * )
 * // Just([1, 3, 5])
 *
 * const keepEvenNumbers = pipe(
 *   just([1, 3, 5]),  // Only odd numbers
 *   map(arr => arr.filter(n => n % 2 === 0)),
 *   filter(arr => arr.length > 0)  // Becomes Nothing (empty array)
 * )
 * // Nothing
 *
 * // Range validation
 * const inRange = (min: number, max: number) => (n: number) =>
 *   n >= min && n <= max
 *
 * const validateAge = filter(inRange(18, 65))
 *
 * validateAge(just(25))  // Just(25)
 * validateAge(just(70))  // Nothing
 * validateAge(just(10))  // Nothing
 *
 * // Complex business logic
 * interface Order {
 *   id: number
 *   total: number
 *   items: Array<Item>
 *   isPaid: boolean
 * }
 *
 * interface Item {
 *   name: string
 *   price: number
 * }
 *
 * const isValidOrder = (order: Order): boolean =>
 *   order.items.length > 0 &&
 *   order.total > 0 &&
 *   order.isPaid &&
 *   order.total === order.items.reduce((sum, item) => sum + item.price, 0)
 *
 * const processOrder = (maybeOrder: Maybe<Order>): Maybe<Order> =>
 *   filter(isValidOrder)(maybeOrder)
 *
 * // Custom predicate with logging
 * const filterWithLog = <T>(
 *   predicate: (value: T) => boolean,
 *   logMessage: string
 * ) => (maybe: Maybe<T>): Maybe<T> => {
 *   const result = filter(predicate)(maybe)
 *   if (isNothing(result) && !isNothing(maybe)) {
 *     console.log(`Filter failed: ${logMessage}`)
 *   }
 *   return result
 * }
 *
 * const validateWithLogging = pipe(
 *   just(15),
 *   filterWithLog((n: number) => n > 10, "Must be > 10"),
 *   filterWithLog((n: number) => n < 20, "Must be < 20"),
 *   filterWithLog((n: number) => n % 2 === 0, "Must be even")
 * )
 * // Logs: "Filter failed: Must be even"
 * // Returns: Nothing
 * ```
 *
 * @property Preserves-just - Just values that pass the predicate are unchanged
 * @property Converts-to-nothing - Just values that fail become Nothing
 * @property Short-circuits - Nothing values remain Nothing
 */
const filter =
	<A>(predicate: (a: A) => boolean) => (maybe: Maybe<A>): Maybe<A> => {
		if (isNothing(maybe)) {
			return maybe
		}

		return predicate(maybe.value) ? maybe : nothing()
	}

export default filter
