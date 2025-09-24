import type { Either } from "../../../types/fp/either/index.ts"
import type { IOEither } from "../../../types/fp/io/index.ts"

//++ Creates an IOEither from a thunk returning Either (deferred error-handling computation)
export default function ioEither<E, A>(
	thunk: () => Either<E, A>,
): IOEither<E, A> {
	return thunk
}

//?? [EXAMPLE] ioEither(() => right(42)) // IOEither(() => Right(42))
//?? [EXAMPLE] runIO(ioEither(() => b === 0 ? left("Division by zero") : right(a / b))) // Either result
/*??
 | [EXAMPLE]
 | const safeParseIO = (json: string) =>
 |   ioEither(() => {
 |     try {
 |       return right(JSON.parse(json))
 |     } catch (error) {
 |       return left(`Parse error: ${error}`)
 |     }
 |   })
 | runIO(safeParseIO('{"valid": true}')) // Right({ valid: true })
 | runIO(safeParseIO('invalid')) // Left("Parse error: ...")
 |
 | [PRO] Combines deferred execution with error handling
 | [PRO] Referentially transparent side effects with safe error handling
 | [GOTCHA] Contains impure operations - only execute when ready for side effects
 |
*/
