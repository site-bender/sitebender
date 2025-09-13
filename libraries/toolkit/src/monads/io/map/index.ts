import type { IO } from "../../../types/fp/io/index.ts"

//++ Maps a function over the value inside an IO (Functor)
export default function map<A, B>(f: (a: A) => B) {
	return function mapWithTransformFunction(io: IO<A>): IO<B> {
		return function runMappedIO() {
			return f(io())
		}
	}
}

//?? [EXAMPLE] map((x: number) => x * 2)(io(() => 42)) // IO(() => 84)
//?? [EXAMPLE] map((s: string) => s.toUpperCase())(io(() => "hello")) // IO(() => "HELLO")
/*??
 | [EXAMPLE]
 | const numberIO = io(() => 42)
 | const doubledIO = map((x: number) => x * 2)(numberIO)
 | const squaredIO = map((x: number) => x * x)(doubledIO)
 | runIO(squaredIO)                         // 7056
 |
 | [PRO] Transforms eventual result without executing computation
 | [PRO] Maintains referential transparency until execution
 | [PRO] Composable with other IO operations
 |
*/
