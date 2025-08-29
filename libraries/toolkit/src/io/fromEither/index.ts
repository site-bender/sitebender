import type { Either } from "../../types/fp/either/index.ts"
import type { IOEither } from "../../types/fp/io/index.ts"

/**
 * Lifts a pure Either into IOEither context
 *
 * Takes a pure Either value and wraps it in IO context, allowing it to be
 * composed with other IOEither operations. This is useful when you have
 * a pure computation that may fail (Either) and want to integrate it into
 * an IO-based pipeline that deals with side effects and errors.
 *
 * @param either - Pure Either value to lift into IOEither
 * @returns IOEither wrapping the Either value
 * @example
 * ```typescript
 * // Lift Either values into IOEither
 * const successEither = right(42)
 * const errorEither = left("Error")
 *
 * const successIO = fromEither(successEither)
 * const errorIO = fromEither(errorEither)
 *
 * runIO(successIO)  // Right(42)
 * runIO(errorIO)    // Left("Error")
 *
 * // Pure validation with IO integration
 * const validateAge = (age: number): Either<string, number> =>
 *   age >= 0 ? right(age) : left("Age must be positive")
 *
 * const ageIO = fromEither(validateAge(25))
 * runIO(ageIO)  // Right(25)
 *
 * // Chain with other IO operations
 * const pureComputation = right(10)
 * const liftedIO = fromEither(pureComputation)
 * const doubledIO = mapIOEither((x: number) => x * 2)(liftedIO)
 * runIO(doubledIO)  // Right(20)
 * ```
 * @pure
 */
const fromEither = <E, A>(either: Either<E, A>): IOEither<E, A> => () => either

export default fromEither
