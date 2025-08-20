import type { Either } from "../../types/fp/either/index.ts"
import isLeft from "../isLeft/index.ts"
import right from "../right/index.ts"

/**
 * Maps a function over the Right value of an Either
 * 
 * Applies a transformation function to the success value inside a Right,
 * leaving Left values unchanged. This is the fundamental operation for
 * transforming successful computations while propagating errors. The map
 * operation short-circuits on Left values, making it safe to chain multiple
 * transformations without explicit error checking.
 * 
 * @curried (fn) => (either) => result
 * @param fn - Function to transform the Right value
 * @param either - The Either to map over
 * @returns A new Either with the transformed Right value or unchanged Left
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * 
 * // Basic transformation of Right values
 * const double = (x: number) => x * 2
 * 
 * map(double)(right(5))   // Right(10)
 * map(double)(left("error")) // Left("error") - unchanged
 * 
 * // Chaining transformations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * const addOne = (x: number) => x + 1
 * const toString = (x: number) => x.toString()
 * 
 * pipe(
 *   right(5),
 *   map(double),    // Right(10)
 *   map(addOne),    // Right(11)
 *   map(toString)   // Right("11")
 * )
 * 
 * // Short-circuits on Left
 * pipe(
 *   left("error"),
 *   map(double),    // Left("error") - not executed
 *   map(addOne),    // Left("error") - not executed
 *   map(toString)   // Left("error") - not executed
 * )
 * 
 * // Working with objects
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 * }
 * 
 * const user: Either<string, User> = right({
 *   id: 1,
 *   name: "Alice",
 *   age: 30
 * })
 * 
 * const getName = (u: User) => u.name
 * const toUpper = (s: string) => s.toUpperCase()
 * 
 * pipe(
 *   user,
 *   map(getName),  // Right("Alice")
 *   map(toUpper)   // Right("ALICE")
 * )
 * 
 * // Partial application for reusable transformers
 * const doubleEither = map((x: number) => x * 2)
 * const squareEither = map((x: number) => x * x)
 * 
 * doubleEither(right(5))   // Right(10)
 * squareEither(right(5))   // Right(25)
 * doubleEither(left("e"))  // Left("e")
 * 
 * // Building computation pipelines
 * const calculate = (input: Either<string, number>) =>
 *   pipe(
 *     input,
 *     map(x => x + 10),
 *     map(x => x * 2),
 *     map(x => x / 4)
 *   )
 * 
 * calculate(right(5))    // Right(7.5) -> (5 + 10) * 2 / 4
 * calculate(left("NaN")) // Left("NaN")
 * 
 * // Type transformations
 * const parseResult: Either<string, string> = right("123")
 * 
 * const parsed = pipe(
 *   parseResult,
 *   map(s => parseInt(s, 10)),  // Right(123)
 *   map(n => n > 100),           // Right(true)
 *   map(b => b ? "valid" : "invalid") // Right("valid")
 * )
 * 
 * // Working with arrays inside Either
 * const numbers: Either<string, Array<number>> = right([1, 2, 3, 4, 5])
 * 
 * pipe(
 *   numbers,
 *   map(arr => arr.filter(x => x > 2)),  // Right([3, 4, 5])
 *   map(arr => arr.map(x => x * 2)),     // Right([6, 8, 10])
 *   map(arr => arr.reduce((a, b) => a + b, 0)) // Right(24)
 * )
 * 
 * // Async transformation example (with promises)
 * const fetchUser = async (id: number): Promise<Either<string, User>> => {
 *   // ... fetch implementation
 *   return right({ id, name: "Bob", age: 25 })
 * }
 * 
 * const userAge = await fetchUser(1).then(map(u => u.age))
 * // Right(25)
 * ```
 * 
 * @property Functor-law - Satisfies identity and composition laws
 * @property Short-circuits - Left values pass through unchanged
 * @property Type-safe - Preserves error type while transforming success type
 */
const map = <A, B>(fn: (a: A) => B) => <E>(
	either: Either<E, A>
): Either<E, B> => {
	if (isLeft(either)) {
		return either
	}
	
	return right(fn(either.right))
}

export default map