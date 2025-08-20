import type { Just, Maybe } from "../../../types/fp/maybe/index.ts"

/**
 * Type guard that checks if a Maybe value is Just
 * 
 * Pure predicate function that determines whether a Maybe contains a value
 * (Just) or is absent (Nothing). This type guard narrows the type in TypeScript,
 * allowing safe access to the value property within conditional blocks. Essential
 * for pattern matching and conditional logic with Maybe values.
 * 
 * @param maybe - The Maybe value to check
 * @returns True if the Maybe is Just, false if Nothing
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 * 
 * // Basic type checking
 * isJust(just(42))     // true
 * isJust(nothing())    // false
 * 
 * // Type narrowing in conditionals
 * const maybe = just("hello") as Maybe<string>
 * 
 * if (isJust(maybe)) {
 *   // TypeScript knows maybe is Just<string> here
 *   console.log(maybe.value.toUpperCase())  // "HELLO"
 * }
 * 
 * // Pattern matching style
 * const describeMaybe = <T>(maybe: Maybe<T>): string => {
 *   if (isJust(maybe)) {
 *     return `Has value: ${maybe.value}`
 *   } else {
 *     return "No value"
 *   }
 * }
 * 
 * describeMaybe(just(100))   // "Has value: 100"
 * describeMaybe(nothing())    // "No value"
 * 
 * // Filtering arrays of Maybe values
 * const maybes = [
 *   just(1),
 *   nothing(),
 *   just(2),
 *   nothing(),
 *   just(3)
 * ]
 * 
 * const justValues = maybes.filter(isJust)
 * // [Just(1), Just(2), Just(3)] with type Array<Just<number>>
 * 
 * const values = maybes
 *   .filter(isJust)
 *   .map(j => j.value)  // TypeScript knows j has value property
 * // [1, 2, 3]
 * 
 * // Early returns based on presence
 * const processValue = <T>(maybe: Maybe<T>): T | null => {
 *   if (!isJust(maybe)) {
 *     return null
 *   }
 *   // TypeScript knows maybe.value exists here
 *   return maybe.value
 * }
 * 
 * processValue(just(42))    // 42
 * processValue(nothing())   // null
 * 
 * // Combining with map for conditional transformations
 * const maybeDouble = <T extends number>(maybe: Maybe<T>): Maybe<T> => {
 *   if (isJust(maybe)) {
 *     return just((maybe.value * 2) as T)
 *   }
 *   return maybe
 * }
 * 
 * maybeDouble(just(5))     // Just(10)
 * maybeDouble(nothing())   // Nothing
 * 
 * // Using with reduce for aggregations
 * const sumJustValues = (maybes: Array<Maybe<number>>): number =>
 *   maybes.reduce((sum, maybe) => {
 *     if (isJust(maybe)) {
 *       return sum + maybe.value
 *     }
 *     return sum
 *   }, 0)
 * 
 * sumJustValues([just(1), nothing(), just(2), just(3)])  // 6
 * 
 * // Validation and error handling
 * interface Result {
 *   data: Maybe<string>
 *   error: Maybe<Error>
 * }
 * 
 * const handleResult = (result: Result): void => {
 *   if (isJust(result.error)) {
 *     console.error("Error:", result.error.value.message)
 *     return
 *   }
 *   
 *   if (isJust(result.data)) {
 *     console.log("Success:", result.data.value)
 *   } else {
 *     console.log("No data received")
 *   }
 * }
 * 
 * // Counting present values
 * const countJust = <T>(maybes: Array<Maybe<T>>): number =>
 *   maybes.filter(isJust).length
 * 
 * countJust([just(1), nothing(), just(2)])  // 2
 * 
 * // Finding first Just value
 * const firstJust = <T>(maybes: Array<Maybe<T>>): Maybe<T> => {
 *   for (const maybe of maybes) {
 *     if (isJust(maybe)) {
 *       return maybe
 *     }
 *   }
 *   return nothing()
 * }
 * 
 * firstJust([nothing(), nothing(), just(42), just(100)])  // Just(42)
 * 
 * // Async operations with Maybe
 * const fetchUser = async (id: number): Promise<Maybe<User>> => {
 *   // ... fetch logic
 *   return just({ id, name: "Alice" })
 * }
 * 
 * const user = await fetchUser(1)
 * if (isJust(user)) {
 *   console.log(`Found user: ${user.value.name}`)
 * } else {
 *   console.log("User not found")
 * }
 * 
 * // Chaining operations conditionally
 * const processIfPresent = <T, U>(
 *   maybe: Maybe<T>,
 *   fn: (value: T) => U
 * ): U | undefined => {
 *   if (isJust(maybe)) {
 *     return fn(maybe.value)
 *   }
 *   return undefined
 * }
 * 
 * processIfPresent(just(10), x => x * 2)   // 20
 * processIfPresent(nothing(), x => x * 2)  // undefined
 * ```
 * 
 * @property Type-guard - Narrows Maybe<T> to Just<T>
 * @property Pure - No side effects, deterministic result
 * @property Safe - Enables type-safe value access
 */
const isJust = <A>(maybe: Maybe<A>): maybe is Just<A> => {
	return maybe._tag === "Just"
}

export default isJust