import type { IO } from "../../../types/fp/io/index.ts"

//++ Creates an IO by wrapping a value in a thunk (deferred computation)
export default function io<A>(value: A): IO<A> {
	return () => value
}

//?? [EXAMPLE] io(42) // IO<number> that returns 42 when executed
//?? [EXAMPLE] runIO(io("hello")) // "hello"
/*??
 | [EXAMPLE]
 | const numberIO = io(42)
 | runIO(numberIO) // 42
 |
 | const userIO = io({ id: 1, name: "Alice" })
 | runIO(userIO) // { id: 1, name: "Alice" }
 |
 | [PRO] Wraps any value in IO context for composition
 | [PRO] Maintains referential transparency
 | [PRO] Type-safe IO construction
 | [GOTCHA] For effectful computations, pass the computation result, not the computation itself
 |
*/
