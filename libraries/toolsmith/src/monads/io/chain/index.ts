import type { IO } from "../../../types/fp/io/index.ts"

//++ Flat maps a function that returns an IO (Monad bind/flatMap)
export default function chain<A, B>(f: (a: A) => IO<B>) {
	return function chainIO(io: IO<A>): IO<B> {
		return () => f(io())()
	}
}

//?? [EXAMPLE] chain((id: string) => io(() => `User: ${id}`))(io(() => "123")) // IO(() => "User: 123")
//?? [EXAMPLE] runIO(chain(fetchUserIO)(getUserIdIO)) // Executed sequential computation
/*??
 | [EXAMPLE]
 | const randomIO = io(() => Math.random())
 | const branchIO = (x: number) =>
 |   x > 0.5 ? io(() => "High") : io(() => "Low")
 | const resultIO = chain(branchIO)(randomIO)
 | runIO(resultIO) // "High" or "Low" based on random value
 |
 | [PRO] Enables composing dependent effectful computations
 | [PRO] Prevents nested IO<IO<A>> structures by flattening
 |
*/
