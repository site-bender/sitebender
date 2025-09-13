import type { IO } from "../../../types/fp/io/index.ts"

//++ Applies an IO function to an IO value (Applicative pattern)
export default function ap<A, B>(ioF: IO<(a: A) => B>) {
	return function applyIO(ioA: IO<A>): IO<B> {
		return () => ioF()(ioA())
	}
}

//?? [EXAMPLE] ap(io(() => (x: number) => x * 2))(io(() => 10)) // IO(() => 20)
//?? [EXAMPLE] runIO(ap(multiplyIO)(valueIO)) // Applied result when executed
/*??
 | [EXAMPLE]
 | const addIO = io(() => (x: number) => (y: number) => x + y)
 | const xIO = io(() => 10)
 | const yIO = io(() => 20)
 | const resultIO = ap(ap(addIO)(xIO))(yIO)
 | runIO(resultIO) // 30
 |
 | [PRO] Enables applying functions with multiple parameters to multiple IO values
 | [PRO] Maintains deferred execution semantics
 |
*/
