import type { IOEither } from "../../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

//++ Maps a function over the Either value inside IOEither
export default function mapIOEither<E, A, B>(f: (a: A) => B) {
	return function mapIOEitherWithTransformFunction(
		io: IOEither<E, A>,
	): IOEither<E, B> {
		return function runMappedIOEither() {
			const either = io()
			return either._tag === "Right" ? right(f(either.right)) : either
		}
	}
}

//?? [EXAMPLE] mapIOEither((x: number) => x * 2)(ioEither(() => right(42))) // IOEither(() => Right(84))
//?? [EXAMPLE] mapIOEither((x: number) => x * 2)(ioEither(() => left("error"))) // IOEither(() => Left("error"))
/*??
 | [EXAMPLE]
 | const dataIO = ioEither(() => right(5))
 | const processedIO = pipe(
 |   dataIO,
 |   mapIOEither((x: number) => x * 2),     // Right(10)
 |   mapIOEither((x: number) => x + 3),     // Right(13)
 |   mapIOEither((x: number) => x.toString()) // Right("13")
 | )
 | runIO(processedIO)  // Right("13")
 |
 | [PRO] Transforms success values while preserving errors
 | [PRO] Allows chaining transformations on successful results
 | [PRO] Composable with other IOEither operations
 |
*/
