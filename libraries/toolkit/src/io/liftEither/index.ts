import type { Either } from "../../types/fp/either/index.ts"
import type { IOEither } from "../../types/fp/io/index.ts"

/**
 * Lifts a pure function returning Either into IOEither
 *
 * Takes a pure function that returns an Either value and lifts it into the
 * IOEither context, allowing it to be composed with other IO operations.
 * This is useful when you have a pure computation that may fail (Either)
 * and want to integrate it into an IO-based pipeline dealing with side
 * effects and error handling.
 *
 * @param f - Pure function that returns an Either
 * @returns IOEither that wraps the function execution
 * @pure
 * @curried
 * @example
 * ```typescript
 * import runIO from "../runIO/index.ts"
 * import right from "../../either/right/index.ts"
 * import left from "../../either/left/index.ts"
 *
 * // Basic validation
 * const validateAge = (age: number): Either<string, number> =>
 *   age >= 0 && age <= 150
 *     ? right(age)
 *     : left("Age must be between 0 and 150")
 *
 * const validateAgeIO = (age: number): IOEither<string, number> =>
 *   liftEither(() => validateAge(age))
 *
 * runIO(validateAgeIO(30))   // Right(30)
 * runIO(validateAgeIO(-5))   // Left("Age must be between 0 and 150")
 *
 * // Safe division
 * const safeDivide = (a: number, b: number): Either<string, number> =>
 *   b === 0 ? left("Division by zero") : right(a / b)
 *
 * const divideIO = (a: number, b: number): IOEither<string, number> =>
 *   liftEither(() => safeDivide(a, b))
 *
 * runIO(divideIO(10, 2))  // Right(5)
 * runIO(divideIO(10, 0))  // Left("Division by zero")
 *
 * // Chaining operations
 * const processDataIO = pipe(
 *   liftEither(() => right('{"value": 42}')),
 *   chainIOEither(data => liftEither(() => parseJson(data))),
 *   mapIOEither((obj: any) => obj.value * 2)
 * )
 *
 * runIO(processDataIO)  // Right(84)
 * ```
 */
const liftEither = <E, A>(f: () => Either<E, A>): IOEither<E, A> => () => f()

export default liftEither
