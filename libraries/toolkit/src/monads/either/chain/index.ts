import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

//++ Chains Right-branch computations (flatMap/bind) and flattens nested Either
export default function chain<E, A, B>(fn: (a: A) => Either<E, B>) {
	return function chainEither(either: Either<E, A>): Either<E, B> {
		if (isLeft(either)) {
			return either
		}

		return fn(either.right)
	}
}

//?? [EXAMPLE] chain((n: number) => n < 0 ? left("negative") : right(Math.sqrt(n)))(right(16)) // Right(4)
//?? [EXAMPLE] chain((n: number) => n < 0 ? left("negative") : right(Math.sqrt(n)))(right(-16)) // Left("negative")
/*??
 | [EXAMPLE]
 | const divide = (x: number) => (y: number): Either<string, number> =>
 |   y === 0 ? left("Division by zero") : right(x / y)
 | const sqrt = (n: number): Either<string, number> =>
 |   n < 0 ? left("Cannot sqrt negative") : right(Math.sqrt(n))
 | pipe(
 |   right(16),
 |   chain(sqrt),       // Right(4)
 |   chain(divide(12))  // Right(3)
 | )
 |
 | [PRO] Sequences dependent Right-branch computations
 | [PRO] Eliminates nested Either (flattens automatically)
 | [PRO] Stops further chaining when a Left appears
 |
 | [GOTCHA] fn never runs for Left inputs (ensure recovery earlier via chainLeft/orElse)
 | [GOTCHA] Deep chains can be harder to debug—introduce named functions
 | [GOTCHA] For parallel work prefer accumulating structures (e.g. Validation) instead of early stop
 */
