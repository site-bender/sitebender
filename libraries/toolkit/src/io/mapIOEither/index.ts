import type { IOEither } from "../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

/**
 * Maps a function over the Either value inside IOEither
 *
 * Transforms the success value of an IOEither without executing the computation.
 * If the IOEither contains a Right value, the function is applied to transform it.
 * If it contains a Left value (error), the function is ignored and the error
 * is preserved. This allows for composing transformations on successful results
 * while maintaining error handling throughout the computation chain.
 *
 * @param f - Function to transform the success value
 * @param io - IOEither to transform
 * @returns New IOEither with transformed success value
 * @pure
 * @curried
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { ioEither } from "../ioEither/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 *
 * // Basic transformation
 * const numberIO = ioEither(() => right(42))
 * const doubledIO = mapIOEither((x: number) => x * 2)(numberIO)
 * runIO(doubledIO)  // Right(84)
 *
 * // Error case - function not applied
 * const errorIO = ioEither(() => left("Something went wrong"))
 * const transformedErrorIO = mapIOEither((x: number) => x * 2)(errorIO)
 * runIO(transformedErrorIO)  // Left("Something went wrong")
 *
 * // Chaining transformations
 * const dataIO = ioEither(() => right(5))
 * const processedIO = pipe(
 *   dataIO,
 *   mapIOEither((x: number) => x * 2),     // Right(10)
 *   mapIOEither((x: number) => x + 3),     // Right(13)
 *   mapIOEither((x: number) => x.toString()) // Right("13")
 * )
 * runIO(processedIO)  // Right("13")
 *
 * // Array transformations
 * const arrayIO = ioEither(() => right([1, 2, 3, 4, 5]))
 * const evenNumbersIO = mapIOEither((arr: Array<number>) =>
 *   arr.filter(x => x % 2 === 0)
 * )(arrayIO)
 * runIO(evenNumbersIO)  // Right([2, 4])
 *
 * // Partial application for reusable transformers
 * const addOne = mapIOEither((x: number) => x + 1)
 * const toString = mapIOEither((x: number) => x.toString())
 *
 * const numIO = ioEither(() => right(41))
 * const transformedIO = pipe(numIO, addOne, toString)
 * runIO(transformedIO)  // Right("42")
 * ```
 */
const mapIOEither =
	<E, A, B>(f: (a: A) => B) => (io: IOEither<E, A>): IOEither<E, B> => () => {
		const either = io()
		return either._tag === "Right" ? right(f(either.right)) : either
	}

export default mapIOEither
