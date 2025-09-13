import type { IO } from "../../../types/fp/io/index.ts"

//++ Creates an IO from a thunk (deferred computation)
export default function io<A>(thunk: () => A): IO<A> {
	return thunk
}

//?? [EXAMPLE] io(() => 42) // IO(() => 42)
//?? [EXAMPLE] runIO(io(() => Math.random())) // 0.123456... (deferred until runIO)
/*??
 | [EXAMPLE]
 | const complexIO = io(() => {
 |   const id = crypto.randomUUID()
 |   const timestamp = Date.now()
 |   return `${id}-${timestamp}`
 | })
 | runIO(complexIO) // "abc-123-1692547200000"
 |
 | [PRO] Enables composable, referentially transparent handling of side effects
 | [PRO] Defers execution until runIO is called
 | [GOTCHA] Contains impure operations - only execute when ready for side effects
 |
*/
