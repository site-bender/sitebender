import type { Maybe } from "../../types/fp/maybe/index.ts"
import isNothing from "../isNothing/index.ts"

/**
 * Flat maps a function over the value inside a Just (monadic bind)
 * 
 * Applies a function that returns a Maybe to the value inside a Just,
 * flattening the result to avoid nested Maybe values. This is the monadic
 * bind operation (also known as flatMap) that enables sequential composition
 * of operations that might fail. Essential for chaining computations where
 * each step might produce Nothing.
 * 
 * @curried (fn) => (maybe) => result
 * @param fn - Function that takes a value and returns a Maybe
 * @param maybe - The Maybe to chain over
 * @returns The flattened result of applying fn, or Nothing
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 * 
 * // Basic chaining with potential failure
 * const safeDivide = (x: number) => (y: number): Maybe<number> =>
 *   y === 0 ? nothing() : just(x / y)
 * 
 * chain(safeDivide(10))(just(2))   // Just(5)
 * chain(safeDivide(10))(just(0))   // Nothing
 * chain(safeDivide(10))(nothing()) // Nothing
 * 
 * // Sequential validations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 * 
 * const validatePositive = (n: number): Maybe<number> =>
 *   n > 0 ? just(n) : nothing()
 * 
 * const validateEven = (n: number): Maybe<number> =>
 *   n % 2 === 0 ? just(n) : nothing()
 * 
 * pipe(
 *   just("24"),
 *   chain(parseInteger),      // Just(24)
 *   chain(validatePositive),  // Just(24)
 *   chain(validateEven)       // Just(24)
 * )
 * 
 * pipe(
 *   just("-4"),
 *   chain(parseInteger),      // Just(-4)
 *   chain(validatePositive),  // Nothing - fails validation
 *   chain(validateEven)       // Nothing - skipped
 * )
 * 
 * // Avoiding nested Maybe values
 * const findUser = (id: number): Maybe<User> =>
 *   id === 1 ? just({ id: 1, name: "Alice", age: 30 }) : nothing()
 * 
 * const getUserAge = (user: User): Maybe<number> =>
 *   user.age !== undefined ? just(user.age) : nothing()
 * 
 * // With map (creates nested Maybe):
 * // map(getUserAge)(findUser(1)) // Just(Just(30)) - nested!
 * 
 * // With chain (flattens):
 * chain(getUserAge)(findUser(1))  // Just(30) - flattened!
 * chain(getUserAge)(findUser(2))  // Nothing
 * 
 * // Safe property access chains
 * interface Person {
 *   name: string
 *   address?: Address
 * }
 * 
 * interface Address {
 *   street?: string
 *   city: string
 *   zipCode?: string
 * }
 * 
 * const getAddress = (person: Person): Maybe<Address> =>
 *   person.address ? just(person.address) : nothing()
 * 
 * const getZipCode = (address: Address): Maybe<string> =>
 *   address.zipCode ? just(address.zipCode) : nothing()
 * 
 * const personZipCode = (person: Person): Maybe<string> =>
 *   pipe(
 *     just(person),
 *     chain(getAddress),
 *     chain(getZipCode)
 *   )
 * 
 * const person1: Person = {
 *   name: "Bob",
 *   address: { city: "NYC", zipCode: "10001" }
 * }
 * 
 * const person2: Person = {
 *   name: "Carol",
 *   address: { city: "LA" }  // No zipCode
 * }
 * 
 * const person3: Person = {
 *   name: "Dave"  // No address
 * }
 * 
 * personZipCode(person1)  // Just("10001")
 * personZipCode(person2)  // Nothing
 * personZipCode(person3)  // Nothing
 * 
 * // Database-like operations
 * const users = new Map([
 *   [1, { id: 1, name: "Alice", teamId: 10 }],
 *   [2, { id: 2, name: "Bob", teamId: 20 }],
 *   [3, { id: 3, name: "Carol" }]  // No teamId
 * ])
 * 
 * const teams = new Map([
 *   [10, { id: 10, name: "Engineering" }],
 *   [20, { id: 20, name: "Marketing" }]
 * ])
 * 
 * const findById = <T>(map: Map<number, T>) => (id: number): Maybe<T> => {
 *   const item = map.get(id)
 *   return item ? just(item) : nothing()
 * }
 * 
 * const getUserTeam = (userId: number): Maybe<Team> =>
 *   pipe(
 *     findById(users)(userId),
 *     chain(user => user.teamId 
 *       ? findById(teams)(user.teamId)
 *       : nothing()
 *     )
 *   )
 * 
 * getUserTeam(1)  // Just({ id: 10, name: "Engineering" })
 * getUserTeam(2)  // Just({ id: 20, name: "Marketing" })
 * getUserTeam(3)  // Nothing - user has no teamId
 * getUserTeam(4)  // Nothing - user doesn't exist
 * 
 * // Computation with multiple steps
 * const sqrt = (n: number): Maybe<number> =>
 *   n >= 0 ? just(Math.sqrt(n)) : nothing()
 * 
 * const reciprocal = (n: number): Maybe<number> =>
 *   n !== 0 ? just(1 / n) : nothing()
 * 
 * const compute = (x: number): Maybe<number> =>
 *   pipe(
 *     just(x),
 *     chain(n => just(n - 4)),     // Subtract 4
 *     chain(sqrt),                  // Take square root (fails if negative)
 *     chain(reciprocal)             // Take reciprocal (fails if zero)
 *   )
 * 
 * compute(8)   // Just(0.5) -> sqrt(8-4) = 2, 1/2 = 0.5
 * compute(4)   // Nothing -> sqrt(0) = 0, reciprocal fails
 * compute(2)   // Nothing -> sqrt(-2) fails
 * 
 * // Async chain operations
 * const fetchUser = async (id: number): Promise<Maybe<User>> => {
 *   // ... fetch logic
 *   return id === 1 ? just({ id: 1, name: "Alice" }) : nothing()
 * }
 * 
 * const fetchPosts = async (user: User): Promise<Maybe<Array<Post>>> => {
 *   // ... fetch logic
 *   return just([{ id: 1, title: "Hello", authorId: user.id }])
 * }
 * 
 * const getUserPosts = async (userId: number) => {
 *   const user = await fetchUser(userId)
 *   return chain(fetchPosts)(user)
 * }
 * 
 * // Kleisli composition (function composition for monadic functions)
 * const composeK = <A, B, C>(
 *   f: (a: A) => Maybe<B>,
 *   g: (b: B) => Maybe<C>
 * ) => (a: A): Maybe<C> =>
 *   chain(g)(f(a))
 * 
 * const parseAndValidate = composeK(parseInteger, validatePositive)
 * parseAndValidate("42")   // Just(42)
 * parseAndValidate("-5")   // Nothing
 * parseAndValidate("abc")  // Nothing
 * 
 * // Early termination in chains
 * let sideEffect = 0
 * 
 * pipe(
 *   just(5),
 *   chain(x => { sideEffect += 1; return just(x * 2) }),     // Executes
 *   chain(x => { sideEffect += 1; return nothing() }),        // Executes, returns Nothing
 *   chain(x => { sideEffect += 1; return just(x + 10) })     // Skipped!
 * )
 * // sideEffect === 2 (third chain never runs)
 * ```
 * 
 * @property Monadic-bind - Implements the bind operation for Maybe monad
 * @property Flattens - Prevents nested Maybe<Maybe<T>> values
 * @property Short-circuits - Nothing values bypass subsequent operations
 */
const chain = <A, B>(fn: (a: A) => Maybe<B>) => 
	(maybe: Maybe<A>): Maybe<B> => {
		if (isNothing(maybe)) {
			return maybe
		}
		
		return fn(maybe.value)
	}

export default chain