import type { Either } from "../../../types/fp/either/index.ts"

import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Executes a synchronous function and captures thrown exceptions as Left
export default function tryCatch<A>(fn: () => A) {
	return function tryCatchWithError<E>(
		onError: (error: unknown) => E,
	): Either<E, A> {
		try {
			return right(fn())
		} catch (error) {
			return left(onError(error))
		}
	}
}

//?? [EXAMPLE] tryCatch(() => JSON.parse('{"valid": "json"}'))((err) => String(err)) // Right({ valid: "json" })
//?? [EXAMPLE] tryCatch(() => JSON.parse("invalid"))((err) => String(err)) // Left("SyntaxError: ...")
/*??
 | [EXAMPLE]
 | const safeGet = <T>(arr: Array<T>, index: number) => tryCatch(
 |   () => {
 |     if (index < 0 || index >= arr.length) {
 |       throw new Error(`Index ${index} out of bounds`)
 |     }
 |     return arr[index]
 |   }
 | )((err: unknown) => String(err))
 | safeGet([1, 2, 3], 1)   // Right(2)
 | safeGet([1, 2, 3], 10)  // Left("Error: Index 10 out of bounds")
 |
 | [PRO] Bridges imperative throw style with Either flow
 | [PRO] Encapsulates try/catch minimizing repetition
 | [PRO] Allows mapping unknown error to domain-specific type
 |
 | [GOTCHA] Only captures synchronous throws (not async Promise rejections)
 | [GOTCHA] onError should be pure—avoid logging + mapping in same handler
 | [GOTCHA] Heavy logic inside fn still runs each call—wrap memoization externally
 */
