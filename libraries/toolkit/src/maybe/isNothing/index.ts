import type { Maybe, Nothing } from "../../types/fp/maybe/index.ts"

/**
 * Type guard that checks if a Maybe value is Nothing
 *
 * Pure predicate function that determines whether a Maybe is absent (Nothing)
 * or contains a value (Just). This type guard narrows the type in TypeScript,
 * enabling safe handling of absent values and early returns. Complements isJust
 * for complete pattern matching over Maybe values.
 *
 * @param maybe - The Maybe value to check
 * @returns True if the Maybe is Nothing, false if Just
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic type checking
 * isNothing(nothing())   // true
 * isNothing(just(42))    // false
 *
 * // Early returns for absent values
 * const processData = <T>(maybe: Maybe<T>): T => {
 *   if (isNothing(maybe)) {
 *     throw new Error("No value present")
 *   }
 *   // TypeScript knows maybe is Just<T> here
 *   return maybe.value
 * }
 *
 * // Pattern matching style
 * const describeMaybe = <T>(maybe: Maybe<T>): string => {
 *   if (isNothing(maybe)) {
 *     return "Empty"
 *   } else {
 *     return `Contains: ${maybe.value}`
 *   }
 * }
 *
 * describeMaybe(nothing())   // "Empty"
 * describeMaybe(just(100))   // "Contains: 100"
 *
 * // Filtering for Nothing values
 * const maybes = [
 *   just(1),
 *   nothing(),
 *   just(2),
 *   nothing(),
 *   just(3)
 * ]
 *
 * const nothingValues = maybes.filter(isNothing)
 * // [Nothing, Nothing] with type Array<Nothing>
 *
 * const countMissing = maybes.filter(isNothing).length
 * // 2
 *
 * // Default value handling
 * const getValueOrDefault = <T>(maybe: Maybe<T>, defaultValue: T): T => {
 *   if (isNothing(maybe)) {
 *     return defaultValue
 *   }
 *   return maybe.value
 * }
 *
 * getValueOrDefault(just(42), 0)    // 42
 * getValueOrDefault(nothing(), 0)   // 0
 *
 * // Validation and error messages
 * const validateRequired = <T>(
 *   maybe: Maybe<T>,
 *   fieldName: string
 * ): T => {
 *   if (isNothing(maybe)) {
 *     throw new Error(`${fieldName} is required`)
 *   }
 *   return maybe.value
 * }
 *
 * try {
 *   validateRequired(nothing(), "email")
 * } catch (e) {
 *   console.error(e.message)  // "email is required"
 * }
 *
 * // Conditional side effects
 * const logIfMissing = <T>(maybe: Maybe<T>, context: string): void => {
 *   if (isNothing(maybe)) {
 *     console.warn(`Missing value in ${context}`)
 *   }
 * }
 *
 * logIfMissing(nothing(), "user profile")  // logs warning
 * logIfMissing(just("data"), "user profile")  // no log
 *
 * // Chaining with fallbacks
 * const findFirst = <T>(maybes: Array<Maybe<T>>): Maybe<T> => {
 *   for (const maybe of maybes) {
 *     if (!isNothing(maybe)) {
 *       return maybe
 *     }
 *   }
 *   return nothing()
 * }
 *
 * findFirst([nothing(), nothing(), just(42)])  // Just(42)
 * findFirst([nothing(), nothing(), nothing()])  // Nothing
 *
 * // Combining multiple Maybe values
 * interface FormData {
 *   name: Maybe<string>
 *   email: Maybe<string>
 *   age: Maybe<number>
 * }
 *
 * const isFormIncomplete = (form: FormData): boolean =>
 *   isNothing(form.name) ||
 *   isNothing(form.email) ||
 *   isNothing(form.age)
 *
 * const form1: FormData = {
 *   name: just("Alice"),
 *   email: just("alice@example.com"),
 *   age: just(30)
 * }
 *
 * const form2: FormData = {
 *   name: just("Bob"),
 *   email: nothing(),
 *   age: just(25)
 * }
 *
 * isFormIncomplete(form1)  // false
 * isFormIncomplete(form2)  // true
 *
 * // Async operations with early exit
 * const fetchUserData = async (id: number): Promise<User> => {
 *   const maybeUser = await fetchUser(id)
 *
 *   if (isNothing(maybeUser)) {
 *     throw new Error(`User ${id} not found`)
 *   }
 *
 *   return maybeUser.value
 * }
 *
 * // Counting missing values in results
 * const results = [just(1), nothing(), just(2), nothing(), nothing()]
 * const missingCount = results.filter(isNothing).length
 * const presentCount = results.filter(m => !isNothing(m)).length
 *
 * console.log(`Missing: ${missingCount}, Present: ${presentCount}`)
 * // "Missing: 3, Present: 2"
 *
 * // Guard clauses in functions
 * const calculateScore = (
 *   base: Maybe<number>,
 *   multiplier: Maybe<number>
 * ): number => {
 *   if (isNothing(base) || isNothing(multiplier)) {
 *     return 0  // Default score for missing data
 *   }
 *
 *   return base.value * multiplier.value
 * }
 *
 * calculateScore(just(10), just(2))    // 20
 * calculateScore(just(10), nothing())  // 0
 * calculateScore(nothing(), just(2))   // 0
 *
 * // Pipeline with Nothing checks
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 *
 * const safePipeline = <T>(initial: Maybe<T>): string => {
 *   if (isNothing(initial)) {
 *     return "Pipeline aborted: no initial value"
 *   }
 *
 *   // Continue with pipeline knowing we have Just<T>
 *   return `Processing: ${initial.value}`
 * }
 *
 * safePipeline(nothing())  // "Pipeline aborted: no initial value"
 * safePipeline(just(42))   // "Processing: 42"
 * ```
 *
 * @property Type-guard - Narrows Maybe<T> to Nothing
 * @property Pure - No side effects, deterministic result
 * @property Safe - Enables safe handling of absent values
 */
const isNothing = <A>(maybe: Maybe<A>): maybe is Nothing => {
	return maybe._tag === "Nothing"
}

export default isNothing
