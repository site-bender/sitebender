import type { Either } from "../../../types/fp/either/index.ts"
import type { IOEither } from "../../../types/fp/io/index.ts"

//++ Lifts a pure Either into IOEither context
export default function fromEither<E, A>(either: Either<E, A>): IOEither<E, A> {
	return () => either
}

//?? [EXAMPLE] fromEither(right(42)) // IOEither(() => Right(42))
//?? [EXAMPLE] runIO(fromEither(left("Error"))) // Left("Error")
/*??
 | [EXAMPLE]
 | const validateAge = (age: number): Either<string, number> =>
 |   age >= 0 ? right(age) : left("Age must be positive")
 | const ageIO = fromEither(validateAge(25))
 | runIO(ageIO) // Right(25)
 |
 | [PRO] Integrates pure Either computations into IO-based pipelines
 | [PRO] Allows composition with other IOEither operations
 |
*/
