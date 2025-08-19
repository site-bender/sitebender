import type { Maybe } from "../../../types/fp/maybe/index.ts"
import isNothing from "../isNothing/index.ts"

/**
 * Returns an alternative Maybe if the current one is Nothing
 * 
 * Provides a fallback Maybe value for the Nothing case. Unlike getOrElse which
 * exits the Maybe context, orElse keeps you within the Maybe monad, allowing
 * continued chaining of operations. The alternative is provided as a thunk for
 * lazy evaluation. This is useful for trying multiple sources or providing
 * computed alternatives.
 * 
 * @curried (getAlternative) => (maybe) => result
 * @param getAlternative - Thunk that returns the alternative Maybe if Nothing
 * @param maybe - The Maybe to check
 * @returns The original Maybe if Just, otherwise the alternative
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 * 
 * // Basic fallback
 * orElse(() => just(0))(just(42))    // Just(42) - original kept
 * orElse(() => just(0))(nothing())   // Just(0) - alternative used
 * 
 * // Chaining fallbacks
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * const firstTry = nothing()
 * const secondTry = nothing()
 * const thirdTry = just(42)
 * 
 * pipe(
 *   firstTry,
 *   orElse(() => secondTry),
 *   orElse(() => thirdTry),
 *   orElse(() => just(999))  // Final fallback
 * )
 * // Just(42) - third try succeeded
 * 
 * // Lazy evaluation - alternative only computed if needed
 * let sideEffect = 0
 * const expensiveAlternative = () => {
 *   sideEffect += 1
 *   return just(999)
 * }
 * 
 * orElse(expensiveAlternative)(just(5))   // Just(5) (sideEffect still 0)
 * orElse(expensiveAlternative)(nothing()) // Just(999) (sideEffect now 1)
 * 
 * // Multiple data sources
 * const getFromCache = (key: string): Maybe<string> =>
 *   key === "cached" ? just("cached value") : nothing()
 * 
 * const getFromDatabase = (key: string): Maybe<string> =>
 *   key === "stored" ? just("database value") : nothing()
 * 
 * const getFromDefault = (): Maybe<string> =>
 *   just("default value")
 * 
 * const getValue = (key: string): Maybe<string> =>
 *   pipe(
 *     getFromCache(key),
 *     orElse(() => getFromDatabase(key)),
 *     orElse(() => getFromDefault())
 *   )
 * 
 * getValue("cached")   // Just("cached value")
 * getValue("stored")   // Just("database value")
 * getValue("missing")  // Just("default value")
 * 
 * // Configuration fallbacks
 * interface Config {
 *   primary?: string
 *   secondary?: string
 *   fallback?: string
 * }
 * 
 * const getConfigValue = (config: Config): Maybe<string> =>
 *   pipe(
 *     config.primary ? just(config.primary) : nothing(),
 *     orElse(() => config.secondary ? just(config.secondary) : nothing()),
 *     orElse(() => config.fallback ? just(config.fallback) : nothing())
 *   )
 * 
 * getConfigValue({ primary: "A" })      // Just("A")
 * getConfigValue({ secondary: "B" })    // Just("B")
 * getConfigValue({ fallback: "C" })     // Just("C")
 * getConfigValue({})                    // Nothing
 * 
 * // Error recovery
 * const safeParse = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 * 
 * const parseWithFallback = (s: string, fallback: number): Maybe<number> =>
 *   pipe(
 *     safeParse(s),
 *     orElse(() => just(fallback))
 *   )
 * 
 * parseWithFallback("42", 0)    // Just(42)
 * parseWithFallback("abc", 99)  // Just(99)
 * 
 * // Computed alternatives
 * const findUser = (id: number): Maybe<User> =>
 *   id === 1 ? just({ id: 1, name: "Alice" }) : nothing()
 * 
 * const createGuestUser = (): Maybe<User> =>
 *   just({ id: 0, name: "Guest" })
 * 
 * const getUser = (id: number): Maybe<User> =>
 *   pipe(
 *     findUser(id),
 *     orElse(createGuestUser)
 *   )
 * 
 * getUser(1)  // Just({ id: 1, name: "Alice" })
 * getUser(2)  // Just({ id: 0, name: "Guest" })
 * 
 * // Partial application for common patterns
 * const orNothing = orElse(() => nothing())
 * const orDefault = <T>(value: T) => orElse(() => just(value))
 * 
 * orNothing(just(5))     // Just(5)
 * orNothing(nothing())   // Nothing
 * 
 * const orZero = orDefault(0)
 * orZero(just(42))       // Just(42)
 * orZero(nothing())      // Just(0)
 * 
 * // Environment variable fallbacks
 * const getEnvVar = (name: string): Maybe<string> => {
 *   const value = process.env[name]
 *   return value ? just(value) : nothing()
 * }
 * 
 * const getDatabaseUrl = (): Maybe<string> =>
 *   pipe(
 *     getEnvVar("DATABASE_URL"),
 *     orElse(() => getEnvVar("DB_URL")),
 *     orElse(() => getEnvVar("POSTGRES_URL")),
 *     orElse(() => just("postgresql://localhost:5432/mydb"))
 *   )
 * 
 * // Combining with map and chain
 * import { map } from "../map/index.ts"
 * import { chain } from "../chain/index.ts"
 * 
 * const processInput = (input: string): Maybe<number> =>
 *   pipe(
 *     safeParse(input),
 *     map(n => n * 2),
 *     chain(n => n > 100 ? nothing() : just(n)),
 *     orElse(() => safeParse(input)),  // Try original if doubled fails
 *     orElse(() => just(0))            // Final fallback
 *   )
 * 
 * processInput("30")   // Just(60) - doubled value
 * processInput("60")   // Just(60) - original (120 > 100)
 * processInput("abc")  // Just(0) - fallback
 * 
 * // Alternative computation chains
 * const calculate1 = (x: number): Maybe<number> =>
 *   x > 0 ? just(x * 2) : nothing()
 * 
 * const calculate2 = (x: number): Maybe<number> =>
 *   x < 0 ? just(x * -2) : nothing()
 * 
 * const calculate3 = (x: number): Maybe<number> =>
 *   x === 0 ? just(100) : nothing()
 * 
 * const calculate = (x: number): Maybe<number> =>
 *   pipe(
 *     calculate1(x),
 *     orElse(() => calculate2(x)),
 *     orElse(() => calculate3(x))
 *   )
 * 
 * calculate(5)   // Just(10) - positive path
 * calculate(-5)  // Just(10) - negative path
 * calculate(0)   // Just(100) - zero path
 * 
 * // Async alternatives
 * const fetchFromPrimary = async (id: string): Promise<Maybe<Data>> => {
 *   // ... primary source
 *   return nothing()
 * }
 * 
 * const fetchFromSecondary = async (id: string): Promise<Maybe<Data>> => {
 *   // ... secondary source
 *   return just({ id, value: "secondary data" })
 * }
 * 
 * const fetchData = async (id: string): Promise<Maybe<Data>> => {
 *   const primary = await fetchFromPrimary(id)
 *   return orElse(() => fetchFromSecondary(id))(primary)
 * }
 * 
 * // Keeping Nothing as final result
 * const maybeCompute = (x: number): Maybe<number> =>
 *   pipe(
 *     x > 10 ? just(x) : nothing(),
 *     orElse(() => x > 5 ? just(x * 2) : nothing()),
 *     orElse(() => x > 0 ? just(x * 3) : nothing())
 *     // No final fallback - can still be Nothing
 *   )
 * 
 * maybeCompute(15)  // Just(15)
 * maybeCompute(7)   // Just(14)
 * maybeCompute(2)   // Just(6)
 * maybeCompute(-1)  // Nothing
 * ```
 * 
 * @property Lazy-evaluation - Alternative is only computed if needed
 * @property Monadic - Stays within the Maybe context
 * @property Chainable - Can be used multiple times for multiple fallbacks
 */
const orElse = <A>(getAlternative: () => Maybe<A>) => 
	(maybe: Maybe<A>): Maybe<A> => {
		if (isNothing(maybe)) {
			return getAlternative()
		}
		
		return maybe
	}

export default orElse