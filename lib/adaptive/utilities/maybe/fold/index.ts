import type { Maybe } from "../../../types/fp/maybe/index.ts"
import isNothing from "../isNothing/index.ts"

/**
 * Folds a Maybe value to a single result using handlers for each case
 * 
 * Reduces a Maybe to a single value by providing transformation functions
 * for both Nothing and Just cases. This is essentially an alias for the
 * maybe function but with a name that emphasizes the fold/reduce pattern
 * common in functional programming. Useful for converting Maybe values
 * to other types while handling both cases explicitly.
 * 
 * @curried (onNothing) => (onJust) => (maybe) => result
 * @param onNothing - Function to call when Maybe is Nothing
 * @param onJust - Function to transform the Just value
 * @param maybe - The Maybe to fold
 * @returns The result of the appropriate handler
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 * 
 * // Basic folding to a value
 * const toNumber = fold(
 *   () => 0,
 *   (x: number) => x
 * )
 * 
 * toNumber(just(42))    // 42
 * toNumber(nothing())   // 0
 * 
 * // Folding to different types
 * const toString = fold(
 *   () => "Nothing",
 *   (n: number) => `Just(${n})`
 * )
 * 
 * toString(just(42))    // "Just(42)"
 * toString(nothing())   // "Nothing"
 * 
 * // Converting to boolean
 * const toBool = <T>() => fold<T, boolean>(
 *   () => false,
 *   () => true
 * )
 * 
 * toBool<number>()(just(42))   // true
 * toBool<string>()(nothing())  // false
 * 
 * // Folding to objects
 * interface Result<T> {
 *   hasValue: boolean
 *   value?: T
 *   error?: string
 * }
 * 
 * const toResult = <T>(maybe: Maybe<T>): Result<T> =>
 *   fold<T, Result<T>>(
 *     () => ({ 
 *       hasValue: false, 
 *       error: "No value present" 
 *     }),
 *     value => ({ 
 *       hasValue: true, 
 *       value 
 *     })
 *   )(maybe)
 * 
 * toResult(just(42))
 * // { hasValue: true, value: 42 }
 * 
 * toResult(nothing())
 * // { hasValue: false, error: "No value present" }
 * 
 * // Partial application for common patterns
 * const withDefault = <T>(defaultValue: T) => 
 *   fold<T, T>(
 *     () => defaultValue,
 *     x => x
 *   )
 * 
 * const getOrZero = withDefault(0)
 * const getOrEmpty = withDefault("")
 * 
 * getOrZero(just(5))       // 5
 * getOrZero(nothing())     // 0
 * getOrEmpty(just("hi"))   // "hi"
 * getOrEmpty(nothing())    // ""
 * 
 * // Complex transformations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * 
 * const processUser = (maybeUser: Maybe<User>): string =>
 *   pipe(
 *     maybeUser,
 *     map(u => u.name),
 *     fold(
 *       () => "Guest User",
 *       name => `Welcome, ${name}!`
 *     )
 *   )
 * 
 * processUser(just({ id: 1, name: "Alice" }))  // "Welcome, Alice!"
 * processUser(nothing())                        // "Guest User"
 * 
 * // Aggregating Maybe values
 * const sumMaybes = (maybes: Array<Maybe<number>>): number =>
 *   maybes.reduce(
 *     (total, maybe) => total + fold(
 *       () => 0,
 *       n => n
 *     )(maybe),
 *     0
 *   )
 * 
 * sumMaybes([just(1), nothing(), just(2), just(3)])  // 6
 * 
 * // Rendering based on Maybe
 * const renderUser = fold<User, string>(
 *   () => "<div>No user logged in</div>",
 *   user => `
 *     <div>
 *       <h1>${user.name}</h1>
 *       <p>ID: ${user.id}</p>
 *     </div>
 *   `
 * )
 * 
 * renderUser(just({ id: 1, name: "Bob" }))
 * // <div><h1>Bob</h1><p>ID: 1</p></div>
 * 
 * renderUser(nothing())
 * // <div>No user logged in</div>
 * 
 * // Error handling patterns
 * const handleDivision = (a: number, b: number): string => {
 *   const result = b === 0 ? nothing() : just(a / b)
 *   
 *   return fold<number, string>(
 *     () => `Error: Cannot divide ${a} by zero`,
 *     value => `${a} ÷ ${b} = ${value}`
 *   )(result)
 * }
 * 
 * handleDivision(10, 2)  // "10 ÷ 2 = 5"
 * handleDivision(10, 0)  // "Error: Cannot divide 10 by zero"
 * 
 * // Logging with fold
 * const logMaybe = <T>(label: string) => fold<T, void>(
 *   () => console.log(`${label}: Nothing`),
 *   value => console.log(`${label}: Just(${JSON.stringify(value)})`)
 * )
 * 
 * logMaybe("Result")(just(42))    // logs: "Result: Just(42)"
 * logMaybe("Result")(nothing())   // logs: "Result: Nothing"
 * 
 * // Converting to Promise
 * const toPromise = <T>(maybe: Maybe<T>): Promise<T> =>
 *   fold<T, Promise<T>>(
 *     () => Promise.reject(new Error("No value")),
 *     value => Promise.resolve(value)
 *   )(maybe)
 * 
 * await toPromise(just(42))    // 42
 * await toPromise(nothing())   // throws Error: No value
 * 
 * // Validation messages
 * interface ValidationError {
 *   field: string
 *   message: string
 * }
 * 
 * const getValidationMessage = (
 *   result: Maybe<string>,
 *   field: string
 * ): string =>
 *   fold<string, string>(
 *     () => `${field} is required`,
 *     value => `${field}: ${value}`
 *   )(result)
 * 
 * getValidationMessage(just("alice@example.com"), "Email")
 * // "Email: alice@example.com"
 * 
 * getValidationMessage(nothing(), "Email")
 * // "Email is required"
 * 
 * // Computing statistics
 * const stats = (maybes: Array<Maybe<number>>) => {
 *   const values = maybes.map(fold(
 *     () => null as number | null,
 *     n => n as number | null
 *   )).filter(n => n !== null) as Array<number>
 *   
 *   return {
 *     count: values.length,
 *     missing: maybes.length - values.length,
 *     sum: values.reduce((a, b) => a + b, 0),
 *     avg: values.length > 0 
 *       ? values.reduce((a, b) => a + b, 0) / values.length 
 *       : 0
 *   }
 * }
 * 
 * stats([just(10), nothing(), just(20), just(30), nothing()])
 * // { count: 3, missing: 2, sum: 60, avg: 20 }
 * 
 * // Chaining fold results
 * const process = (x: Maybe<number>, y: Maybe<number>): string =>
 *   fold<number, string>(
 *     () => "First value missing",
 *     xVal => fold<number, string>(
 *       () => `Second value missing, first was ${xVal}`,
 *       yVal => `Sum: ${xVal + yVal}`
 *     )(y)
 *   )(x)
 * 
 * process(just(10), just(20))   // "Sum: 30"
 * process(just(10), nothing())  // "Second value missing, first was 10"
 * process(nothing(), just(20))  // "First value missing"
 * ```
 * 
 * @property Pattern-matching - Handles both Nothing and Just cases
 * @property Type-safe - Ensures all cases are handled
 * @property Flexible - Can transform to any type
 */
const fold = <A, B>(onNothing: () => B) => 
	(onJust: (value: A) => B) => 
		(maybe: Maybe<A>): B => {
			if (isNothing(maybe)) {
				return onNothing()
			}
			
			return onJust(maybe.value)
		}

export default fold